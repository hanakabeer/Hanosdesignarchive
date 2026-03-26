import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const PROJECTS = [
    { id: 1, title: "Mumo", tag: "Adaptive Menstrual Care" },
    { id: 2, title: "Cascader", tag: "Industrial Tool Design" },
    { id: 3, title: "VersaGrip", tag: "Ergonomic Hand Tool" },
    { id: 4, title: "PortaPalm", tag: "Portable Wellness Tech" },
    { id: 5, title: "Mycrochet", tag: "Craft Community Platform" },
    { id: 6, title: "Bukhoorie", tag: "Heritage Fragrance Brand" },
];

interface Props {
    currentId: number;
}

export function ProjectNav({ currentId }: Props) {
    const idx = PROJECTS.findIndex((p) => p.id === currentId);
    const prev = idx > 0 ? PROJECTS[idx - 1] : null;
    const next = idx < PROJECTS.length - 1 ? PROJECTS[idx + 1] : null;

    return (
        <section style={{
            borderTop: "1px solid rgba(0,0,0,0.08)",
            padding: "5rem 3rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            maxWidth: "1100px",
            margin: "0 auto",
            gap: "2rem",
        }}>
            {/* Previous */}
            {prev ? (
                <motion.div
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                >
                    <Link href={`/work/${prev.id}`}>
                        <a style={{ textDecoration: "none", display: "flex", flexDirection: "column", gap: "0.4rem", cursor: "pointer" }}>
                            <span style={{
                                display: "inline-flex", alignItems: "center", gap: "0.4rem",
                                fontFamily: "Inter, sans-serif", fontSize: "0.7rem",
                                letterSpacing: "0.18em", textTransform: "uppercase",
                                color: "#aaa", marginBottom: "0.25rem",
                            }}>
                                <ArrowLeft size={12} /> Previous Project
                            </span>
                            <span style={{
                                fontFamily: "Bricolage Grotesque, sans-serif",
                                fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                                fontWeight: 800, letterSpacing: "-0.04em",
                                color: "#101319", lineHeight: 1.1,
                                transition: "color 0.2s",
                            }}
                                onMouseEnter={(e) => (e.currentTarget.style.color = "#E93D82")}
                                onMouseLeave={(e) => (e.currentTarget.style.color = "#101319")}
                            >
                                {prev.title}
                            </span>
                            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8rem", color: "#999" }}>
                                {prev.tag}
                            </span>
                        </a>
                    </Link>
                </motion.div>
            ) : (
                <div />
            )}

            {/* Back to archive (centre) */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                style={{ textAlign: "center" }}
            >
                <Link href="/">
                    <a style={{
                        fontFamily: "Inter, sans-serif", fontSize: "0.72rem",
                        letterSpacing: "0.2em", textTransform: "uppercase",
                        color: "#bbb", textDecoration: "none",
                        transition: "color 0.2s",
                    }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "#E93D82")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "#bbb")}
                    >
                        ↑ Back to Archive
                    </a>
                </Link>
            </motion.div>

            {/* Next */}
            {next ? (
                <motion.div
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    style={{ textAlign: "right" }}
                >
                    <Link href={`/work/${next.id}`}>
                        <a style={{ textDecoration: "none", display: "flex", flexDirection: "column", gap: "0.4rem", alignItems: "flex-end", cursor: "pointer" }}>
                            <span style={{
                                display: "inline-flex", alignItems: "center", gap: "0.4rem",
                                fontFamily: "Inter, sans-serif", fontSize: "0.7rem",
                                letterSpacing: "0.18em", textTransform: "uppercase",
                                color: "#aaa", marginBottom: "0.25rem",
                            }}>
                                Next Project <ArrowRight size={12} />
                            </span>
                            <span style={{
                                fontFamily: "Bricolage Grotesque, sans-serif",
                                fontSize: "clamp(1.5rem, 3vw, 2.2rem)",
                                fontWeight: 800, letterSpacing: "-0.04em",
                                color: "#101319", lineHeight: 1.1,
                                transition: "color 0.2s",
                            }}
                                onMouseEnter={(e) => (e.currentTarget.style.color = "#E93D82")}
                                onMouseLeave={(e) => (e.currentTarget.style.color = "#101319")}
                            >
                                {next.title}
                            </span>
                            <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.8rem", color: "#999" }}>
                                {next.tag}
                            </span>
                        </a>
                    </Link>
                </motion.div>
            ) : (
                <div />
            )}
        </section>
    );
}
