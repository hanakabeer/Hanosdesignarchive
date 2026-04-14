import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import styles from "./styles.module.css";

const VIDEO_PATH = "/images/final_2.mp4";

export function ApproachNetwork() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [isReady, setIsReady] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  // Scroll tracking with Framer Motion
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  // Smooth out the scroll progress for a more responsive but fluid feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 50,
    mass: 0.1,
    restDelta: 0.0001
  });

  // Opacity transforms
  const textOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);
  const videoOpacity = useTransform(smoothProgress, [0.15, 0.25], [0, 1]);

  // Handle video scrubbing with a frame-aware sync loop
  const targetTimeRef = useRef(0);
  
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isReady) return;

    // 1. Update the target time whenever scroll progress changes
    const unsubscribe = smoothProgress.on("change", (v) => {
      if (!video.duration) return;
      
      const videoStart = 0.1; // Start scrubbing earlier for more immediate feedback
      const videoEnd = 0.95; // End slightly before the very end to avoid issues
      
      let adjustedProgress = 0;
      if (v > videoStart) {
        adjustedProgress = Math.min(1, (v - videoStart) / (videoEnd - videoStart));
      }
      
      targetTimeRef.current = Math.min(adjustedProgress * video.duration, video.duration - 0.05);
    });

    // 2. Use a high-frequency loop to sync the video's currentTime to the target
    // but only if the video isn't already busy seeking. This prevents "stutter"
    // caused by overlapping seek requests.
    let rafId: number;
    const syncVideo = () => {
      if (video && !video.seeking) {
        // Only update if the difference is meaningful (e.g. > 1/60th of a second)
        const diff = Math.abs(video.currentTime - targetTimeRef.current);
        if (diff > 0.01) {
          video.currentTime = targetTimeRef.current;
        }
      }
      rafId = requestAnimationFrame(syncVideo);
    };

    rafId = requestAnimationFrame(syncVideo);

    return () => {
      unsubscribe();
      cancelAnimationFrame(rafId);
    };
  }, [isReady, smoothProgress]);

  // Handle video loading
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlayThrough = () => {
      setIsReady(true);
    };

    const handleProgress = () => {
      if (video.buffered.length > 0) {
        const bufferedEnd = video.buffered.end(video.buffered.length - 1);
        const duration = video.duration;
        if (duration > 0) {
          setLoadProgress(Math.round((bufferedEnd / duration) * 100));
        }
      }
    };

    const handleError = () => {
      setVideoError(true);
    };

    video.addEventListener("canplaythrough", handleCanPlayThrough);
    video.addEventListener("progress", handleProgress);
    video.addEventListener("error", handleError);

    if (video.readyState >= 4) {
      setIsReady(true);
    }

    return () => {
      video.removeEventListener("canplaythrough", handleCanPlayThrough);
      video.removeEventListener("progress", handleProgress);
      video.removeEventListener("error", handleError);
    };
  }, []);

  return (
    <section id="approach" ref={sectionRef} className={styles.container}>
      <div className={styles.sticky}>
        <div className={styles.stage}>
          <motion.video
            ref={videoRef}
            src={VIDEO_PATH}
            muted
            playsInline
            preload="auto"
            className={styles.video}
            style={{ opacity: isReady ? videoOpacity : 0 }}
          />

          {!isReady && !videoError && (
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
        
        <motion.div 
          className={styles.overlayText}
          style={{ opacity: textOpacity }}
        >
          <p className={styles.label}>Systemic Approach</p>
          <h2 className={styles.title}>
            Structure is everywhere.<br />We just make it visible.
          </h2>
          <p className={styles.sub}>
            Every project begins as a chaotic cloud of ideas. We connect the
            dots, finding the hidden structure that transforms abstract concepts
            into tangible digital reality.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
