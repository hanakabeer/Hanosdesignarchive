import { useEffect, useRef, useCallback, useState } from "react";
import styles from "./styles.module.css";

/* ── stamp image pool ─────────────────────────────────── */
const STAMP_SRCS = Array.from({ length: 9 }, (_, i) => `/images/stamps/${i + 1}.png`);

interface StampInstance {
  id: number;
  src: string;
  x: number;      // px from left of container
  y: number;      // px from top of container
  rotate: number;
  scale: number;
}

let uid = 0;

/* minimum px distance between consecutive stamps */
const MIN_DIST = 40;

export function FooterContact() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const lastPos = useRef<{ x: number; y: number } | null>(null);
  const [stamps, setStamps] = useState<StampInstance[]>([]);
  const [hinted, setHinted] = useState(false);
  const stampIndexRef = useRef(0); // cycles through stamps in order

  const addStamp = useCallback((clientX: number, clientY: number) => {
    const el = canvasRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // throttle by distance
    if (lastPos.current) {
      const dx = x - lastPos.current.x;
      const dy = y - lastPos.current.y;
      if (Math.sqrt(dx * dx + dy * dy) < MIN_DIST) return;
    }
    lastPos.current = { x, y };

    // cycle through stamps in order, with slight randomisation
    const idx = stampIndexRef.current % STAMP_SRCS.length;
    stampIndexRef.current += 1;

    const newStamp: StampInstance = {
      id: uid++,
      src: STAMP_SRCS[idx],
      x: x,
      y: y,
      rotate: (Math.random() - 0.5) * 10,
      scale: 0.55 + Math.random() * 0.55,
    };

    if (!hinted) setHinted(true);
    setStamps(prev => [...prev, newStamp]);
  }, [hinted]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    addStamp(e.clientX, e.clientY);
  }, [addStamp]);

  /* touch support */
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    const t = e.touches[0];
    addStamp(t.clientX, t.clientY);
  }, [addStamp]);

  /* clear on double-click */
  const handleDoubleClick = useCallback(() => {
    setStamps([]);
    lastPos.current = null;
    stampIndexRef.current = 0;
    setHinted(false);
  }, []);

  return (
    <footer id="contact" className={styles.footer}>
      {/* ── meta bar ── */}
      <div className={styles.meta}>
        <span className={styles.metaItem}>(Creative)</span>
        <span className={styles.metaItem}>(2023–2025)</span>
        <span className={styles.metaItem}>(Design)</span>
      </div>

      {/* ── interactive stamp canvas ── */}
      <div
        ref={canvasRef}
        className={styles.stampCanvas}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onDoubleClick={handleDoubleClick}
      >
        {/* large heading sits behind stamps */}
        <div className={styles.canvasHeading}>
          <h2 className={styles.thanks}>
            Thank <i>You</i>
          </h2>
          {!hinted && (
            <p className={styles.canvasHint}>
              Move your cursor to leave a mark &nbsp;·&nbsp; double-click to clear
            </p>
          )}
        </div>

        {/* stamps */}
        {stamps.map(stamp => (
          <div
            key={stamp.id}
            className={styles.stampItem}
            style={{
              left: `${stamp.x}px`,
              top: `${stamp.y}px`,
              transform: `translate(-50%, -50%) rotate(${stamp.rotate}deg) scale(${stamp.scale})`,
            }}
          >
            <img src={stamp.src} alt="" draggable={false} />
          </div>
        ))}

        {/* status box — stays centered on top of stamps */}
        <div className={styles.statusBox}>
          <span className={styles.statusLabel}>Looking Forward to</span>
          <span className={styles.statusValue}>Connect with You!</span>
        </div>
      </div>

      {/* ── footer bottom bar ── */}
      <div className={styles.footerBottom}>
        <div className={styles.contactList}>
          <div className={styles.contactGroup}>
            <span className={styles.label}>Email</span>
            <a href="mailto:agustinkmira22@gmail.com">agustinkmira22@gmail.com</a>
          </div>
          <div className={styles.contactGroup}>
            <span className={styles.label}>Phone</span>
            <span>+62 895 1892 4877</span>
          </div>
          <div className={styles.socials}>
            <a href="#">linkedin.com/in/agustinkmira/</a>
            <a href="#">instagram.com/agustinkmira/</a>
            <a href="#">behance.net/agustinkmira</a>
          </div>
        </div>

        <div className={styles.signature}>
          <span className={styles.regards}>Warm Regards,</span>
          <div className={styles.signImg}>Hano</div>
        </div>
      </div>
    </footer>
  );
}
