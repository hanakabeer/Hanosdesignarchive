import { useEffect, useRef, useState, useCallback } from "react";
import styles from "./styles.module.css";

const TOTAL_FRAMES = 2243;
const FRAME_PATH = (i: number) =>
  `/images/systematic/final_${String(i).padStart(5, "0")}.png`;

// Sample every Nth frame to keep memory manageable (~748 images)
const SAMPLE_STEP = 3;
const SAMPLED_COUNT = Math.ceil(TOTAL_FRAMES / SAMPLE_STEP);

export function ApproachNetwork() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(
    new Array(SAMPLED_COUNT).fill(null)
  );
  const currentFrameRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [imagesAvailable, setImagesAvailable] = useState(true);

  // Draw a sampled frame index onto the canvas
  const drawFrame = useCallback((sampledIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = imagesRef.current[sampledIndex];
    if (!img) return;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  }, []);

  // Set canvas size and redraw
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawFrame(currentFrameRef.current);
  }, [drawFrame]);

  // Resize listener
  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [resizeCanvas]);

  // Preload frames
  useEffect(() => {
    let loaded = 0;
    let firstFailed = false;

    for (let i = 0; i < SAMPLED_COUNT; i++) {
      const frameIndex = i * SAMPLE_STEP;
      const img = new Image();
      img.src = FRAME_PATH(frameIndex);

      img.onload = () => {
        imagesRef.current[i] = img;
        loaded++;

        if (i === 0) {
          setIsReady(true);
          resizeCanvas();
          drawFrame(0);
        }

        if (loaded % 30 === 0 || loaded === SAMPLED_COUNT) {
          setLoadProgress(Math.round((loaded / SAMPLED_COUNT) * 100));
        }
      };

      img.onerror = () => {
        loaded++;
        // If the very first frame fails, images aren't available in this env
        if (i === 0 && !firstFailed) {
          firstFailed = true;
          setImagesAvailable(false);
          setIsReady(true);
        }
      };
    }
  }, [drawFrame, resizeCanvas]);

  // Scroll-driven frame selection
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !isReady || !imagesAvailable) return;

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / scrollable));
      const targetIndex = Math.round(progress * (SAMPLED_COUNT - 1));

      if (targetIndex !== currentFrameRef.current) {
        currentFrameRef.current = targetIndex;
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => drawFrame(targetIndex));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isReady, imagesAvailable, drawFrame]);

  /* ── Fallback: shown in production until images are served from CDN ── */
  if (imagesAvailable === false) {
    return (
      <section id="approach" className={styles.fallback}>
        <div className={styles.fallbackInner}>
          <p className={styles.fallbackLabel}>Systemic Approach</p>
          <h2 className={styles.fallbackTitle}>
            Structure is everywhere.<br />We just make it visible.
          </h2>
          <p className={styles.fallbackSub}>
            Every project begins as a chaotic cloud of ideas. We connect the
            dots, finding the hidden structure that transforms abstract concepts
            into tangible digital reality.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="approach" ref={sectionRef} className={styles.container}>
      <div className={styles.sticky}>
        <canvas ref={canvasRef} className={styles.canvas} />
        {!isReady && (
          <div className={styles.loader}>
            <div
              className={styles.loaderTrack}
              role="progressbar"
              aria-valuenow={loadProgress}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className={styles.loaderBar}
                style={{ width: `${loadProgress}%` }}
              />
            </div>
            <span className={styles.loaderText}>Loading {loadProgress}%</span>
          </div>
        )}
      </div>
    </section>
  );
}
