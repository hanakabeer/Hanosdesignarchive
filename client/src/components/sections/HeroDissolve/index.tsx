import { useEffect, useRef } from 'react';
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';
import type { Project } from '@shared/schema';
import { Hero } from '../Hero';
import { ProjectGrid } from '../ProjectGrid';
import styles from './styles.module.css';

/* ─── helpers ─────────────────────────────────────────────────── */
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

/* ─── constants ───────────────────────────────────────────────── */
// ~2 viewport heights — enough to be intentional, hard to miss by accident.
const DISSOLVE_PX = typeof window !== 'undefined'
    ? Math.round(window.innerHeight * 2) : 2000;

const HERO_FADE_END = 0.55; // hero opacity → 0

/* ─── Ash Particle System ─────────────────────────────────────── */
interface Ash {
    x: number; y: number;
    vx: number; vy: number;
    r: number; alpha: number;
    decay: number; lum: number;
}

class AshSystem {
    particles: Ash[] = [];
    private src: Uint8ClampedArray | null = null;
    private srcW = 0;
    private srcH = 0;
    private prevP = 0;
    W: number; H: number;

    constructor(W: number, H: number) { this.W = W; this.H = H; }

    setSource(data: Uint8ClampedArray, W: number, H: number) {
        this.src = data; this.srcW = W; this.srcH = H;
    }
    resize(W: number, H: number) { this.W = W; this.H = H; }

