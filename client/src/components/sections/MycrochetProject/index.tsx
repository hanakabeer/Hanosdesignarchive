import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import type { Project } from "@shared/schema";
import { Navbar } from "@/components/sections/Navbar";
import { ProjectNav } from "@/components/sections/ProjectNav";
import { ProjectHero } from "@/components/sections/ProjectHero";
import { ProjectSideNav } from "@/components/sections/ProjectSideNav";
import styles from "./styles.module.css";

const fadeUp = {
    hidden: { opacity: 0, y: 26 },
    visible: (i = 0) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: i * 0.09 },
    }),
};

const SYSTEM_IMGS = ["01", "02", "03", "04", "05"];
const FINAL_OUTCOME_IMGS = [
    "/images/PROJECTS/mycrochet/final pics/1.jpg",
    "/images/PROJECTS/mycrochet/final pics/1.png",
    "/images/PROJECTS/mycrochet/final pics/3.png",
    "/images/PROJECTS/mycrochet/final pics/5.png",
    "/images/PROJECTS/mycrochet/final pics/Untitled design (3).jpg",
    "/images/PROJECTS/mycrochet/final pics/Untitled design (45).png",
];

/** One scroll-driven image that lives stacked in the crossfade panel */
function FadeImg({ src, alt, index, progress }: {
    src: string; alt: string; index: number;
    progress: import("framer-motion").MotionValue<number>;
}) {
    const n = SYSTEM_IMGS.length;
    // each image owns 1/n of the scroll range, with a short overlap on either side
    const start = index / n;
    const end = (index + 1) / n;
    const fadeIn = start - 0.03;
    const fadeOut = end + 0.03;
    const opacity = useTransform(progress, [fadeIn, start, end, fadeOut], [0, 1, 1, 0]);
    return (
        <motion.div style={{ opacity }} className={styles.finalSystemImgFrame}>
            <img src={src} alt={alt} className={styles.finalSystemImg} loading="lazy" />
            <span className={styles.finalSystemImgIndex}>{String(index + 1).padStart(2, "0")}</span>
        </motion.div>
    );
}

