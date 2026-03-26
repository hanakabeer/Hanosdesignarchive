import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import type { Project } from "@shared/schema";
import { Navbar } from "@/components/sections/Navbar";
import { ProjectNav } from "@/components/sections/ProjectNav";
import styles from "./styles.module.css";

const sectionVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07, delayChildren: 0 } },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

const fadeUp = item;

interface Props { project: Project; }

export function CascaderProjectPage({ project }: Props) {
    return (
        <div className={styles.page}>
            <Navbar />

            {/* ═══════════════════════════════════════════════════════
          PAGE 1 — INTRODUCTION  (light)
            ═══════════════════════════════════════════════════════ */}
            <section className={styles.intro}>
                <div className={styles.introInner}>

                    <motion.div
                        className={styles.breadcrumb}
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
                    >
                        <Link href="/"><a className={styles.backLink}><ArrowLeft size={13} /> Archive</a></Link>
                        <span className={styles.sep}>/</span>
                        <span className={styles.curr}>CASCAder</span>
                    </motion.div>

                    <motion.div className={styles.titleBlock} variants={fadeUp} initial="hidden" animate="visible">
                        <h1 className={styles.heroTitle}>CASCAder</h1>
                        <div className={styles.accentLine} />
                        <p className={styles.heroSub}>Small-Scale Rotational Casting System</p>
                        <p className={styles.heroClaim}>
                            Designing a fabrication tool to study hollow object manufacturing.
                        </p>
                    </motion.div>

                    <motion.div
                        className={styles.heroImageWrap}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
                    >
                        <img
                            src="/images/hero images/rotomoldin.png"
                            alt="Cascader rotational molding machine"
                            className={styles.heroImg}
                            loading="eager"
                            decoding="async"
                        />
                    </motion.div>

                    <motion.p
                        className={styles.introParagraph}
                        variants={fadeUp} custom={3} initial="hidden" animate="visible"
                    >
                        CASCAder is a compact rotational casting system developed to explore hollow polyhedral
                        structures and modular assemblies. The project investigates how rotation stability,
                        structural rigidity, and material constraints influence casting quality.
                    </motion.p>

                    <motion.div
                        className={styles.metaRow}
                        variants={fadeUp} custom={4} initial="hidden" animate="visible"
                    >
                        {[
                            { label: "Type", value: "Group Project" },
                            { label: "Process", value: "Rotational Casting" },
                            { label: "System", value: "Modular Fabrication" },
                            { label: "Year", value: project.year },
                        ].map(m => (
                            <div key={m.label} className={styles.metaItem}>
                                <span className={styles.metaLabel}>{m.label}</span>
                                <span className={styles.metaValue}>{m.value}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════
          PAGE 2 — CONTEXT  (dark)
            ═══════════════════════════════════════════════════════ */}
            <section className={styles.mechanism}>
                <motion.div
                    className={styles.sectionInner}
                    variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }}
                >
                    <div className={styles.mechanismGrid}>
                        <motion.div className={styles.diagramWrap} variants={item}>
                            <div className={styles.diagram}>
                                <img
                                    src="/images/PROJECTS/Cascader/Copy of MOULD (1).png"
                                    alt="Two-axis rotation diagram"
                                    className={styles.diagramImg}
                                    loading="lazy"
                                    decoding="async"
                                />
                            </div>
                        </motion.div>

                        <div className={styles.mechanismText}>
                            <motion.div className={styles.sectionTag} variants={item}>CONTEXT</motion.div>
                            <motion.h2 className={styles.darkHeading} variants={item}>
                                Why rotational casting
                            </motion.h2>
                            <motion.p className={styles.darkSubhead} variants={item}>
                                Principle: two-axis rotation for uniform wall thickness
                            </motion.p>
                            <motion.p className={styles.darkBody} variants={item}>
                                Rotational casting enables lightweight hollow forms, but small-scale setups fail
                                easily due to wobble, imbalance, and inconsistent motion. This project focused
                                on achieving stable two-axis rotation to control wall thickness and part quality.
                            </motion.p>
                        </div>
                    </div>

                    {/* process flow diagram */}

                </motion.div>
            </section>

            {/* ═══════════════════════════════════════════════════════
          PAGE 3 — SCRAP CONSTRAINT STRATEGY  (light)
            ═══════════════════════════════════════════════════════ */}
            <section className={styles.scrap}>
                <motion.div
                    className={styles.sectionInner}
                    variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}
                >
                    <motion.div className={styles.sectionTag} variants={item} style={{ color: "var(--c-orange)" }}>CONSTRAINT</motion.div>
                    <motion.h2 className={styles.scrapTitle} variants={item}>
                        Material Sourcing &amp; Scrap Strategy
                    </motion.h2>
                    <motion.p className={styles.scrapIntro} variants={item}>
                        The machine was built entirely from available scrap stock. Material selection was driven
                        by availability, then tested for rigidity, moisture resistance, and machinability.
                    </motion.p>
                    <motion.div className={styles.scrapLogicRow} variants={item}>
                        <div className={styles.scrapBlock}>
                            <div className={styles.scrapBlockAccent} />
                            <div>
                                <p className={styles.scrapBlockTitle}>100% Scrap Build</p>
                                <p className={styles.scrapBlockBody}>No new materials purchased. All components sourced from workshop offcuts.</p>
                            </div>
                        </div>
                        <div className={styles.scrapBlock}>
                            <div className={styles.scrapBlockAccent} />
                            <div>
                                <p className={styles.scrapBlockTitle}>Selection Criteria</p>
                                <p className={styles.scrapBlockBody}>Rigidity · Moisture resistance · Machinability · Availability</p>
                            </div>
                        </div>
                        <div className={styles.scrapBlock}>
                            <div className={styles.scrapBlockAccent} />
                            <div>
                                <p className={styles.scrapBlockTitle}>Learning</p>
                                <p className={styles.scrapBlockBody}>
                                    Scrap variability required structural reinforcement and bracket refinement to maintain rotational stability.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                    {/* 5 tiles — one row */}
                    <motion.div className={styles.scrapGrid} variants={item}>
                        {[
                            { src: "/images/PROJECTS/Cascader/materials/Brown Laminated MDF.png", name: "Brown Laminated MDF", thick: "18mm", prop: "Scratch resistant" },
                            { src: "/images/PROJECTS/Cascader/materials/Green waterproof.png", name: "Green Waterproof MDF", thick: "18mm", prop: "Moisture resistant" },
                            { src: "/images/PROJECTS/Cascader/materials/White laminated  MDF.png", name: "White Laminated MDF", thick: "18mm", prop: "Smooth finish" },
                            { src: "/images/PROJECTS/Cascader/materials/Plywood 1.png", name: "Plywood", thick: "12mm", prop: "Lightweight" },
                            { src: "/images/PROJECTS/Cascader/materials/Plywood 2.png", name: "Plywood (coated)", thick: "15mm", prop: "Durable surface" },
                        ].map(mat => (
                            <div key={mat.name} className={styles.scrapTile}>
                                <div className={styles.scrapImgWrap}>
                                    <img src={mat.src} alt={mat.name} className={styles.scrapImg} loading="lazy" decoding="async" />
                                </div>
                                <div className={styles.scrapTileInfo}>
                                    <span className={styles.scrapTileName}>{mat.name} · {mat.thick}</span>
                                    <span className={styles.scrapTileProp}>{mat.prop}</span>
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    {/* logic blocks — 3 columns below the grid */}

                </motion.div>
            </section>

            {/* ═══════════════════════════════════════════════════════
          PAGE 4 — MACHINE ITERATION  (dark)
            ═══════════════════════════════════════════════════════ */}
            <section className={styles.iteration}>
                <motion.div
                    className={styles.sectionInner}
                    variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }}
                >
                    <motion.div className={styles.sectionTag} variants={item}>ITERATIVE PROTOTYPING</motion.div>

                    {/* ── A — Base Evolution ── */}
                    <motion.div className={styles.iterSection} variants={item}>
                        <p className={styles.iterLabel}>A — Base Evolution</p>
                        <div className={styles.frameOptions}>
                            <div className={styles.frameOption}>
                                <div className={styles.frameOptionImgWrap}>
                                    <img
                                        src="/images/PROJECTS/Cascader/prototyping/IShapedBase.png"
                                        alt="I-Shaped Base"
                                        className={styles.frameOptionImg}
                                        loading="lazy" decoding="async"
                                    />
                                </div>
                                <span className={styles.frameOptionBadgeReject}>REJECTED</span>
                                <p className={styles.frameOptionName}>'I' – Shaped Base</p>
                                <p className={styles.frameOptionReason}>Low stability — lacks lateral support, unstable at 6–10 RPM</p>
                            </div>
                            <div className={`${styles.frameOption} ${styles.frameOptionSelected}`}>
                                <div className={styles.frameOptionImgWrap}>
                                    <img
                                        src="/images/PROJECTS/Cascader/prototyping/Rectriangular Base.png"
                                        alt="RecTriangular Base"
                                        className={styles.frameOptionImg}
                                        loading="lazy" decoding="async"
                                    />
                                </div>
                                <span className={styles.frameOptionBadgeSelect}>SELECTED</span>
                                <p className={styles.frameOptionName}>RecTriangular Base</p>
                                <p className={styles.frameOptionReason}>Triangular surface area · Stable across full RPM range · 15 min assembly</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* ── B — Bracket Evolution ── */}
                    <motion.div className={styles.iterSection} variants={item}>
                        <p className={styles.iterLabel}>B — Bracket Evolution</p>
                        <div className={`${styles.frameOptions} ${styles.frameOptions5}`}>
                            {[
                                { n: 1, badge: "frameOptionBadgeReject" as const, status: "REJECTED", reason: "X-axis only — fails on Y and Z axes" },
                                { n: 2, badge: "frameOptionBadgeReject" as const, status: "REJECTED", reason: "X + Z stable, Y-axis still fails" },
                                { n: 3, badge: "frameOptionBadgeReject" as const, status: "PARTIAL", reason: "All axes stable but over-engineered" },
                                { n: 4, badge: "frameOptionBadgeReject" as const, status: "GOOD", reason: "Stable — refined geometry, minor fit issues" },
                                { n: 5, badge: "frameOptionBadgeSelect" as const, status: "SELECTED", reason: "Full 3-axis stability · Clean bearing fit · Final build" },
                            ].map(({ n, badge, status, reason }) => (
                                <div key={n} className={`${styles.frameOption} ${status === "SELECTED" ? styles.frameOptionSelected : ""}`}>
                                    <div className={styles.frameOptionImgWrap}>
                                        <img
                                            src={`/images/PROJECTS/Cascader/prototyping/Prototype ${n}.png`}
                                            alt={`Bracket prototype ${n}`}
                                            className={styles.frameOptionImg}
                                            loading="lazy" decoding="async"
                                        />
                                    </div>
                                    <span className={styles[badge]}>{status}</span>
                                    <p className={styles.frameOptionName}>P{n}</p>
                                    <p className={styles.frameOptionReason}>{reason}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* ── C — Frame Decision ── */}
                    <motion.div className={styles.iterSection} variants={item}>
                        <p className={styles.iterLabel}>C — Frame Decision</p>
                        <div className={styles.frameOptions}>
                            {/* Option 1 — Rejected */}
                            <div className={styles.frameOption}>
                                <div className={styles.frameOptionImgWrap}>
                                    <img
                                        src="/images/PROJECTS/Cascader/materials/Brown Laminated MDF.png"
                                        alt="Brown Laminated MDF"
                                        className={styles.frameOptionImg}
                                        loading="lazy" decoding="async"
                                    />
                                </div>
                                <span className={styles.frameOptionBadgeReject}>REJECTED</span>
                                <p className={styles.frameOptionName}>Brown Laminated MDF</p>
                                <p className={styles.frameOptionReason}>Too heavy — adds unwanted frame mass</p>
                            </div>

                            {/* Option 2 — Rejected */}
                            <div className={styles.frameOption}>
                                <div className={styles.frameOptionImgWrap}>
                                    <img
                                        src="/images/PROJECTS/Cascader/prototyping/Plywood 1.png"
                                        alt="Plywood"
                                        className={styles.frameOptionImg}
                                        loading="lazy" decoding="async"
                                    />
                                </div>
                                <span className={styles.frameOptionBadgeReject}>REJECTED</span>
                                <p className={styles.frameOptionName}>Plywood</p>
                                <p className={styles.frameOptionReason}>Surface too rough for bearing interface</p>
                            </div>

                            {/* Option 3 — Selected */}
                            <div className={`${styles.frameOption} ${styles.frameOptionSelected}`}>
                                <div className={styles.frameOptionImgWrap}>
                                    <img
                                        src="/images/PROJECTS/Cascader/prototyping/White laminated mdf .png"
                                        alt="White Laminated MDF"
                                        className={styles.frameOptionImg}
                                        loading="lazy" decoding="async"
                                    />
                                </div>
                                <span className={styles.frameOptionBadgeSelect}>SELECTED</span>
                                <p className={styles.frameOptionName}>White Laminated MDF</p>
                                <p className={styles.frameOptionReason}>CNC precision joints · Smooth surface · Bearing-ready</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.p className={styles.boldLine} variants={item}>
                        Multi-directional support significantly improved rotational stability.
                    </motion.p>
                </motion.div>
            </section>

            {/* ═══════════════════════════════════════════════════════
          PAGE 5 — POLYHEDRAL CASTING SYSTEM  (light)
            ═══════════════════════════════════════════════════════ */}
            <section className={styles.polyhedral}>
                <motion.div
                    className={styles.sectionInner}
                    variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.08 }}
                >
                    <motion.div className={styles.sectionTag} variants={item} style={{ color: "var(--c-orange)" }}>MODULAR APPLICATION</motion.div>
                    <motion.h2 className={styles.polyTitle} variants={item}>
                        Modular Polyhedral Exploration
                    </motion.h2>

                    {/* Top row — geometry diagram + 3D printed modules */}
                    <motion.div className={styles.polyTopRow} variants={item}>
                        <div className={styles.polyPlaceholder}>
                            <img
                                src="/images/PROJECTS/Cascader/polyhedra_maindiagram.png"
                                alt="Polyhedral geometry diagram"
                                className={styles.polyImg}
                                style={{ aspectRatio: "4/3", objectFit: "cover" }}
                                loading="lazy" decoding="async"
                            />
                            <span className={styles.polyImgCap}>Polyhedral geometry — modular form study</span>
                        </div>
                        <div className={styles.polyPlaceholder}>
                            <img
                                src="/images/PROJECTS/Cascader/3d printed polyhedra.png"
                                alt="3D printed polyhedral modules"
                                className={styles.polyImg}
                                style={{ aspectRatio: "4/3", objectFit: "cover" }}
                                loading="lazy" decoding="async"
                            />
                            <span className={styles.polyImgCap}>3D printed polyhedral modules</span>
                        </div>
                    </motion.div>

                    {/* Mid row — Grasshopper + magnet + construction */}
                    <motion.div className={styles.polyMidRow} variants={item}>
                        <div className={styles.polyMidCard}>
                            <img
                                src="/images/PROJECTS/Cascader/magnetplacement_grasshopper.png"
                                alt="Magnet placement Grasshopper script"
                                className={styles.polyMidImg}
                                loading="lazy" decoding="async"
                            />
                            <span className={styles.polyImgCap}>Magnet placement — Grasshopper script</span>
                        </div>
                        <div className={styles.polyMidCard}>
                            <img
                                src="/images/PROJECTS/Cascader/magnetplacementpolyhedra.png"
                                alt="Magnet placement on physical polyhedra"
                                className={styles.polyMidImg}
                                loading="lazy" decoding="async"
                            />
                            <span className={styles.polyImgCap}>Magnet placement — physical prototypes</span>
                        </div>
                        <div className={styles.polyMidCard}>
                            <img
                                src="/images/PROJECTS/Cascader/construction_polyhedra.png"
                                alt="Polyhedral construction process"
                                className={styles.polyMidImg}
                                loading="lazy" decoding="async"
                            />
                            <span className={styles.polyImgCap}>Assembly construction</span>
                        </div>
                    </motion.div>

                    {/* Casting process */}
                    <motion.div className={styles.castingRow} variants={item}>
                        <div className={styles.castingPhotos}>
                            <div className={styles.castingPhoto}>
                                <img src="/images/PROJECTS/Cascader/silicon_mould.png" alt="Silicone mold" className={styles.castingImg} loading="lazy" decoding="async" />
                                <span className={styles.castingCap}>Silicone mold making</span>
                            </div>
                            <div className={styles.castingPhoto}>
                                <img src="/images/PROJECTS/Cascader/jesmonite triala.png" alt="Jesmonite casting trial" className={styles.castingImg} loading="lazy" decoding="async" />
                                <span className={styles.castingCap}>Jesmonite casting trial</span>
                            </div>
                        </div>
                        <div className={styles.castingBullets}>
                            <p className={styles.polyStackLabel}>PROCESS</p>
                            <p className={styles.castingBodyText}>
                                The mould was designed to be reusable across multiple casting cycles. Jesmonite
                                was selected for its low shrinkage and compatibility with fine surface detail. Rotation
                                speed was calibrated to avoid pooling in complex polyhedral geometries.
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            </section>

            {/* ═══════════════════════════════════════════════════════
          PAGE 6 — STACKED ASSEMBLIES  (dark)
            ═══════════════════════════════════════════════════════ */}
            <section className={styles.stackedSection}>
                <motion.div
                    className={styles.sectionInner}
                    variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.08 }}
                >
                    <motion.div className={styles.sectionTag} variants={item}>APPLICATION</motion.div>
                    <motion.h2 className={styles.darkHeading} variants={item}>
                        Stacked Modular Assemblies
                    </motion.h2>
                    <motion.p className={styles.darkBody} variants={item}>
                        The polyhedral modules connect magnetically and can be stacked into a range of
                        product typologies — demonstrating the system's flexibility beyond the casting process itself.
                    </motion.p>

                    <motion.div className={styles.polyStackGrid} variants={item}>
                        {[
                            { src: "/images/PROJECTS/Cascader/Stacked_lamp.png", cap: "Lamp" },
                            { src: "/images/PROJECTS/Cascader/Stacked_shelf.png", cap: "Shelf" },
                            { src: "/images/PROJECTS/Cascader/stacked_sidetable.png", cap: "Side table" },
                            { src: "/images/PROJECTS/Cascader/stacked_table.png", cap: "Table" },
                        ].map(p => (
                            <div key={p.cap} className={styles.polyStackItem}>
                                <img src={p.src} alt={p.cap} className={styles.polyStackImg} loading="lazy" decoding="async" />
                                <span className={styles.castingCap}>{p.cap}</span>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            </section>

            {/* ═══════════════════════════════════════════════════════
          PAGE 7 — DIGITAL SIMULATION  (light)
            ═══════════════════════════════════════════════════════ */}
            <section className={styles.simulation}>
                <motion.div
                    className={styles.sectionInner}
                    variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.08 }}
                >
                    <motion.div className={styles.sectionTag} variants={item} style={{ color: "var(--c-orange)" }}>SIMULATION</motion.div>
                    <motion.h2 className={styles.simTitle} variants={item}>
                        Digital Simulation
                    </motion.h2>
                    <motion.p className={styles.scrapIntro} variants={item}>
                        A digital simulation of the two-axis rotation was developed to test rotation stability
                        and predict material behaviour before physical casting trials.
                    </motion.p>

                    <motion.div className={styles.simVideoWrap} variants={item}>
                        <video
                            className={styles.simVideo}
                            src="/images/PROJECTS/Cascader/digitalsimulation.mp4"
                            autoPlay
                            muted
                            loop
                            playsInline
                        />
                        <p className={styles.simCaption}>Two-axis rotation simulation — motion stability study</p>
                    </motion.div>
                </motion.div>
            </section>

            {/* ═══════════════════════════════════════════════════════
          PAGE 8 — TECHNICAL DOCUMENTATION  (dark)
            ═══════════════════════════════════════════════════════ */}
            <section className={styles.techDraw}>
                <motion.div
                    className={styles.sectionInner}
                    variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.08 }}
                >
                    <motion.div className={styles.sectionTag} variants={item}>FABRICATION</motion.div>
                    <motion.h2 className={styles.darkHeading} variants={item}>
                        Technical Documentation
                    </motion.h2>
                    <motion.p className={styles.darkBody} variants={item}>
                        The mould geometry was developed in parallel with the casting machine, ensuring
                        each component was manufacturable within the constraints of available tooling and scrap material.
                    </motion.p>

                    <div>
                        <img
                            src="/images/PROJECTS/Cascader/Phase 3.svg"
                            alt="Mould technical documentation"
                            className={styles.techDrawImg}
                            loading="lazy" decoding="async"
                        />

                    </div>
                </motion.div>
            </section>

            {/* ═══════════════════════════════════════════════════════
          PAGE 9 — BUILD & OUTCOME  (light)
            ═══════════════════════════════════════════════════════ */}
            <section className={styles.outcome}>
                <motion.div
                    className={styles.sectionInner}
                    variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.08 }}
                >
                    <motion.div className={styles.sectionTag} variants={item} style={{ color: "var(--c-orange)" }}>OUTCOME</motion.div>

                    {/* 3-photo grid */}
                    <motion.div className={styles.outcomeGrid} variants={item}>
                        {[
                            { src: "/images/hero images/rotomoldin.png", cap: "Machine assembly" },
                            { src: "/images/PROJECTS/Cascader/Copy of MOULD (1).png", cap: "Mould detail" },
                            { src: "/images/PROJECTS/Cascader/jesmonite triala.png", cap: "Cast parts produced" },
                        ].map(ph => (
                            <div key={ph.cap} className={styles.outcomePhoto}>
                                <img src={ph.src} alt={ph.cap} className={styles.outcomeImg} loading="lazy" decoding="async" />
                                <span className={styles.outcomeCap}>{ph.cap}</span>
                            </div>
                        ))}
                    </motion.div>

                    <motion.p className={styles.outcomeLine} variants={item}>
                        The machine successfully produced hollow modular components through controlled two-axis rotation.
                    </motion.p>

                    <motion.div className={styles.reflection} variants={item}>
                        <div className={styles.reflectionAccent} />
                        <blockquote className={styles.reflectionText}>
                            CASCAder evolved into both a fabrication tool and a modular casting study.
                            The project demonstrates how manufacturing constraints, structural logic,
                            and geometry must be designed together — not in sequence, but simultaneously.
                        </blockquote>
                    </motion.div>

                    <motion.div className={styles.backNav} variants={item}>
                        <Link href="/"><a className={styles.backNavLink}><ArrowLeft size={16} /> Back to Archive</a></Link>
                    </motion.div>
                </motion.div>
            </section>

            <ProjectNav currentId={2} />
        </div>
    );
}