    update(progress: number, dt: number) {
        const delta = progress - this.prevP;
        this.prevP = progress;
        const dtS = Math.min(dt, 60) / 1000;

        if (delta > 0 && this.src) {
            const N = Math.min(Math.round(delta * 4500), 500);
            for (let i = 0; i < N; i++) {
                const nx = Math.random();
                const ny = Math.pow(Math.random(), 0.5);
                const sx = Math.floor(nx * (this.srcW - 1));
                const sy = Math.floor((1 - ny) * (this.srcH - 1));
                const idx = (sy * this.srcW + sx) * 4;
                const r = this.src[idx], g = this.src[idx + 1], b = this.src[idx + 2];
                const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
                const paleLum = 0.72 + Math.random() * 0.22;

                const spd = 16 + Math.random() * 28;
                const ang = -Math.PI / 2 + (Math.random() - 0.5) * 2.6;
                this.particles.push({
                    x: nx * this.W,
                    y: ny * this.H,
                    vx: Math.cos(ang) * spd * 0.22,
                    vy: Math.sin(ang) * spd,
                    r: 0.25 + Math.random() * 0.65,
                    alpha: 0.35 + Math.random() * 0.5,
                    decay: 0.022 + Math.random() * 0.030,
                    lum: lum * 0.3 + paleLum * 0.7,
                });
            }
        }

        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx * dtS;
            p.y += p.vy * dtS;
            p.vx *= 0.96;
            p.alpha -= p.decay;
            p.r *= 0.992;
            if (p.alpha <= 0 || p.r < 0.05) this.particles.splice(i, 1);
        }
    }

    draw(ctx: CanvasRenderingContext2D, snap: HTMLCanvasElement | null, snapA: number) {
        ctx.clearRect(0, 0, this.W, this.H);
        if (snap && snapA > 0.001) {
            ctx.globalAlpha = snapA;
            ctx.drawImage(snap, 0, 0, this.W, this.H);
            ctx.globalAlpha = 1;
        }
        for (const p of this.particles) {
            const g = Math.round(p.lum * 255);
            ctx.beginPath();
            ctx.arc(p.x, p.y, Math.max(0.05, p.r), 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${g},${g},${g},${Math.max(0, p.alpha)})`;
            ctx.fill();
        }
    }

    destroy() { this.particles = []; }
}

/* ─── Main component ──────────────────────────────────────────── */

interface Props { projects: Project[]; isLoading: boolean; }

export function HeroDissolveScene({ projects, isLoading }: Props) {
    const trapRef = useRef<HTMLDivElement>(null);
    const heroRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const ashRef = useRef<AshSystem | null>(null);
    const snapRef = useRef<HTMLCanvasElement | null>(null);
    const capturedRef = useRef(false);
    const progRef = useRef(0);
    const prevPRef = useRef(0);
    const rafRef = useRef(0);
    const lastTRef = useRef(0);

    const rawP = useMotionValue(0);
    const springP = useSpring(rawP, { stiffness: 22, damping: 16, mass: 1.2 });
    const heroOpacity = useTransform(springP, [0, HERO_FADE_END], [1, 0]);

    /* ── Snapshot ─────────────────────────────────────────────── */
    const capture = () => {
        if (capturedRef.current || !heroRef.current) return;
        capturedRef.current = true;
        const W = window.innerWidth, H = window.innerHeight;
        const snap = document.createElement('canvas');
        snap.width = W; snap.height = H;
        const ctx = snap.getContext('2d')!;
        const gl = heroRef.current.querySelector('canvas');
        if (gl) { try { ctx.drawImage(gl, 0, 0, W, H); } catch (_) { } }
        snapRef.current = snap;
        const ash = ashRef.current;
        if (ash) {
            const tmp = document.createElement('canvas');
            tmp.width = W; tmp.height = H;
            tmp.getContext('2d')!.drawImage(snap, 0, 0);
            const id = tmp.getContext('2d')!.getImageData(0, 0, W, H);
            ash.setSource(id.data, W, H);
        }
    };

    /* ── Scroll listener ──────────────────────────────────────── */
    useEffect(() => {
        const onScroll = () => {
            const trap = trapRef.current;
            if (!trap) return;
            const scrolled = -trap.getBoundingClientRect().top;
            if (scrolled <= 0) { rawP.set(0); progRef.current = 0; return; }
            const p = clamp01(scrolled / DISSOLVE_PX);
            progRef.current = p;
            rawP.set(p);
            if (p > 0.03 && !capturedRef.current) capture();
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [rawP]); // eslint-disable-line

    /* ── Render loop ──────────────────────────────────────────── */
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const setSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            ashRef.current?.resize(canvas.width, canvas.height);
        };
        setSize();
        const ash = new AshSystem(canvas.width, canvas.height);
        ashRef.current = ash;
        const ctx = canvas.getContext('2d')!;
        const loop = (t: number) => {
            rafRef.current = requestAnimationFrame(loop);
            const dt = t - lastTRef.current;
            lastTRef.current = t;
            const p = progRef.current;
            if (p !== prevPRef.current) { ash.update(p, dt); prevPRef.current = p; }
            const snapA = clamp01(easeOutQuart(clamp01(1 - p / HERO_FADE_END)));
            ash.draw(ctx, snapRef.current, snapA);
        };
        rafRef.current = requestAnimationFrame(loop);
        window.addEventListener('resize', setSize);
        return () => {
            cancelAnimationFrame(rafRef.current);
            ash.destroy();
            window.removeEventListener('resize', setSize);
        };
    }, []);

    return (
        <>
            {/* ── SCROLL TRAP: hero pinned + dissolves ─────────── */}
            <div
                ref={trapRef}
                className={styles.scrollTrap}
                style={{ height: `calc(100vh + ${DISSOLVE_PX}px)` }}
            >
                {/*
                  Sticky bg = #EFEFEF (work-section colour) always.
                  Hero layer sits on top and fades to 0 — you never
                  see the dark body bg bleeding through.
                */}
                <div className={styles.sticky}>
                    <motion.div
                        ref={heroRef}
                        className={styles.heroLayer}
                        style={{ opacity: heroOpacity }}
                    >
                        <Hero />
                    </motion.div>
                    <canvas ref={canvasRef} className={styles.ashOverlay} />
                </div>
            </div>

            {/* ── REAL PROJECT SECTION (normal document flow) ───── */}
            {/*
              Sits flush after the scroll trap with the same bg.
              No sticky, no clipping, full pointer-events, scrollable.
              Cards use whileInView stagger — they animate in as
              the user scrolls into them naturally after the dissolve.
            */}
            <div className={styles.projectSection}>
                <ProjectGrid projects={projects} isLoading={isLoading} />
            </div>
        </>
    );
}
