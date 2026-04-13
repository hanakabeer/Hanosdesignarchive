import { motion } from "framer-motion";
import { useLocation } from "wouter";
import type { Project } from "@shared/schema";
import { useCursorStore } from "@/hooks/use-cursor-store";
import styles from "./styles.module.css";

interface ProjectGridProps {
  projects: Project[];
  isLoading: boolean;
}

export function ProjectGrid({ projects, isLoading }: ProjectGridProps) {
  const [, setLocation] = useLocation();
  const setCursorType = useCursorStore((state) => state.setCursorType);

  if (isLoading) {
    return (
      <div className={styles.loading}>
        Loading projects...
      </div>
    );
  }

  const numbers = ["01", "02", "03", "04", "05", "06"];
  const catalogueSubtitles = [
    "Adaptive Menstrual Care Object",
    "Small-Scale Rotomolding System",
    "Robotic Biocomposite Fabrication System",
    "Adaptive Grip Exploration",
    "Reverse Engineering Study",
    "Ritual Lighting Object",
  ];

  return (
    <section id="work" className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.heading}>
          <span className={styles.headingEyebrow}>Selected Work</span>
          <h2 className={styles.headingTitle}>Featured Projects</h2>
        </div>
        <div className={styles.grid}>
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className={styles.card}
              initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.75,
                ease: [0.16, 1, 0.3, 1],
                delay: index * 0.08,
              }}
              onClick={() => {
                setCursorType('default');
                setLocation(project.route);
              }}
              onMouseEnter={() => setCursorType('project')}
              onMouseLeave={() => setCursorType('default')}
            >
              <div className={styles.imageContainer}>
                <img
                  src={project.id === 5 ? "/images/hero%20images/sharpner.png" : project.imageUrl}
                  alt={project.title}
                  className={styles.image}
                />
              </div>
              <div className={styles.content}>
                <p className={styles.number}>CAT. {numbers[index % numbers.length]}</p>
                <h3 className={styles.title}>{project.title}</h3>
                <p className={styles.subtitle}>
                  {catalogueSubtitles[index] ?? project.category}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
