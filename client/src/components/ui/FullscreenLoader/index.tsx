import { useEffect, useMemo, useState } from "react";
import styles from "./styles.module.css";

type LoaderPhase = "visible" | "exiting";

export function FullscreenLoader({
  phase,
  wordmark = "HANO",
  onExited,
}: {
  phase: LoaderPhase;
  wordmark?: string;
  onExited: () => void;
}) {
  const [hasNotifiedExit, setHasNotifiedExit] = useState(false);

  useEffect(() => {
    const el = document.getElementById("boot-loader");
    if (el) el.remove();
  }, []);

  useEffect(() => {
    if (phase !== "exiting") return;
    const t = window.setTimeout(() => {
      if (hasNotifiedExit) return;
      setHasNotifiedExit(true);
      onExited();
    }, 1200);
    return () => window.clearTimeout(t);
  }, [hasNotifiedExit, onExited, phase]);

  const className = useMemo(() => {
    return `${styles.loader} ${phase === "exiting" ? styles.exiting : ""}`;
  }, [phase]);

  return (
    <div
      className={className}
      role="status"
      aria-live="polite"
      aria-label="Loading"
      onTransitionEnd={(e) => {
        if (phase !== "exiting") return;
        if (e.propertyName !== "opacity") return;
        if (hasNotifiedExit) return;
        setHasNotifiedExit(true);
        onExited();
      }}
    >
      <div className={styles.inner}>
        <div className={styles.wordmark}>{wordmark}</div>
        <div className={styles.bar} aria-hidden="true">
          <div className={styles.barFill} />
        </div>
      </div>
    </div>
  );
}

