import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform sampler2D uTrailTex;
  uniform sampler2D uRevealTex;
  uniform vec2 uResolution;
  uniform vec2 uImageRes;
  uniform float uTime;
  uniform float uMouseVel;
  uniform vec2 uMouse;
  varying vec2 vUv;

  float random(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }

  // Cover logic for image resizing
  vec2 getCoverUv(vec2 uv, vec2 res, vec2 imgRes) {
    float screenAspect = res.x / res.y;
    float imgAspect = imgRes.x / imgRes.y;
    vec2 newUv = uv;
    if (screenAspect > imgAspect) {
      float scale = screenAspect / imgAspect;
      newUv.y = (uv.y - 0.5) / scale + 0.5;
    } else {
      float scale = imgAspect / screenAspect;
      newUv.x = (uv.x - 0.5) / scale + 0.5;
    }
    return newUv;
  }

  void main() {
    vec2 px = vec2(1.0 / uResolution.x, 1.0 / uResolution.y);
    float tpx = texture2D(uTrailTex, vUv + vec2(px.x, 0.0)).r;
    float tnx = texture2D(uTrailTex, vUv - vec2(px.x, 0.0)).r;
    float tpy = texture2D(uTrailTex, vUv + vec2(0.0, px.y)).r;
    float tny = texture2D(uTrailTex, vUv - vec2(0.0, px.y)).r;
    vec2 trailGrad = vec2(tpx - tnx, tpy - tny);

    vec2 gradOff = vec2(px.x, px.y);
    float lumX1 = dot(texture2D(uTexture, getCoverUv(vUv + vec2(gradOff.x, 0.0), uResolution, uImageRes)).rgb, vec3(0.299, 0.587, 0.114));
    float lumX2 = dot(texture2D(uTexture, getCoverUv(vUv - vec2(gradOff.x, 0.0), uResolution, uImageRes)).rgb, vec3(0.299, 0.587, 0.114));
    float lumY1 = dot(texture2D(uTexture, getCoverUv(vUv + vec2(0.0, gradOff.y), uResolution, uImageRes)).rgb, vec3(0.299, 0.587, 0.114));
    float lumY2 = dot(texture2D(uTexture, getCoverUv(vUv - vec2(0.0, gradOff.y), uResolution, uImageRes)).rgb, vec3(0.299, 0.587, 0.114));
    vec2 lumGrad = vec2(lumX1 - lumX2, lumY1 - lumY2);
    vec2 warp = lumGrad * 0.02;
    float trail = texture2D(uTrailTex, vUv + warp).r;
    
    float distort = trail * (0.008 + 0.014 * (0.6 + 0.4 * uMouseVel));
    vec2 coverUvDist = getCoverUv(vUv + trailGrad * distort + lumGrad * (0.012 * trail), uResolution, uImageRes);
    vec4 baseColor = texture2D(uTexture, coverUvDist);
    
    // Luminance mask
    float luminance = dot(baseColor.rgb, vec3(0.299, 0.587, 0.114));
    float mask = smoothstep(0.1, 0.8, 1.0 - luminance);
    
    // Softer, ethereal grain
    vec2 noiseUv = vUv * uResolution.xy * 0.4 + uTime * 0.05;
    float n = random(noiseUv + fract(uTime * 0.5));
    float n2 = random(noiseUv * 0.5 - fract(uTime * 0.2));
    float combinedNoise = (n + n2) * 0.5;
    
    // Ethereal glow based on trail
    vec3 glow = baseColor.rgb * trail * 0.22;
    
    // Grain intensity logic - smoother transitions
    float grainIntensity = trail * (0.6 + 0.4 * uMouseVel) * (0.5 + 0.5 * mask) + trail * 0.2;
    float grain = (combinedNoise - 0.5) * grainIntensity * 0.3;
    
    // Soft-light blend with glow
    vec3 color = baseColor.rgb + grain + glow;
    float dust = smoothstep(0.5, 0.9, combinedNoise);
    vec3 overlayColor = vec3(0.149, 0.224, 0.341);
    vec3 overlay = overlayColor * trail * dust * (0.4 + 0.6 * (1.0 - mask));
    color = color + overlay;
    // Base grain everywhere (independent of hover)
    float baseGrain = (random(vUv * uResolution.xy * 0.35 + uTime * 0.3) - 0.5) * 0.06;
    color += vec3(baseGrain);
    // Circular feathered brush with pure image inversion (darkest ↔ lightest)
    float aspect = uResolution.x / uResolution.y;
    vec2 md = vUv - uMouse;
    md.x *= aspect;
    float dist = length(md);
    float radius = 0.22;
    float inner = radius * 0.50;
    float outer = radius;
    float stamp = 1.0 - smoothstep(inner, outer, dist);
    vec3 revealSample = texture2D(uRevealTex, coverUvDist).rgb;
    float brushGrain = (random(vUv * uResolution.xy * 0.8 + uTime * 0.7) - 0.5) * 0.08;
    vec3 brushed = clamp(revealSample + vec3(brushGrain), 0.0, 1.0);
    color = mix(color, brushed, stamp * (0.75 + 0.25 * (1.0 - mask)));
    
    // Dreamy blur/diffusion in trail area
    color = mix(color, color * 1.08, trail * 0.16);
    
    gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
  }
