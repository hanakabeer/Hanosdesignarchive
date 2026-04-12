import { motion } from "framer-motion";
import { GrainShader } from "./GrainShader";
import { useCursorStore } from "@/hooks/use-cursor-store";
import styles from "./styles.module.css";

export function Hero() {
  const setCursorVisible = useCursorStore((state) => state.setCursorVisible);

  return (
    <section
      className={styles.hero}
      onMouseEnter={() => setCursorVisible(false)}
      onMouseLeave={() => setCursorVisible(true)}
    >
      <div className={styles.background}>
        <GrainShader textureUrl="/images/hero-bg.png" revealUrl="/images/hero inverted.png" />
        <div className={styles.vignette} />
      </div>

      <div className={styles.content}>
        <motion.h1 
          className={styles.headline}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          HANO’S DESIGN ARCHIVE
        </motion.h1>

        <div className={styles.tags}>
          <span className={styles.tag}>Industrial Designer</span>
          <span className={styles.tag}>UI/UX Designer</span>
        </div>
        
        <div className={styles.footerRow}>
          <motion.p 
            className={styles.subline}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
          >
            An evolving archive of work across industrial design, interfaces, and systems.
          </motion.p>
          <button className={styles.cta} onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}>
            View work
          </button>
        </div>
      </div>

      <motion.div 
        className={styles.scrollIndicator}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <span className={styles.label}>Scroll</span>
        <div className={styles.line} />
      </motion.div>
    </section>
  );
}
