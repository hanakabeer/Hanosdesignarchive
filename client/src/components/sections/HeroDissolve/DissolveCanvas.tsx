import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/* ─── shaders ─────────────────────────────────────────────────── */

const vertSrc = /* glsl */`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
  }
`;

/*
  Ultra-fine pixel-dust dissolve shader.
  Each cell = 1.5px so each particle is essentially one pixel.
  Hero image dissipates upward as dust, fading to pure transparent —
  the work section background (#EFEFEF) shows through beneath.
  No blue flash, no blur, no background fill.
*/
const fragSrc = /* glsl */`
  uniform sampler2D uHeroTex;
  uniform float uProgress;
  uniform float uTime;
  uniform vec2  uResolution;
  varying vec2 vUv;

  float hash(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }

  float noise(vec2 p){
    vec2 i = floor(p); vec2 f = fract(p);
    f = f*f*(3.0-2.0*f);
    float a=hash(i), b=hash(i+vec2(1,0)), c=hash(i+vec2(0,1)), d=hash(i+vec2(1,1));
    return mix(mix(a,b,f.x),mix(c,d,f.x),f.y);
  }

  void main(){
    // 1.5px micro-cells — each is essentially a single pixel/dust mote
    float cellSize = 1.5;
    vec2 px   = vUv * uResolution;
    vec2 cell = floor(px / cellSize);

    // per-cell randoms
    float seed  = hash(cell * 0.017 + 3.7);
    float seed2 = hash(cell * 0.031 + 17.3);
    float seed3 = hash(cell * 0.053 + 5.1);

    // dissolve sweeps from bottom → top with slight diagonal variation
    float wave = vUv.y * 0.45 + vUv.x * 0.08;
    float threshold = seed * 0.55 + wave * 0.45;

    // how far past this cell's threshold are we — narrow band = crisp edge
    float t = clamp((uProgress - threshold) / 0.25, 0.0, 1.0);

    // drift: mostly upward, slight lateral wander
    float angle = seed3 * 6.2831;
    float speed = 0.35 + seed2 * 0.55;
    float turb  = noise(cell * 0.1 + uTime * 0.25) * 0.12 - 0.06;
    vec2 drift  = vec2(
      cos(angle) * 0.2 + turb + sin(uTime * 0.4 + seed * 6.28) * 0.05,
      0.5 + seed * 0.45
    ) * speed * t;

    // sample original hero colour at this cell's origin
    vec2 originUv = (cell * cellSize + cellSize * 0.5) / uResolution;
    vec4 heroColor = texture2D(uHeroTex, originUv);

    // particle shape — within the 1.5px cell, compute local uv + drift offset
    vec2 cellUv  = fract(px / cellSize) - 0.5;
    vec2 localUv = cellUv + drift * vec2(1.0, -1.0) * (uResolution / cellSize) * 0.0015;
    float dist   = length(localUv);
    // particle shrinks and sharpens as t → 1
    float radius = (0.45 - t * 0.35) * (0.7 + seed * 0.3);
    float particle = 1.0 - smoothstep(radius - 0.03, radius + 0.04, dist);

    // colour: keep hero hue, desaturate slightly as it dissolves
    float lum = dot(heroColor.rgb, vec3(0.299,0.587,0.114));
    // shift toward pale dust but keep some colour
    vec3 dustColor = mix(heroColor.rgb, vec3(lum * 0.9 + 0.08), t * 0.7);

    // alpha envelope: fade in as cell activates, fade out as particle drifts away
    float fadeIn  = smoothstep(0.0, 0.2, t);
    float fadeOut = 1.0 - smoothstep(0.45, 1.0, t);

    // "still" base: hero pixel before activation, fades out on threshold crossing
    float baseAlpha = 1.0 - smoothstep(0.0, 0.12, t);
    // preserve hero alpha (handles transparent parts of capture)
    float srcAlpha  = heroColor.a;

    // particle contribution
    float dustAlpha = particle * fadeIn * fadeOut * (0.75 + seed * 0.2) * srcAlpha;

    // blend: solid hero → particle mote → gone
    vec3  finalColor = mix(dustColor, heroColor.rgb, baseAlpha);
    float finalAlpha = max(baseAlpha * srcAlpha, dustAlpha);

    // everything dissolves to pure transparent — work section shows through
    gl_FragColor = vec4(finalColor, finalAlpha);
  }
`;

/* ─── component ───────────────────────────────────────────────── */

interface DissolveCanvasProps {
  /** 0 = hero fully shown, 1 = fully dissolved */
  progress: number;
  /** A canvas or image element to use as the hero texture source */
  sourceCanvas: HTMLCanvasElement | null;
}

export function DissolveCanvas({ progress, sourceCanvas }: DissolveCanvasProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(progress);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const animRef = useRef<number>(0);
  const texRef = useRef<THREE.Texture | null>(null);

  // Keep progress ref in sync without re-running the effect
  useEffect(() => {
    progressRef.current = progress;
    if (materialRef.current) {
      materialRef.current.uniforms.uProgress.value = progress;
    }
  }, [progress]);

  useEffect(() => {
    if (!mountRef.current) return;

    const W = window.innerWidth;
    const H = window.innerHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(W, H);
    renderer.domElement.style.cssText = `
      position:absolute; inset:0; width:100%; height:100%; pointer-events:none;
    `;
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const placeholderTex = new THREE.DataTexture(
      new Uint8Array([0, 0, 0, 0]), 1, 1, THREE.RGBAFormat
    );
    placeholderTex.needsUpdate = true;

    const material = new THREE.ShaderMaterial({
      vertexShader: vertSrc,
      fragmentShader: fragSrc,
      uniforms: {
        uHeroTex: { value: placeholderTex },
        uProgress: { value: 0 },
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(W, H) },
      },
      transparent: true,
      depthTest: false,
    });
    materialRef.current = material;

    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(quad);
    texRef.current = placeholderTex;

    const animate = (t: number) => {
      animRef.current = requestAnimationFrame(animate);
      if (materialRef.current) {
        materialRef.current.uniforms.uTime.value = t * 0.001;
        materialRef.current.uniforms.uProgress.value = progressRef.current;
      }
      renderer.render(scene, camera);
    };
    animate(0);

    const onResize = () => {
      const w = window.innerWidth, h = window.innerHeight;
      renderer.setSize(w, h);
      if (materialRef.current)
        materialRef.current.uniforms.uResolution.value.set(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      material.dispose();
      quad.geometry.dispose();
      placeholderTex.dispose();
      if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update texture when sourceCanvas changes
  useEffect(() => {
    if (!sourceCanvas || !materialRef.current) return;
    if (texRef.current) texRef.current.dispose();
    const tex = new THREE.CanvasTexture(sourceCanvas);
    tex.flipY = true;
    tex.needsUpdate = true;
    materialRef.current.uniforms.uHeroTex.value = tex;
    texRef.current = tex;
  }, [sourceCanvas]);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 10,
      }}
    />
  );
}