/** Scroll-driven crossfade section — each image fades in then out as you scroll */
function FinalSystem() {
    const trackRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: trackRef,
        offset: ["start start", "end end"],
    });
    return (
        <section id="final-system" ref={trackRef} className={styles.finalSystem} data-theme="dark">
            {/* sticky panel — stays at viewport top while track scrolls */}
            <div className={styles.finalSystemPanel}>
                <div className={styles.finalSystemInner}>
                    {/* LEFT — sticky heading */}
                    <div className={styles.finalSystemSticky}>
                        <span className={styles.sectionTag}>Final System</span>
                        <h2 className={styles.finalSystemTitle}>The system,<br />as built.</h2>
                        <p className={styles.finalSystemSub}>Scroll to explore each component of the final Mycrochet machine.</p>
                    </div>
                    {/* RIGHT — stacked images crossfade */}
                    <div className={styles.finalSystemImgStack}>
                        {SYSTEM_IMGS.map((n, i) => (
                            <FadeImg
                                key={n}
                                src={`/images/PROJECTS/mycrochet/system/${n}.png`}
                                alt={`Final system — view ${n}`}
                                index={i}
                                progress={scrollYProgress}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

interface Props { project: Project; }

export function MycrochetProjectPage({ project }: Props) {
    return (
        <div className={styles.page}>
            <Navbar />
            <ProjectSideNav
                accentColor="#8FAF8E"
                sections={[
                    { id: "gap", label: "Gap" },
                    { id: "method", label: "Method" },
                    { id: "ideation", label: "Ideation" },
                    { id: "materials", label: "Materials" },
                    { id: "architecture", label: "Architecture" },
                    { id: "final-system", label: "System" },
                    { id: "final-outcome", label: "Final Outcome" },
                    { id: "drawings", label: "Drawings" },
                    { id: "simulation", label: "Simulation" },
                    { id: "applications", label: "Applications" },
                ]}
            />

            {/* PAGE 1 — HERO (universal two-column component) */}
            <ProjectHero
                title="Mycroche"
                breadcrumbLabel="Mycroche"
                subtitle="Bio-Fabricated Structural Material System"
                description="A fabrication method that combines crochet structures with mycelium growth to create lightweight, mold-free architectural forms."
                tags={["Biocomposite Fabrication", "Robotic Process"]}
                meta={[
                    { label: "Year", value: project.year },
                    { label: "Type", value: project.role },
                    { label: "Category", value: project.category },
                    { label: "Method", value: "Bio-Fabrication" },
                ]}
                panel={{
                    heading: "Project Data",
                    items: [
                        { label: "Year", value: "2025" },
                        { label: "Type", value: "Robotic Fabrication" },
                        { label: "Team", value: "Team of 3" },
                        { label: "Context", value: "Academic" },
                    ],
                }}
                imageSrc="/images/hero images/Mycrochet.png"
                imageAlt="Mycroche grown bio-fabricated structure"
                accentColor="#8FAF8E"
                theme="dark"
                darkBgColor="#202422"
                darkPanelBgColor="rgba(32, 36, 34, 0.96)"
                darkPanelBorderColor="rgba(143, 175, 142, 0.18)"
            />

            {/* ═══════════════════════════════════════════════════════
          PAGE 2 — WHY IT MATTERS  (light)
      ═══════════════════════════════════════════════════════ */}
            <section id="gap" className={styles.gap} data-theme="light">
                <div className={styles.sectionInner}>

                    <motion.span className={styles.sectionTag}
                        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        The Gap
                    </motion.span>
                    <h2 className={styles.sectionDisplayTitle}>
                        Where craft and bio-materials fall short on their own.
                    </h2>

                    <div className={styles.gapColumns}>
                        {/* Crochet */}
                        <motion.div className={styles.gapCard}
                            variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                            <div className={styles.gapCardHeader}>
                                <span className={styles.gapMaterial}>Crochet</span>
                                <span className={styles.gapDot} />
                            </div>
                            <ul className={styles.gapList}>
                                <li className={styles.gapPro}>flexible geometry</li>
                                <li className={styles.gapCon}>no structural rigidity</li>
                                <li className={styles.gapCon}>slow manual production</li>
                            </ul>
                            <div className={styles.gapImage}>
                                <img src="/images/PROJECTS/mycrochet/crochet.jpg" alt="Crochet structure" className={styles.gapImg} />
                            </div>
                        </motion.div>

                        {/* insight center */}
                        <motion.div className={styles.gapCenter}
                            variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                            <span className={styles.gapCenterLabel}>Synthesis</span>
                            <p className={styles.gapInsight}>
                                Craft has geometry<br />but no structure.<br /><br />
                                Bio-materials have structure<br />but no geometry.
                            </p>
                        </motion.div>

                        {/* Mycelium */}
                        <motion.div className={`${styles.gapCard} ${styles.myceliumCard}`}
                            variants={fadeUp} custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                            <div className={styles.gapCardHeader}>
                                <span className={styles.gapDot} />
                                <span className={styles.gapMaterial}>Mycelium</span>
                            </div>
                            <ul className={styles.gapList}>
                                <li className={styles.gapPro}>rigid material</li>
                                <li className={styles.gapCon}>requires molds</li>
                                <li className={styles.gapCon}>limited shapes</li>
                            </ul>
                            <div className={styles.gapImage}>
                                <img src="/images/PROJECTS/mycrochet/Mycelium.jpg" alt="Mycelium growth" className={styles.gapImg} />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════
          PAGE 3 — THE PRINCIPLE  (dark)
      ═══════════════════════════════════════════════════════ */}
            <section id="method" className={styles.principle} data-theme="dark">
                {/* section tag lives inside padded inner container */}
                <div className={styles.sectionInner}>
                    <motion.span className={styles.sectionTag}
                        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        The Mycroche Method
                    </motion.span>
                    <h2 className={styles.sectionDisplayTitleDark}>
                        The scaffold becomes the mold.
                    </h2>
                </div>

                {/* ── Full-bleed process image ── */}
                <div className={styles.processImgWrap}>
                    <img
                        src="/images/PROJECTS/mycrochet/2.png"
                        alt="Mycroche process — from scaffold to composite"
                        className={styles.processImg}
                    />
                </div>

                <div className={styles.sectionInner}>
                    <div className={styles.principleBottom}>
                        <motion.p className={styles.principleBody}
                            variants={fadeUp} custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                            The crocheted textile acts as a living framework. The mycelium grows through the
                            fibers, binding and solidifying the structure without any external mold.
                        </motion.p>
                        <motion.p className={styles.principleAha}
                            variants={fadeUp} custom={3} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                            The pattern defines the shape.<br />The organism defines the strength.
                        </motion.p>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════
          PAGE 4 — IDEATION (light)
      ═══════════════════════════════════════════════════════ */}
            <section id="ideation" className={styles.process} data-theme="light">
                <div className={styles.sectionInner}>

                    <motion.span className={styles.sectionTag}
                        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        Ideation
                    </motion.span>
                    <h2 className={styles.sectionDisplayTitle}>
                        Choosing how the material should enter the system.
                    </h2>

                    {/* Two direction cards */}
                    <div className={styles.ideationGrid}>
                        {/* Direction 1 */}
                        <motion.div
                            className={`${styles.ideationCard} ${styles.ideationCardMuted}`}
                            variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }}
                        >
                            <div className={styles.ideationCardTop}>
                                <span className={styles.ideationDir}>Direction 1 — Impregnation</span>
                                <h3 className={styles.ideationTitle}>Mycelium Impregnation Approach</h3>
                                <span className={styles.ideationStatusMuted}>Discontinued</span>
                            </div>
                            <div className={styles.ideationImgWrap}>
                                <img src="/images/PROJECTS/mycrochet/sketch1.png" alt="Impregnation diagram" className={styles.ideationImg} />
                            </div>
                            <p className={styles.ideationBody}>
                                Pre-formed yarn is passed through a mycelium paste bath and tension rollers,
                                allowing the material to absorb and coat the fibers before being shaped through
                                a crochet mechanism.
                            </p>
                        </motion.div>

                        {/* Direction 2 */}
                        <motion.div
                            className={`${styles.ideationCard} ${styles.ideationCardSelected}`}
                            variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}
                        >
                            <div className={styles.ideationCardTop}>
                                <span className={styles.ideationDir}>Direction 2 — Extrusion</span>
                                <span className={styles.ideationDecision}>Selected Direction</span>
                                <h3 className={styles.ideationTitle}>Mycelium Extrusion Approach</h3>
                            </div>
                            <div className={styles.ideationImgWrap}>
                                <img src="/images/PROJECTS/mycrochet/sketch2.png" alt="Extrusion diagram" className={styles.ideationImg} />
                            </div>
                            <p className={styles.ideationBody}>
                                Mycelium paste is directly extruded through a needle assembly to generate
                                continuous crocheted tubes, allowing the material to be formed and structured
                                simultaneously.
                            </p>
                        </motion.div>
                    </div>

                </div>
            </section>


            {/* ═══════════════════════════════════════════════════════
          PAGE 5 — MATERIAL EXPLORATION  (dark)
      ═══════════════════════════════════════════════════════ */}
            <section id="materials" className={styles.proto} data-theme="dark">
                <div className={styles.sectionInner}>

                    <motion.span className={styles.sectionTag}
                        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        Material Exploration
                    </motion.span>
                    <h2 className={styles.sectionDisplayTitleDark}>
                        Testing recipes, fibers, and curing behavior.
                    </h2>

                    {/* ── Experiment matrix ── */}
                    <motion.div
                        className={styles.matrixWrap}
                        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                    >
                        {/* Column header row */}
                        <div className={styles.matrixHeader}>
                            <div className={styles.matrixHeaderEmpty} />
                            <div className={styles.matrixJuteGroup}>
                                <span className={styles.matrixJuteLabel}>Polished Jute</span>
                                <div className={styles.matrixSubHeaders}>
                                    <span className={styles.matrixSubLabel}>Test 1</span>
                                    <span className={styles.matrixSubLabel}>Test 2</span>
                                </div>
                            </div>
                            <div className={styles.matrixJuteGroup}>
                                <span className={styles.matrixJuteLabel}>Rough Jute</span>
                                <div className={styles.matrixSubHeaders}>
                                    <span className={styles.matrixSubLabel}>Test 1</span>
                                    <span className={styles.matrixSubLabel}>Test 2</span>
                                </div>
                            </div>
                        </div>

                        {/* 3 recipe rows */}
                        {[
                            {
                                name: "Recipe 1",
                                ingredients: [
                                    { text: "Water", highlight: false },
                                    { text: "Psyllium Husk", highlight: false },
                                    { text: "Flour", highlight: false },
                                    { text: "Mycelium Spawns", highlight: false },
                                ],
                                cols: [
                                    { name: "1.1", selected: false },
                                    { name: "1.2", selected: true },
                                    { name: "1.3", selected: false },
                                    { name: "1.4", selected: false },
                                ],
                            },
                            {
                                name: "Recipe 2",
                                ingredients: [
                                    { text: "Water", highlight: false },
                                    { text: "Psyllium Husk", highlight: false },
                                    { text: "Flour", highlight: false },
                                    { text: "Mycelium Spawns", highlight: false },
                                    { text: "Sawdust", highlight: true },
                                ],
                                cols: [
                                    { name: "2.1", selected: false },
                                    { name: "2.2", selected: true },
                                    { name: "2.3", selected: false },
                                    { name: "2.4", selected: false },
                                ],
                            },
                            {
                                name: "Recipe 3",
                                ingredients: [
                                    { text: "Water", highlight: false },
                                    { text: "Psyllium Husk", highlight: false },
                                    { text: "Flour", highlight: false },
                                    { text: "2nd Gen Mycelium Spawns", highlight: true },
                                    { text: "Sawdust", highlight: false },
                                ],
                                cols: [
                                    { name: "3.1", selected: false },
                                    { name: "3.2", selected: false },
                                    { name: "3.3", selected: false },
                                    { name: "3.4", selected: false },
                                ],
                            },
                        ].map((recipe) => (
                            <div key={recipe.name} className={styles.matrixRow}>
                                {/* left: recipe + ingredients */}
                                <div className={styles.matrixRecipe}>
                                    <div className={styles.matrixAccent} />
                                    <div>
                                        <p className={styles.matrixRecipeName}>{recipe.name}</p>
                                        <ul className={styles.matrixIngredients}>
                                            {recipe.ingredients.map(ing => (
                                                <li
                                                    key={ing.text}
                                                    className={ing.highlight ? styles.matrixIngHighlight : styles.matrixIng}
                                                >
                                                    {ing.text}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                                {/* 4 circular specimen images */}
                                {recipe.cols.map((col) => (
                                    <div key={col.name} className={`${styles.matrixCell}${col.selected ? ` ${styles.matrixCellSelected}` : ''}`}>
                                        <div className={`${styles.matrixImgWrap}${col.selected ? ` ${styles.matrixImgWrapSelected}` : ''}`}>
                                            <img
                                                src={`/images/PROJECTS/mycrochet/material development/${col.name}.png`}
                                                alt={`Specimen ${col.name}`}
                                                className={styles.matrixImg}
                                                loading="lazy"
                                                decoding="async"
                                            />
                                        </div>
                                        {col.selected && <span className={styles.matrixSelectedBadge}>Successful</span>}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </motion.div>

                    {/* ── Bake Test section ── */}
                    <motion.div
                        className={styles.bakeSection}
                        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                    >
                        <span className={styles.bakeSectionTag}>Bake Test</span>
                        <p className={styles.bakeSectionSub}>The two selected specimens were tracked through drying and final heat cure.</p>

                        <div className={styles.bakeLayout}>

                            <div className={styles.bakeGridHeaderEmpty} />
                            <span className={styles.bakeGridColLabel}>Polished Recipe 2 / Test 2</span>
                            <span className={styles.bakeGridColLabel}>Polished Recipe 1 / Test 2</span>
                            <div />

                            <span className={styles.bakeGridRowLabel}>Day 1</span>
                            <div className={styles.bakeImgWrap}>
                                <img src="/images/PROJECTS/mycrochet/material development/BAKED/1.1.png" alt="Day 1 specimen 1" className={styles.bakeImg} loading="lazy" />
                            </div>
                            <div className={styles.bakeImgWrap}>
                                <img src="/images/PROJECTS/mycrochet/material development/BAKED/2.1.png" alt="Day 1 specimen 2" className={styles.bakeImg} loading="lazy" />
                            </div>
                            <div className={styles.bakeInfoDay}>
                                <span className={styles.bakeInfoDayLabel}>Day 1</span>
                                <p className={styles.bakeInfoDayText}>
                                    Moisture-rich and porous, with form present but structure still soft.
                                </p>
                            </div>

                            <span className={styles.bakeGridRowLabel}>Day 8</span>
                            <div className={styles.bakeImgWrap}>
                                <img src="/images/PROJECTS/mycrochet/material development/BAKED/1.2.png" alt="Day 8 specimen 1" className={styles.bakeImg} loading="lazy" />
                            </div>
                            <div className={styles.bakeImgWrap}>
                                <img src="/images/PROJECTS/mycrochet/material development/BAKED/2.2.png" alt="Day 8 specimen 2" className={styles.bakeImg} loading="lazy" />
                            </div>
                            <div className={styles.bakeInfoDay}>
                                <span className={styles.bakeInfoDayLabel}>Day 8</span>
                                <p className={styles.bakeInfoDayText}>
                                    Drying and visible growth increased rigidity, with early edge shrinkage appearing.
                                </p>
                            </div>

                            <span className={styles.bakeGridRowLabel}>Baked</span>
                            <div className={`${styles.bakeImgWrap} ${styles.bakeImgWrapFinal}`}>
                                <img src="/images/PROJECTS/mycrochet/material development/BAKED/1.3.png" alt="Baked specimen 1" className={styles.bakeImg} loading="lazy" />
                            </div>
                            <div className={`${styles.bakeImgWrap} ${styles.bakeImgWrapFinal}`}>
                                <img src="/images/PROJECTS/mycrochet/material development/BAKED/2.3.png" alt="Baked specimen 2" className={styles.bakeImg} loading="lazy" />
                            </div>
                            <div className={styles.bakeConditions}>
                                <div className={styles.bakeCondRow}>
                                    <span className={styles.bakeCondKey}>Time</span>
                                    <span className={styles.bakeCondVal}>3 Hours</span>
                                    <span className={styles.bakeCondVal}>30 Minutes</span>
                                </div>
                                <div className={styles.bakeCondRow}>
                                    <span className={styles.bakeCondKey}>Temperature</span>
                                    <span className={styles.bakeCondVal}>50°C</span>
                                    <span className={styles.bakeCondVal}>90°C</span>
                                </div>
                                <p className={styles.bakeCondNote}>Oven Open for the first 3 Hours</p>
                            </div>

                        </div>
                    </motion.div>

                    {/* ── Key Insights moved to end ── */}
                    <motion.div
                        className={styles.matrixInsights}
                        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                    >
                        <p className={styles.matrixInsightsLabel}>Key Findings</p>
                        <div className={styles.matrixInsightCols}>
                            {[
                                { finding: "Polished jute performed more consistently through curing, producing cleaner and more stable specimens." },
                                { finding: "Cross-sections of the baked structure showed successful integration, with the jute fibers visibly bound into the mycelium matrix rather than remaining separate layers." },
                                { finding: "The final composite achieved a valuable balance of low weight, rigidity, and inherent fire resistance." },
                            ].map((ins, i) => (
                                <div key={i} className={styles.matrixInsightItem}>
                                    <div className={styles.matrixInsightBar} />
                                    <p className={styles.matrixInsightText}>{ins.finding}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>


                </div>
            </section>


            {/* ═══════════════════════════════════════════════════════
          PAGE 6 — ITERATION DECISION MAP  (light)
      ═══════════════════════════════════════════════════════ */}
            <section id="architecture" className={styles.iterMap} data-theme="light">
                <div className={styles.sectionInner}>

                    <motion.span className={styles.sectionTag}
                        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        Iteration Decision Map
                    </motion.span>
                    <h2 className={styles.sectionDisplayTitle}>
                        How the architecture resolved over time.
                    </h2>
                    <motion.p
                        className={styles.iterIntro}
                        variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}
                    >
                        The architecture evolved through four clear moments: choose where motion lives, test that decision at scale,
                        compress the intermediate learnings, and resolve the final system architecture.
                    </motion.p>

                    {/* ── A: Concept split ─────────────────────────────── */}
                    <motion.div className={styles.iterBlock}
                        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <span className={styles.iterStepLabel}>1. Initial Fork</span>
                        
                        <div className={styles.iterConceptGrid}>

                            {/* V1 — Chosen */}
                            <div className={`${styles.iterConceptCard} ${styles.iterConceptChosen}`}>
                                <div className={styles.iterConceptCardHeader}>
                                    <span className={styles.iterVersionTag}>V1</span>
                                    <span className={styles.iterChosenBadge}>✓ Chosen</span>
                                </div>
                                <h3 className={styles.iterConceptCardTitle}>Needle holder stays fixed, outer body moves</h3>
                                <div className={styles.iterNodeRows}>
                                    <div className={styles.iterNodeRow}><span className={styles.iterNodeKey}>Hypothesis</span><span className={styles.iterNodeVal}>Stable needle alignment + simpler reference frame</span></div>
                                    <div className={styles.iterNodeRow}><span className={styles.iterNodeKey}>Why picked</span><span className={styles.iterNodeVal}>Mechanically clean, easier to drive</span></div>
                                </div>
                                <div className={styles.iterImgRow}>
                                    <img src="/images/PROJECTS/mycrochet/prototyping/Early prototype 1.JPG" alt="V1 early prototype" className={styles.iterConceptImg} />
                                </div>
                            </div>

                            {/* V2 — Rejected */}
                            <div className={`${styles.iterConceptCard} ${styles.iterConceptRejected}`}>
                                <div className={styles.iterConceptCardHeader}>
                                    <span className={styles.iterVersionTag}>V1.2</span>
                                    <span className={styles.iterRejectedBadge}>✕ Initially Rejected</span>
                                </div>
                                <h3 className={styles.iterConceptCardTitle}>Needle holder moves, body stays fixed</h3>
                                <div className={styles.iterNodeRows}>
                                    <div className={styles.iterNodeRow}><span className={styles.iterNodeKey}>Hypothesis</span><span className={styles.iterNodeVal}>Motion closer to needles = better control + less wasted volume</span></div>
                                    <div className={styles.iterNodeRow}><span className={styles.iterNodeKey}>Decision</span><span className={styles.iterNodeVal}>Increased mechanical complexity outweighed benefits at this stage</span></div>
                                </div>
                                <div className={styles.iterImgRow}>
                                    <img src="/images/PROJECTS/mycrochet/prototyping/Early prototype 2.JPG" alt="V2 early prototype" className={styles.iterConceptImg} />
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* ── B: Motorised scale-up hero ───────────────────── */}
                    <motion.div className={styles.iterBlock}
                        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <span className={styles.iterStepLabel}>2. Scale-Up Test</span>
                        <div className={styles.iterHeroWrap}>
                            <video
                                src="/images/PROJECTS/mycrochet/prototyping/Motor prototype.mov"
                                className={styles.iterHeroImg}
                                autoPlay
                                loop
                                muted
                                playsInline
                            />
                            <div className={styles.iterHeroOverlay}>
                                <span className={styles.iterHeroVersion}>V2 — Motorised</span>
                                <h3 className={styles.iterHeroTitle}>Motorised scale-up of the chosen architecture<br /><span className={styles.iterHeroSub}>Proof of mechanism, but not yet a viable system</span></h3>
                                <div className={styles.iterHeroTags}>
                                    <span className={styles.iterHeroTag}>Test: needle actuation + feeding</span>
                                    <span className={`${styles.iterHeroTag} ${styles.iterHeroTagIssue}`}>Issue 01: needle motion wasn't guided cleanly</span>
                                    <span className={`${styles.iterHeroTag} ${styles.iterHeroTagIssue}`}>Issue 02: poor space efficiency — bulky volume vs functional parts</span>
                                </div>
                                <p className={styles.iterHeroLearning}>↳ We learned the hard truth here.</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* ── C: Transition iterations ────────────────────── */}
                    <div className={styles.iterBlock}>
                        <span className={styles.iterStepLabel}>3. Transition Iterations</span>
                        <motion.div className={styles.iterTransitionStage}
                            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <div className={styles.iterTransitionHeader}>
                            <h3 className={styles.iterTransitionTitle}>Intermediate studies clarified what had to be removed.</h3>
                            <p className={styles.iterTransitionBody}>
                                These were supporting iterations, not final directions. Together they showed that packing more systems into the head
                                increased bulk, reduced access, and moved the architecture away from a cleaner working setup.
                            </p>
                        </div>

                        <div className={styles.iterTransitionGrid}>
                            <div className={styles.iterTransitionCard}>
                                <div className={styles.iterTransitionCardText}>
                                    <span className={styles.iterTransitionCardEyebrow}>01. CAD-only iteration</span>
                                </div>
                                <div className={styles.iterCadImgArea}>
                                    <img
                                        src="/images/PROJECTS/mycrochet/prototyping/rendered fuction system-prototype one.png"
                                        alt="Motorised CAD prototype render"
                                        className={styles.iterCadImg}
                                    />
                                </div>
                                <div className={styles.iterCadText}>
                                    <span className={styles.iterVersionTag}>V3.1 — Modeled</span>
                                    <h3 className={styles.iterCadTitle}>Integrated extruder + knitting<br /><span className={styles.iterCadSubLabel}>(modeled, not prototyped)</span></h3>
                                    <div className={styles.iterNodeRows}>
                                        <div className={styles.iterNodeRow}><span className={styles.iterNodeKey}>Why modeled</span><span className={styles.iterNodeVal}>Extrusion tests were still unstable.</span></div>
                                        <div className={styles.iterNodeRow}><span className={styles.iterNodeKey}>What failed</span><span className={styles.iterNodeVal}>Combined systems increased height and reduced serviceability.</span></div>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.iterTransitionCard}>
                                <div className={styles.iterTransitionCardText}>
                                    <span className={styles.iterTransitionCardEyebrow}>02. CAD-only iteration</span>
                                </div>
                                <div className={styles.iterCadImgArea}>
                                    <img
                                        src="/images/PROJECTS/mycrochet/prototyping/renderer-redesigned with direction 2.png"
                                        alt="CAD iteration using the revised knitting direction"
                                        className={styles.iterCadImg}
                                    />
                                </div>
                                <div className={styles.iterCadText}>
                                    <span className={styles.iterVersionTag}>V3.2 — Modeled</span>
                                    <h3 className={styles.iterCadTitle}>Knitting direction revision<br /><span className={styles.iterCadSubLabel}>(updated to match V1.2)</span></h3>
                                    <div className={styles.iterNodeRows}>
                                        <div className={styles.iterNodeRow}><span className={styles.iterNodeKey}>What changed</span><span className={styles.iterNodeVal}>The knitting direction was revised to follow the same logic explored in V1.2.</span></div>
                                        <div className={styles.iterNodeRow}><span className={styles.iterNodeKey}>What remained</span><span className={styles.iterNodeVal}>The system still carried too much complexity inside the head.</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.iterMicroStrip}>
                            <span className={styles.iterMicroTitle}>Needle holder + cam development</span>
                            <div className={styles.iterMicroGrid}>
                                {[
                                    { label: "Cam A", verdict: "slip", src: "/images/PROJECTS/mycrochet/prototyping/proto/cam1.png" },
                                    { label: "Cam B", verdict: "jam", src: "/images/PROJECTS/mycrochet/prototyping/proto/cam2.png" },
                                    { label: "Cam C", verdict: "smooth", src: "/images/PROJECTS/mycrochet/prototyping/proto/cam3.png" },
                                    { label: "Guide V1", verdict: "misalign", src: "/images/PROJECTS/mycrochet/prototyping/proto/needle1.png" },
                                    { label: "Guide V2", verdict: "stable", src: "/images/PROJECTS/mycrochet/prototyping/proto/needle2.png" },
                                    { label: "Guide V3", verdict: "smooth", src: "/images/PROJECTS/mycrochet/prototyping/proto/needle3.png" },
                                ].map(item => (
                                    <div key={item.label} className={styles.iterMicroCard}>
                                        <img src={item.src} alt={item.label} className={styles.iterMicroImg} />
                                        <span className={styles.iterMicroLabel}>{item.label}</span>
                                        <span className={`${styles.iterMicroVerdict} ${styles[`iterVerdict_${item.verdict}`]}`}>{item.verdict}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        </motion.div>
                    </div>

                    {/* ── D: Pivot box ─────────────────────────────────── */}
                    <div className={styles.iterBlock}>
                        <span className={styles.iterStepLabelHero}>4. Resolution</span>
                        <motion.div className={`${styles.iterPivotBox} ${styles.iterPivotBoxHero}`}
                            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <div className={styles.iterPivotTop}>
                            <div className={styles.iterPivotHeader}>
                                <div>
                                    <span className={styles.iterHeroVersion}>V4</span>
                                    <span className={styles.iterPivotEyebrow}>Final architecture — from test insight</span>
                                    <h3 className={styles.iterPivotTitle}>Extrusion after knitting</h3>
                                </div>
                            </div>
                        </div>

                        <div className={styles.iterPivotColumns}>
                            <div className={styles.iterPivotColumn}>
                                <div className={styles.iterArchFinal}>
                                    <img src="/images/PROJECTS/mycrochet/yarn from spool.png" alt="Yarn feeding from spool" className={styles.iterArchFinalImg} />
                                </div>
                            </div>

                            <div className={styles.iterPivotColumn}>
                                <div className={styles.iterArchDiagram}>
                                    <span className={styles.iterArchDiagramLabel}>Final System Diagram</span>
                                    <div className={styles.iterArchFlowVertical}>
                                        {[
                                            { label: "Spool Module", sub: "mounted separately" },
                                            { label: "Knitting Head", sub: "compact end-effector" },
                                            { label: "Extruder Module", sub: "mounted separately" },
                                        ].map((node, i, arr) => (
                                            <>
                                                <div key={node.label} className={styles.iterArchNode}>
                                                    <span className={styles.iterArchNodeLabel}>{node.label}</span>
                                                    <span className={styles.iterArchNodeSub}>{node.sub}</span>
                                                </div>
                                                {i < arr.length - 1 && (
                                                    <span key={`a-${i}`} className={styles.iterArchArrowVertical}>↓</span>
                                                )}
                                            </>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className={styles.iterPivotColumn}>
                                <div className={styles.iterPivotOutcomeText}>
                                    <span className={styles.iterPivotOutcomeLabel}>Knitting Outcome</span>
                                    <p className={styles.iterPivotOutcomeBody}>
                                        The revised configuration produced a cleaner and more stable knitted structure, with less interference during formation and a more reliable output that could be carried forward into the extrusion stage.
                                    </p>
                                </div>

                                <div className={`${styles.iterArchFinal} ${styles.iterArchFinalPrototype}`}>
                                    <img src="/images/PROJECTS/mycrochet/prototyping/Direrction 2 kniting worked out.png" alt="Final direction study" className={`${styles.iterArchFinalImg} ${styles.iterArchFinalImgPrototype}`} />
                                </div>
                            </div>

                            <div className={`${styles.iterPivotBenefitsWrap} ${styles.iterPivotBenefitsBand}`}>
                                <span className={styles.iterPivotBenefitsLabel}>Benefits</span>
                                <ul className={styles.iterPivotBenefits}>
                                    {[
                                        "Easier reloading",
                                        "Easier cleaning",
                                        "Smaller end-effector footprint",
                                        "Tuning extrusion no longer blocks knitting iteration",
                                    ].map(b => (
                                        <li key={b} className={styles.iterPivotBenefit}>
                                            <span className={styles.iterPivotBenefitBar} />
                                            <span className={styles.iterPivotBenefitText}>{b}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        </motion.div>
                    </div>

                </div>
            </section>




            {/* ═══════════════════════════════════════════════════════
          PAGE 7 — FINAL SYSTEM  (dark)
      ═══════════════════════════════════════════════════════ */}
            <FinalSystem />

            {/* ═══════════════════════════════════════════════════════
          PAGE 8 — FINAL OUTCOME  (light)
      ═══════════════════════════════════════════════════════ */}
            <section id="final-outcome" className={styles.finalOutcome} data-theme="light">
                <div className={styles.sectionInner}>
                    <motion.span className={styles.sectionTag}
                        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        Final Outcome
                    </motion.span>
                    <motion.h2 className={styles.sectionDisplayTitle}
                        variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        Fabricated outcomes from the resolved system.
                    </motion.h2>
                    <motion.div className={styles.finalOutcomeGrid}
                        variants={fadeUp} custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        {FINAL_OUTCOME_IMGS.map((src, i) => (
                            <div key={src} className={styles.finalOutcomeCard}>
                                <img
                                    src={src}
                                    alt={`Mycrochet final outcome ${i + 1}`}
                                    className={styles.finalOutcomeImg}
                                />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════
          PAGE 9 — TECHNICAL DRAWING  (dark)
      ═══════════════════════════════════════════════════════ */}
            <section id="drawings" className={styles.techDrawing} data-theme="dark">
                <div className={styles.sectionInner}>
                    <motion.span className={styles.sectionTag}
                        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        Technical Drawing
                    </motion.span>
                    <motion.h2 className={styles.techDrawingTitle}
                        variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        Machine blueprint
                    </motion.h2>
                    <motion.p className={styles.techDrawingSub}
                        variants={fadeUp} custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        Full assembly drawing — dimensions, part relationships, and motion paths.
                    </motion.p>
                </div>
                <motion.div className={styles.techDrawingFrame}
                    initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}>
                    <img
                        src="/images/PROJECTS/mycrochet/MycrochtMACHINE TEC (1).svg"
                        alt="Mycrochet machine technical drawing"
                        className={styles.techDrawingImg}
                    />
                </motion.div>
            </section>

            {/* ═══════════════════════════════════════════════════════
          PAGE 10 — SIMULATION  (dark)
      ═══════════════════════════════════════════════════════ */}
            <section id="simulation" className={styles.simulation} data-theme="dark">
                <div className={styles.sectionInner}>
                    <motion.span className={styles.sectionTag}
                        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        Simulation
                    </motion.span>
                    <motion.h2 className={styles.simTitle}
                        variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        Motion in simulation
                    </motion.h2>
                    <motion.p className={styles.simSub}
                        variants={fadeUp} custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        Two simulation passes — toolpath logic and a rendered preview of the final knitting sequence.
                    </motion.p>
                    <div className={styles.simGrid}>
                        {[
                            { src: "/images/PROJECTS/mycrochet/Simulation/Toolpath_simulation.mp4", label: "Toolpath Simulation" },
                            { src: "/images/PROJECTS/mycrochet/Simulation/Rendered_simulation.mp4", label: "Rendered Simulation" },
                        ].map(({ src, label }, i) => (
                            <motion.div key={label} className={styles.simCard}
                                variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                                <video
                                    className={styles.simVideo}
                                    src={src}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                />
                                <span className={styles.simLabel}>{label}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════
          PAGE 11 — APPLICATION & IMPACT  (dark)
      ═══════════════════════════════════════════════════════ */}
            <section id="applications" className={styles.applications} data-theme="dark">
                <div className={styles.sectionInner}>

                    <motion.span className={styles.sectionTag}
                        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        Applications
                    </motion.span>

                    <motion.h2
                        className={styles.sectionDisplayTitleDark}
                        variants={fadeUp}
                        custom={1}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        Cradle to cradle
                    </motion.h2>
                    <motion.p
                        className={styles.appCycleIntro}
                        variants={fadeUp}
                        custom={2}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        Mycroche can be framed as a regenerative loop: ingredients become grown structure,
                        structure becomes usable product, and the material can return back into the earth at end of life.
                    </motion.p>

                    <motion.div
                        className={styles.appDiagramWrap}
                        variants={fadeUp}
                        custom={3}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <img
                            src="/images/PROJECTS/mycrochet/APPLICATION.png"
                            alt="Mycrochet applications lifecycle diagram"
                            className={styles.appDiagram}
                        />
                    </motion.div>

                    {/* final reflection */}
                    <motion.div className={styles.reflection}
                        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <div className={styles.reflectionBar} />
                        <div>
                            <p className={styles.reflectionText}>
                                Mycroche explores a future where designers program materials to grow into shape,
                                reducing molds, waste, and heavy manufacturing processes.
                            </p>
                            <p className={styles.closingLine}>
                                Designing with living systems instead of inert materials.
                            </p>
                        </div>
                    </motion.div>

                </div>
            </section>

            <ProjectNav currentId={3} />
        </div >
    );
}