`;

const trailVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const trailFragmentShader = `
  uniform sampler2D uOldTrail;
  uniform sampler2D uTexture;
  uniform vec2 uMouse;
  uniform vec2 uMousePrev;
  uniform float uMouseVel;
  uniform float uAspect;
  uniform vec2 uResolution;
  uniform vec2 uImageRes;
  varying vec2 vUv;

  vec2 getCoverUv(vec2 uv, vec2 res, vec2 imgRes) {
    float screenAspect = res.x / res.y;
    float imgAspect = imgRes.x / imgRes.y;
    vec2 newUv = uv;
    if (screenAspect > imgAspect) {
      float scale = screenAspect / imgAspect;
      newUv.y = (uv.y - 0.5) / scale + 0.5;
    } else {
      float scale = imgAspect / screenAspect;
      newUv.x = (uv.x - 0.5) / scale + 0.5;
    }
    return newUv;
  }

  void main() {
    vec4 oldTrail = texture2D(uOldTrail, vUv);
    
    vec2 mouseUv = uMouse;
    vec2 diff = vUv - mouseUv;
    diff.x *= uAspect;
    
    float dist = length(diff);
    float brushSize = 0.05 + uMouseVel * 0.05;
    float stamp = smoothstep(brushSize, 0.0, dist) * (0.25 + uMouseVel * 0.75);
    
    // Exponential decay
    vec2 coverUv = getCoverUv(vUv, uResolution, uImageRes);
    vec3 baseColor = texture2D(uTexture, coverUv).rgb;
    float luminance = dot(baseColor, vec3(0.299, 0.587, 0.114));
    float mask = smoothstep(0.1, 0.8, 1.0 - luminance);
    float decay = mix(0.990, 0.996, mask);

    float baseTrail = max(oldTrail.r * decay, stamp);
    float newTrail = baseTrail;
    
    gl_FragColor = vec4(newTrail, 0.0, 0.0, 1.0);
  }
