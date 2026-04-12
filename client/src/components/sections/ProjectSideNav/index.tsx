import { useEffect, useRef, useState } from "react";
import { animate } from "framer-motion";
import styles from "./styles.module.css";

export interface SideNavSection {
    id: string;
    label: string;
}

interface Props {
    sections: SideNavSection[];
    /** Accent colour that matches the project theme */
    accentColor?: string;
    /** If true, scrolls exactly to the element top without header offset */
    isImmersive?: boolean;
}

export function ProjectSideNav({ sections, accentColor = "#E93D82", isImmersive = false }: Props) {
    const [activeId, setActiveId] = useState<string>("");
    const [theme, setTheme] = useState<"light" | "dark">("dark");
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        // Fire the observer with a threshold spread so we know which section
        // owns the center of the viewport at any given moment.
        const options: IntersectionObserverInit = {
            rootMargin: "-20% 0px -60% 0px", // triggers when section is in top-middle area
            threshold: 0,
        };

        observerRef.current = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveId(entry.target.id);
                    
                    // Detect theme from section data attribute or computed style
                    const sectionTheme = entry.target.getAttribute("data-theme") as "light" | "dark";
                    if (sectionTheme) {
                        setTheme(sectionTheme);
                    } else {
                        // Fallback: check background color brightness
                        const bg = window.getComputedStyle(entry.target).backgroundColor;
                        if (bg) {
                            const rgb = bg.match(/\d+/g);
                            if (rgb) {
                                const brightness = (Number(rgb[0]) * 299 + Number(rgb[1]) * 587 + Number(rgb[2]) * 114) / 1000;
                                setTheme(brightness > 128 ? "light" : "dark");
                            }
                        }
                    }
                }
            });
        }, options);

        sections.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observerRef.current!.observe(el);
        });

        return () => observerRef.current?.disconnect();
    }, [sections]);

    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (!el) return;

        if (isImmersive) {
            // Use satisfying spring for immersive pages
            animate(window.scrollY, el.offsetTop, {
                type: "spring",
                stiffness: 120,
                damping: 24,
                mass: 1,
                restDelta: 1,
                onUpdate: (latest) => window.scrollTo(0, latest)
            });
        } else {
            // Standard scroll for normal pages
            const navHeight = 120;
            const targetPosition = el.getBoundingClientRect().top + window.pageYOffset - (navHeight + 20);
            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });
        }
    };

    return (
        <nav
            className={styles.sideNav}
            aria-label="Section navigation"
            data-theme={theme}
            data-visible={activeId ? "true" : "false"}
            style={{ "--accent": accentColor } as React.CSSProperties}
        >
            <div className={styles.railLine} />
            {sections.map(({ id, label }) => {
                const isActive = activeId === id;
                return (
                    <button
                        key={id}
                        className={`${styles.navItem} ${isActive ? styles.active : ""}`}
                        onClick={() => scrollTo(id)}
                        aria-label={`Jump to ${label}`}
                        type="button"
                    >
                        <span className={styles.label}>{label}</span>
                        <div className={styles.dotContainer}>
                            <span className={styles.dot} />
                        </div>
                    </button>
                );
            })}
        </nav>
    );
}
