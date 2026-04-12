import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import styles from "./styles.module.css";

export interface ProjectMeta {
    label: string;
    value: string | number;
}

export interface ProjectPanelItem {
    label: string;
    value: string;
}

export interface ProjectPanel {
    /** Panel heading label, e.g. "Project Snapshot", "Key Interventions", "Design Response" */
    heading: string;
    items: ProjectPanelItem[];
}

export interface ProjectHeroProps {
    /** Project title — large, impactful */
    title: string;
    /** Breadcrumb / page name shown in the nav path */
    breadcrumbLabel: string;
    /** One-line subtitle / process label */
    subtitle: string;
    /** 1–2 sentence description */
    description: string;
    /** Pills shown above the title */
    tags: string[];
    /** Structured key–value meta rows (shown in the info panel) */
    meta: ProjectMeta[];
    /** Optional editorial info panel alongside image */
    panel?: ProjectPanel;
    /** Hero image src */
    imageSrc: string;
    /** Hero image alt text */
    imageAlt: string;
    /** Accent colour override (defaults to css var) */
    accentColor?: string;
    /** Optional: scroll-to anchor target id */
    anchorId?: string;
    /** Optional theme override */
    theme?: "light" | "dark";
    /** Optional dark background override */
    darkBgColor?: string;
    /** Optional dark info panel background override */
    darkPanelBgColor?: string;
    /** Optional dark info panel border override */
    darkPanelBorderColor?: string;
}

const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.055, delayChildren: 0.08 } },
};

const item = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.72, ease: [0.16, 1, 0.3, 1] } },
};

const imgAnim = {
    hidden: { opacity: 0, scale: 0.96, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.1 } },
};

const panelAnim = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 } },
};

export function ProjectHero({
    title,
    breadcrumbLabel,
    subtitle,
    description,
    tags,
    meta,
    panel,
    imageSrc,
    imageAlt,
    accentColor,
    anchorId,
    theme = "light",
    darkBgColor,
    darkPanelBgColor,
    darkPanelBorderColor,
}: ProjectHeroProps) {
    const accent = accentColor ?? "var(--hero-accent, #E93D82)";

    // Build panel data: use explicit panel prop if given, otherwise derive from meta
    const panelData: ProjectPanel = panel ?? {
        heading: "Project Snapshot",
        items: meta.slice(0, 4).map(m => ({ label: String(m.label), value: String(m.value) })),
    };

    return (
        <section
            className={styles.hero}
            data-theme={theme}
            style={{
                "--accent": accent,
                ...(darkBgColor ? { "--hero-bg-dark": darkBgColor } : {}),
                ...(darkPanelBgColor ? { "--hero-panel-bg-dark": darkPanelBgColor } : {}),
                ...(darkPanelBorderColor ? { "--hero-panel-border-dark": darkPanelBorderColor } : {}),
            } as React.CSSProperties}
        >
            <div className={styles.heroInner}>

                {/* ── Left column — text ──────────────────────────────── */}
                <motion.div
                    className={styles.left}
                    variants={stagger}
                    initial="hidden"
                    animate="visible"
                >
                    {/* 1. Breadcrumb */}
                    <motion.div className={styles.breadcrumb} variants={item}>
                        <Link href="/">
                            <a className={styles.backLink}>
                                <ArrowLeft size={12} strokeWidth={2.2} />
                                Archive
                            </a>
                        </Link>
                        <span className={styles.breadcrumbSep}>/</span>
                        <span className={styles.breadcrumbCurrent}>{breadcrumbLabel}</span>
                    </motion.div>

                    {/* 2. Tags */}
                    <motion.div className={styles.tags} variants={item}>
                        {tags.map(tag => (
                            <span key={tag} className={styles.tag}>{tag}</span>
                        ))}
                    </motion.div>

                    {/* 3. Title */}
                    <motion.h1 className={styles.title} variants={item}>
                        {title}
                    </motion.h1>

                    {/* 4. Subtitle + description */}
                    <motion.p className={styles.subtitle} variants={item} style={{ color: accent }}>
                        {subtitle}
                    </motion.p>
                    <motion.p className={styles.description} variants={item}>
                        {description}
                    </motion.p>

                </motion.div>

                {/* ── Right area — image + floating panel ─────────────── */}
                <div className={styles.right}>

                    {/* Hero image */}
                    <motion.div
                        className={styles.imageWrap}
                        variants={imgAnim}
                        initial="hidden"
                        animate="visible"
                    >
                        <img
                            src={imageSrc}
                            alt={imageAlt}
                            className={styles.image}
                            loading="eager"
                            decoding="async"
                        />
                        {/* Subtle image number mark */}
                        <span className={styles.imageIndex} style={{ color: accent }}>
                            01
                        </span>
                    </motion.div>

                    {/* Floating info panel */}
                    <motion.div
                        className={styles.infoPanel}
                        variants={panelAnim}
                        initial="hidden"
                        animate="visible"
                    >
                        <span className={styles.infoPanelLabel} style={{ color: accent }}>
                            {panelData.heading}
                        </span>
                        <div className={styles.infoPanelItems}>
                            {panelData.items.map(pi => (
                                <div key={pi.label} className={styles.infoPanelItem}>
                                    <span className={styles.infoPanelItemLabel}>{pi.label}</span>
                                    <span className={styles.infoPanelItemValue}>{pi.value}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