`;

const particleVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const particleFragmentShader = `
  uniform sampler2D uTrailTex;
  uniform sampler2D uTexture;
  uniform vec2 uResolution;
  uniform vec2 uImageRes;
  uniform float uTime;
  varying vec2 vUv;

  float random(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }

  vec2 getCoverUv(vec2 uv, vec2 res, vec2 imgRes) {
    float screenAspect = res.x / res.y;
    float imgAspect = imgRes.x / imgRes.y;
    vec2 newUv = uv;
    if (screenAspect > imgAspect) {
      float scale = screenAspect / imgAspect;
      newUv.y = (uv.y - 0.5) / scale + 0.5;
    } else {
      float scale = imgAspect / screenAspect;
      newUv.x = (uv.x - 0.5) / scale + 0.5;
    }
    return newUv;
  }

  void main() {
    float trail = texture2D(uTrailTex, vUv).r;
    vec2 px = vec2(1.0 / uResolution.x, 1.0 / uResolution.y);
    float tpx = texture2D(uTrailTex, vUv + vec2(px.x, 0.0)).r;
    float tnx = texture2D(uTrailTex, vUv - vec2(px.x, 0.0)).r;
    float tpy = texture2D(uTrailTex, vUv + vec2(0.0, px.y)).r;
    float tny = texture2D(uTrailTex, vUv - vec2(0.0, px.y)).r;
    vec2 trailGrad = vec2(tpx - tnx, tpy - tny);

    vec2 flow = trailGrad * (0.08 + 0.22 * trail);
    vec2 swirl = vec2(flow.y, -flow.x) * (0.6 + 0.4 * trail);
    vec2 advUv = vUv - (flow + swirl) * (0.8 + 1.6 * trail);

    vec2 coverUv = getCoverUv(vUv, uResolution, uImageRes);
    vec3 baseColor = texture2D(uTexture, coverUv).rgb;
    float luminance = dot(baseColor, vec3(0.299, 0.587, 0.114));
    float mask = smoothstep(0.1, 0.8, 1.0 - luminance);

    vec2 uvn = advUv * uResolution.xy * 0.7 + uTime * 0.6;
    float r1 = random(uvn);
    float r2 = random(uvn * 1.7 - uTime * 0.4);
    float rn = (r1 + r2) * 0.5;

    float spark1 = smoothstep(0.92 - trail * 0.4, 1.0, rn);
    float spark2 = smoothstep(0.98 - trail * 0.6, 1.0, random(uvn * 2.3 + 3.1));
    float spark = clamp(spark1 * 0.7 + spark2 * 0.6, 0.0, 1.0);

    float alpha = spark * (0.35 + 0.65 * trail) * (0.5 + 0.5 * (1.0 - mask));
    vec3 color = vec3(0.149, 0.224, 0.341);
    gl_FragColor = vec4(color * alpha, alpha);
  }
