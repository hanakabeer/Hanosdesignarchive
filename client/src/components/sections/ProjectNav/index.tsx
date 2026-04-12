import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { PROJECT_REGISTRY, getProjectIndexById } from "@/lib/projectRegistry";
import styles from "./styles.module.css";

interface Props {
  currentId: number;
}

const PROJECT_HOVER_MEDIA: Record<number, string> = {
  1: "/images/stamps/1.png",
  2: "/images/stamps/2.png",
  3: "/images/stamps/5.png",
  4: "/images/stamps/3.png",
  5: "/images/stamps/6.png",
  6: "/images/stamps/4.png",
};

export function ProjectNav({ currentId }: Props) {
  const idx = getProjectIndexById(currentId);
  const prev = idx > 0 ? PROJECT_REGISTRY[idx - 1] : null;
  const next = idx >= 0 && idx < PROJECT_REGISTRY.length - 1 ? PROJECT_REGISTRY[idx + 1] : null;

  if (!prev && !next) return null;

  return (
    <section className={styles.navSection}>
      <div className={styles.inner}>
        {prev ? (
          <motion.div
            className={`${styles.itemWrap} ${styles.itemLeft}`}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link href={prev.route}>
              <a className={styles.card}>
                <span className={styles.mediaGlow} />
                <img
                  src={PROJECT_HOVER_MEDIA[prev.id]}
                  alt=""
                  aria-hidden="true"
                  className={styles.hoverObject}
                />
                <span className={styles.eyebrow}>
                  <ArrowLeft size={14} />
                  Previous Project
                </span>
                <span className={styles.title}>{prev.title}</span>
                <span className={styles.tag}>{prev.tag}</span>
              </a>
            </Link>
          </motion.div>
        ) : (
          <div className={`${styles.emptyCard} ${styles.itemLeft}`} />
        )}

        <div className={styles.centerWrap}>
          <Link href="/#work">
            <a className={styles.backToWork}>Back to Archive</a>
          </Link>
        </div>

        {next ? (
          <motion.div
            className={`${styles.itemWrap} ${styles.itemRight}`}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
          >
            <Link href={next.route}>
              <a className={`${styles.card} ${styles.cardRight}`}>
                <span className={styles.mediaGlow} />
                <img
                  src={PROJECT_HOVER_MEDIA[next.id]}
                  alt=""
                  aria-hidden="true"
                  className={styles.hoverObject}
                />
                <span className={styles.eyebrow}>
                  Next Project
                  <ArrowRight size={14} />
                </span>
                <span className={styles.title}>{next.title}</span>
                <span className={styles.tag}>{next.tag}</span>
              </a>
            </Link>
          </motion.div>
        ) : (
          <div className={`${styles.emptyCard} ${styles.itemRight}`} />
        )}
      </div>
    </section>
  );
}
