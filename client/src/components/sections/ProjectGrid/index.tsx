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

  const titleColors = [
    "#F2A7A7",
    "#436D66",
    "#C5B358",
    "#A0A0A0",
    "#8B4513",
    "#2F4F4F",
  ];

  const numbers = ["01", "02", "03", "04", "05", "06"];

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
                setLocation(`/work/${project.id}`);
              }}
              onMouseEnter={() => setCursorType('project')}
              onMouseLeave={() => setCursorType('default')}
            >
              <div className={styles.imageContainer}>
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className={styles.image}
                />
              </div>
              <div className={styles.content}>
                <h3 className={styles.title} style={{ color: titleColors[index % titleColors.length] }}>
                  <span className={styles.number}>{numbers[index % numbers.length]}</span> {project.title}{index < 3 ? '.' : ''}
                </h3>
                <div className={styles.details}>
                  <p className={styles.category}>{project.category}</p>
                  <p className={styles.role}>{project.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