`;

export function GrainShader({ textureUrl, revealUrl }: { textureUrl: string, revealUrl?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5, prevX: 0.5, prevY: 0.5, vel: 0 });
  const lagRef = useRef({ x: 0.5, y: 0.5, prevX: 0.5, prevY: 0.5 });

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0); // transparent clear — no dark flash on scroll-back
    renderer.setSize(width, height);
    containerRef.current.appendChild(renderer.domElement);

    // Trail buffer logic
    const renderTargets = [
      new THREE.WebGLRenderTarget(width, height),
      new THREE.WebGLRenderTarget(width, height)
    ];
    let currentRT = 0;

    const trailScene = new THREE.Scene();
    const trailQuad = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.ShaderMaterial({
        vertexShader: trailVertexShader,
        fragmentShader: trailFragmentShader,
        uniforms: {
          uOldTrail: { value: null },
          uTexture: { value: null },
          uMouse: { value: new THREE.Vector2(0.5, 0.5) },
          uMousePrev: { value: new THREE.Vector2(0.5, 0.5) },
          uMouseVel: { value: 0 },
          uAspect: { value: width / height },
          uResolution: { value: new THREE.Vector2(width, height) },
          uImageRes: { value: new THREE.Vector2(1, 1) }
        }
      })
    );
    trailScene.add(trailQuad);

    // Main scene
    const loader = new THREE.TextureLoader();
    const texture = loader.load(textureUrl, (tex) => {
      mainQuad.material.uniforms.uImageRes.value.set(tex.image.width, tex.image.height);
      trailQuad.material.uniforms.uImageRes.value.set(tex.image.width, tex.image.height);
      trailQuad.material.uniforms.uTexture.value = texture;
      particleQuad.material.uniforms.uImageRes.value.set(tex.image.width, tex.image.height);
      particleQuad.material.uniforms.uTexture.value = texture;
    });
    const revealTexture = revealUrl
      ? loader.load(revealUrl)
      : texture;
    const mainQuad = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTexture: { value: texture },
          uTrailTex: { value: null },
          uRevealTex: { value: revealTexture },
          uResolution: { value: new THREE.Vector2(width, height) },
          uImageRes: { value: new THREE.Vector2(1, 1) },
          uTime: { value: 0 },
          uMouseVel: { value: 0 },
          uMouse: { value: new THREE.Vector2(0.5, 0.5) }
        }
      })
    );
    scene.add(mainQuad);
    const particleQuad = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.ShaderMaterial({
        vertexShader: particleVertexShader,
        fragmentShader: particleFragmentShader,
        uniforms: {
          uTrailTex: { value: null },
          uTexture: { value: null },
          uResolution: { value: new THREE.Vector2(width, height) },
          uImageRes: { value: new THREE.Vector2(1, 1) },
          uTime: { value: 0 },
        },
        transparent: true,
        depthTest: false,
        blending: THREE.AdditiveBlending,
      })
    );
    particleQuad.renderOrder = 10;
    scene.add(particleQuad);

    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      const rect = containerRef.current!.getBoundingClientRect();
      let clientX, clientY;
      if ('touches' in e) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      const x = (clientX - rect.left) / rect.width;
      const y = 1.0 - (clientY - rect.top) / rect.height;

      const dx = x - mouseRef.current.x;
      const dy = y - mouseRef.current.y;
      const vel = Math.sqrt(dx * dx + dy * dy) * 10.0;

      mouseRef.current = { x, y, prevX: mouseRef.current.x, prevY: mouseRef.current.y, vel };
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchstart', handleMouseMove);
    window.addEventListener('touchmove', handleMouseMove);

    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      renderer.setSize(w, h);
      mainQuad.material.uniforms.uResolution.value.set(w, h);
      renderTargets[0].setSize(w, h);
      renderTargets[1].setSize(w, h);
      trailQuad.material.uniforms.uAspect.value = w / h;
      trailQuad.material.uniforms.uResolution.value.set(w, h);
      particleQuad.material.uniforms.uResolution.value.set(w, h);
    };
    window.addEventListener('resize', handleResize);

    let animationId: number;
    const animate = (time: number) => {
      animationId = requestAnimationFrame(animate);

      // Smooth mouse velocity
      mouseRef.current.vel *= 0.95;
      const tx = mouseRef.current.x;
      const ty = mouseRef.current.y;
      const lx = lagRef.current.x + (tx - lagRef.current.x) * 0.12;
      const ly = lagRef.current.y + (ty - lagRef.current.y) * 0.12;
      lagRef.current = { x: lx, y: ly, prevX: lagRef.current.x, prevY: lagRef.current.y };

      // Update trail
      const nextRT = 1 - currentRT;
      trailQuad.material.uniforms.uOldTrail.value = renderTargets[currentRT].texture;
      trailQuad.material.uniforms.uMouse.value.set(lagRef.current.x, lagRef.current.y);
      trailQuad.material.uniforms.uMousePrev.value.set(lagRef.current.prevX, lagRef.current.prevY);
      trailQuad.material.uniforms.uMouseVel.value = mouseRef.current.vel;

      renderer.setRenderTarget(renderTargets[nextRT]);
      renderer.render(trailScene, camera);

      // Update main
      mainQuad.material.uniforms.uTrailTex.value = renderTargets[nextRT].texture;
      mainQuad.material.uniforms.uTime.value = time * 0.001;
      mainQuad.material.uniforms.uMouseVel.value = mouseRef.current.vel;
      mainQuad.material.uniforms.uMouse.value.set(lagRef.current.x, lagRef.current.y);
      particleQuad.material.uniforms.uTrailTex.value = renderTargets[nextRT].texture;
      particleQuad.material.uniforms.uTime.value = time * 0.001;

      renderer.setRenderTarget(null);
      renderer.render(scene, camera);

      currentRT = nextRT;
    };

    animate(0);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchstart', handleMouseMove);
      window.removeEventListener('touchmove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      // Dispose of resources
      renderer.dispose();
      renderTargets.forEach(rt => rt.dispose());

      // Dispose of textures
      texture.dispose();
      if (revealTexture !== texture) revealTexture.dispose();

      // Dispose of geometries and materials
      [trailQuad, mainQuad, particleQuad].forEach(mesh => {
        mesh.geometry.dispose();
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach(m => m.dispose());
        } else {
          mesh.material.dispose();
        }
      });

      if (containerRef.current) containerRef.current.removeChild(renderer.domElement);
    };
  }, [textureUrl]);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
}
