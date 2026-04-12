import { motion } from "framer-motion";
import type { Project } from "@shared/schema";
import { Navbar } from "@/components/sections/Navbar";
import { ProjectNav } from "@/components/sections/ProjectNav";
import { ProjectHero } from "@/components/sections/ProjectHero";
import { ProjectSideNav } from "@/components/sections/ProjectSideNav";
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
            <ProjectSideNav
                accentColor="#F05A28"
                sections={[
                    { id: "context", label: "Mechanism" },
                    { id: "materials", label: "Materials" },
                    { id: "iteration", label: "Iteration" },
                    { id: "polyhedral", label: "Casting" },
                    { id: "assemblies", label: "Assemblies" },
                    { id: "simulation", label: "Simulation" },
                    { id: "drawings", label: "Drawings" },
                    { id: "outcome", label: "Outcome" },
                ]}
            />
            {/* PAGE 1 — HERO (universal two-column component) */}
            <ProjectHero
                title="Cascader"
                breadcrumbLabel="Cascader"
                subtitle="Small-Scale Rotational Casting System"
                description="A compact fabrication tool developed to create hollow polyhedral structures exploring how rotation stability, structural rigidity, and material constraints influence casting quality."
                tags={["Fabrication System", "Rotational Molding"]}
                meta={[
                    { label: "Year", value: project.year },
                    { label: "Type", value: "Group Project" },
                    { label: "Process", value: "Rotational Casting" },
                    { label: "System", value: "Modular Fabrication" },
                    { label: "Duration", value: "10 weeks" },
                    { label: "Outcome", value: "Working Machine + Cast Parts" },
                ]}
                panel={{
                    heading: "Project Data",
                    items: [
                        { label: "Year", value: "2024" },
                        { label: "Type", value: "Fabrication Machine" },
                        { label: "Team", value: "Team of 4" },
                        { label: "Context", value: "Academic" },
                    ],
                }}
                imageSrc="/images/hero images/rotomoldin.png"
                imageAlt="Cascader rotational molding machine"
                accentColor="#F05A28"
            />

            {/* ═══════════════════════════════════════════════════════
          PAGE 2 — CONTEXT  (dark)
            ═══════════════════════════════════════════════════════ */}
            <section id="context" className={styles.mechanism} data-theme="dark">
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
            <section id="materials" className={styles.scrap} data-theme="light">
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
            <section id="iteration" className={styles.iteration} data-theme="dark">
                <motion.div
                    className={styles.sectionInner}
                    variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.05 }}
                >
                    <motion.div className={styles.sectionTag} variants={item}>ITERATIVE PROTOTYPING</motion.div>

                    {/* ── A — Base Evolution ── */}
                    <motion.div className={styles.iterSection} variants={item}>
                        <p className={styles.iterLabel}>A — Base Evolution</p>
                        <div className={`${styles.frameOptions} ${styles.frameOptions2}`}>
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
                                <p className={styles.frameOptionReason}>Low stability . lacks lateral support . unstable at 6–10 RPM</p>
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

                    {/* ── B — Frame Decision (was C) ── */}
                    <motion.div className={styles.iterSection} variants={item}>
                        <p className={styles.iterLabel}>B — Frame Decision</p>
                        <div className={styles.frameOptions}>
                            {/* Option 1 — Rejected */}
                            <div className={styles.frameOption}>
                                <div className={styles.frameOptionImgWrap}>
                                    <img
                                        src="/images/PROJECTS/Cascader/prototyping/White laminated mdf .png"
                                        alt="Laminated MDF frame"
                                        className={styles.frameOptionImg}
                                        loading="lazy" decoding="async"
                                    />
                                </div>
                                <span className={styles.frameOptionBadgeReject}>REJECTED</span>
                                <p className={styles.frameOptionName}>White Laminated MDF</p>
                                <p className={styles.frameOptionReason}>Clean surface finish · Accurate CNC fabrication · Requires 3D-printed bearing support</p>
                            </div>

                            {/* Option 2 — Rejected */}
                            <div className={styles.frameOption}>
                                <div className={styles.frameOptionImgWrap}>
                                    <img
                                        src="/images/PROJECTS/Cascader/prototyping/Plywood 1.png"
                                        alt="Jointed Plywood Frame"
                                        className={styles.frameOptionImg}
                                        loading="lazy" decoding="async"
                                    />
                                </div>
                                <span className={styles.frameOptionBadgeReject}>REJECTED</span>
                                <p className={styles.frameOptionName}>Jointed Plywood Frame</p>
                                <p className={styles.frameOptionReason}>Lightweight construction · Modular jointed build · CNC-cut with 3D-printed components . Time consuming</p>
                            </div>

                            {/* Option 3 — Selected */}
                            <div className={`${styles.frameOption} ${styles.frameOptionSelected}`}>
                                <div className={styles.frameOptionImgWrap}>
                                    <img
                                        src="/images/PROJECTS/Cascader/prototyping/Plywood 2.png"
                                        alt="Layered Plywood Frame"
                                        className={styles.frameOptionImg}
                                        loading="lazy" decoding="async"
                                    />
                                </div>
                                <span className={styles.frameOptionBadgeSelect}>SELECTED</span>
                                <p className={styles.frameOptionName}>Cut Plywood Frame</p>
                                <p className={styles.frameOptionReason}>Chosen for its stronger overall structure, more integrated assembly, and better physical stress performance, despite requiring 3D-printed bearing support.</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* ── C — Bracket Evolution (was B) ── */}
                    <motion.div className={styles.iterSection} variants={item}>
                        <p className={styles.iterLabel}>C — Bracket Evolution</p>
                        <div className={styles.frameOptions}>
                            {[
                                { n: 1, badge: "frameOptionBadgeReject" as const, status: "REJECTED", reason: "X-axis only . fails on Y and Z axes" },
                                { n: 4, badge: "frameOptionBadgeReject" as const, status: "GOOD", reason: "Stable - refined geometry . minor fit issues" },
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

                    {/* ── D — Mechanism Decision ── */}
                    <motion.div className={styles.iterSection} variants={item}>
                        <p className={styles.iterLabel}>D — Mechanism Decision</p>
                        <div className={styles.frameOptions}>
                            {/* Option 1 — Selected */}
                            <div className={`${styles.frameOption} ${styles.frameOptionSelected}`}>
                                <div className={styles.frameOptionImgWrap}>
                                    <img src="/images/PROJECTS/Cascader/prototyping/chain.png" alt="Chain mechanism" className={styles.frameOptionImg} />
                                </div>
                                <span className={styles.frameOptionBadgeSelect}>SELECTED</span>
                                <p className={styles.frameOptionName}>Chain Drive</p>
                                <p className={styles.frameOptionReason}>Chosen for high durability, precise movement, and consistency, despite higher cost and maintenance.</p>
                            </div>

                            {/* Option 2 — Rejected */}
                            <div className={styles.frameOption}>
                                <div className={styles.frameOptionImgWrap}>
                                    <img src="/images/PROJECTS/Cascader/prototyping/Elastic.png" alt="Elastic mechanism" className={styles.frameOptionImg} />
                                </div>
                                <span className={styles.frameOptionBadgeReject}>REJECTED</span>
                                <p className={styles.frameOptionName}>Elastic Drive</p>
                                <p className={styles.frameOptionReason}>Rejected due to low precision, proneness to stretching/slippage, and temperature sensitivity.</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.p className={styles.boldLine} variants={item}>
                        Each structural iteration aimed to eliminate a specific failure mode .
                    </motion.p>
                </motion.div>
            </section>

            {/* ═══════════════════════════════════════════════════════
          PAGE 5 — POLYHEDRAL CASTING SYSTEM  (light)
            ═══════════════════════════════════════════════════════ */}
            <section id="polyhedral" className={styles.polyhedral} data-theme="light">
                <motion.div
                    className={styles.sectionInner}
                    variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.08 }}
                >
                    <motion.div className={styles.sectionTag} variants={item} style={{ color: "var(--c-orange)" }}>MODULAR STRUCTURES</motion.div>
                    <motion.h2 className={styles.polyTitle} variants={item}>
                        Modular Polyhedral Exploration
                    </motion.h2>

                    <motion.div className={styles.processBoard} variants={item}>

                        {/* ── A — Polyhedral Geometry ── */}
                        <section className={styles.boardSection} aria-labelledby="polyhedral-geometry-title">
                            <div className={styles.boardHeader}>
                                <p className={styles.boardEyebrow}>A</p>
                                <h3 id="polyhedral-geometry-title" className={styles.boardTitle}>Polyhedral geometry</h3>
                                <p className={styles.boardDesc}>
                                    Annotated volumetric studies mapping face relationships, net development,
                                    and modular connection logic across polyhedral form families.
                                </p>
                            </div>

                            <div className={styles.geometryGrid}>
                                <figure className={styles.editorialFigure}>
                                    <img
                                        src="/images/PROJECTS/Cascader/polyhedra.png"
                                        alt="Annotated polyhedral geometry diagram"
                                        className={`${styles.editorialImage} ${styles.geometryImage}`}
                                        loading="lazy" decoding="async"
                                    />
                                </figure>

                                <figure className={styles.editorialFigure}>
                                    <img
                                        src="/images/PROJECTS/Cascader/hana.png"
                                        alt="Polyhedral construction and net development diagram"
                                        className={`${styles.editorialImage} ${styles.geometryImage}`}
                                        loading="lazy" decoding="async"
                                    />
                                </figure>
                            </div>
                        </section>

                        {/* ── B — Magnet Placement ── */}
                        <section className={styles.boardSection} aria-labelledby="magnet-placement-title">
                            <div className={styles.boardHeader}>
                                <p className={styles.boardEyebrow}>B</p>
                                <h3 id="magnet-placement-title" className={styles.boardTitle}>Magnet placement</h3>
                                <p className={styles.boardDesc}>
                                    Grasshopper-driven studies mapping magnet orientation, polarity logic, and
                                    face-to-face alignment across all polyhedra variants validated through physical prototypes.
                                </p>
                            </div>

                            {/* Two-column: left = 1 tall image, right = 2 stacked images */}
                            <div className={styles.magnetTwoCol}>
                                <figure className={styles.editorialFigure}>
                                    <img
                                        src="/images/PROJECTS/Cascader/_Magnet placement (1).png"
                                        alt="Physical magnet placement prototypes"
                                        className={`${styles.editorialImage} ${styles.magnetTallImage}`}
                                        loading="lazy" decoding="async"
                                    />
                                </figure>

                                <figure className={styles.editorialFigure}>
                                    <img
                                        src="/images/PROJECTS/Cascader/magnetplacementpolyhedra.png"
                                        alt="Grasshopper magnet placement study"
                                        className={`${styles.editorialImage} ${styles.magnetStackImage}`}
                                        loading="lazy" decoding="async"
                                    />
                                </figure>
                            </div>
                        </section>

                        {/* ── C — Casting / Mold Trials ── */}
                        <section className={styles.boardSection} aria-labelledby="casting-trials-title">
                            <div className={styles.boardHeader}>
                                <p className={styles.boardEyebrow}>C</p>
                                <h3 id="casting-trials-title" className={styles.boardTitle}>Casting / mold trials</h3>
                                <p className={styles.boardDesc}>
                                    Reusable silicone mold configured for repeat casting. Jesmonite selected for
                                    low shrinkage rotation speed calibrated to avoid pooling in complex polyhedral geometries.
                                </p>
                            </div>

                            <div className={styles.castingBoard}>
                                <figure className={`${styles.editorialFigure} ${styles.moldFigure}`}>
                                    <img
                                        src="/images/PROJECTS/Cascader/silicon_mould.png"
                                        alt="Silicone mold used for reusable casting trials"
                                        className={`${styles.editorialImage} ${styles.moldImage}`}
                                        loading="lazy" decoding="async"
                                    />
                                </figure>

                                <figure className={`${styles.editorialFigure} ${styles.trialFigure}`}>
                                    <img
                                        src="/images/PROJECTS/Cascader/jesmonite triala.png"
                                        alt="Jesmonite casting trial"
                                        className={`${styles.editorialImage} ${styles.trialImage}`}
                                        loading="lazy" decoding="async"
                                    />
                                </figure>
                            </div>
                        </section>
                    </motion.div>
                </motion.div>
            </section>

            {/* ═══════════════════════════════════════════════════════
          PAGE 6 — STACKED ASSEMBLIES  (dark)
            ═══════════════════════════════════════════════════════ */}
            <section id="assemblies" className={styles.stackedSection} data-theme="dark">
                <motion.div
                    className={styles.sectionInner}
                    variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.08 }}
                >
                    <motion.div className={styles.sectionTag} variants={item}>APPLICATION</motion.div>
                    <motion.h2 className={styles.darkHeading} variants={item}>
                        Stacked Modular Assemblies
                    </motion.h2>
                    <motion.p className={styles.darkBody} variants={item}>

                    </motion.p>

                    <motion.div className={styles.assembliesRow} variants={item}>
                        {/* Side Table */}
                        <div className={styles.assemblyCol}>
                            <div className={styles.assemblyDiagram}>
                                <img src="/images/PROJECTS/Cascader/2.png" alt="Side table diagram" className={styles.assemblyDiagramImg} />
                            </div>
                            <div className={styles.assemblyRender}>
                                <img src="/images/PROJECTS/Cascader/render1.png" alt="Side table render" className={styles.assemblyRenderImg} />
                            </div>
                        </div>

                        {/* Floor Lamp */}
                        <div className={styles.assemblyCol}>
                            <div className={styles.assemblyDiagram}>
                                <img src="/images/PROJECTS/Cascader/3.png" alt="Floor lamp diagram" className={styles.assemblyDiagramImg} />
                            </div>
                            <div className={styles.assemblyRender}>
                                <img src="/images/PROJECTS/Cascader/render2.png" alt="Floor lamp render" className={styles.assemblyRenderImg} />
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </section>



            {/* ═══════════════════════════════════════════════════════
          PAGE 7 — DIGITAL SIMULATION  (light)
            ═══════════════════════════════════════════════════════ */}
            <section id="simulation" className={styles.simulation} data-theme="light">
                <motion.div
                    className={`${styles.sectionInner} ${styles.simInner}`}
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
                        <p className={styles.simCaption}>Motorized two-axis rotation simulation </p>
                    </motion.div>
                </motion.div>
            </section>

            {/* ═══════════════════════════════════════════════════════
          PAGE 8 — TECHNICAL DOCUMENTATION  (dark)
            ═══════════════════════════════════════════════════════ */}
            <section id="drawings" className={styles.techDraw} data-theme="dark">
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

                    <motion.div className={styles.techDrawImgWrap} variants={item}>
                        <img
                            src="/images/PROJECTS/Cascader/Phase 3.svg"
                            alt="Mould technical documentation"
                            className={styles.techDrawImg}
                            loading="lazy"
                            decoding="async"
                        />
                    </motion.div>
                </motion.div>
            </section>

            {/* ═══════════════════════════════════════════════════════
          PAGE 9 — BUILD & OUTCOME  (light)
            ═══════════════════════════════════════════════════════ */}
            <section id="outcome" className={styles.outcome} data-theme="light">
                <motion.div
                    className={styles.sectionInner}
                    variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.08 }}
                >
                    <motion.div className={styles.sectionTag} variants={item} style={{ color: "var(--c-orange)" }}>OUTCOME</motion.div>



                    {/* Final Video */}
                    <motion.div className={styles.outcomeVideoWrap} variants={item}>
                        <video
                            className={styles.outcomeVideo}
                            src="/images/PROJECTS/Cascader/rotomolding.mov"
                            autoPlay
                            muted
                            loop
                            playsInline
                        />
                        <p className={styles.outcomeCap}>Final Machine Operation — 2-Axis Rotation</p>
                    </motion.div>

                    <motion.p className={styles.outcomeLine} variants={item}>
                       
                    </motion.p>

                    <motion.div className={styles.reflection} variants={item}>
                        <div className={styles.reflectionAccent} />
                        <blockquote className={styles.reflectionText}>
                            <span className={styles.reflectionHighlight}>
                                Cascader evolved into both a fabrication tool and a modular casting study, showing that geometry, structure, and manufacturing must be designed together.
                            </span>{" "}
                            Future iterations would improve stability, precision, and casting consistency, while motorizing the system for smoother operation.
                        </blockquote>
                    </motion.div>

                </motion.div>
            </section>

            <ProjectNav currentId={2} />
        </div>
    );
}
