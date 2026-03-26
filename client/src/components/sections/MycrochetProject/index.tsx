import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import type { Project } from "@shared/schema";
import { Navbar } from "@/components/sections/Navbar";
import { ProjectNav } from "@/components/sections/ProjectNav";
import styles from "./styles.module.css";

const fadeUp = {
    hidden: { opacity: 0, y: 26 },
    visible: (i = 0) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: i * 0.09 },
    }),
};

const SYSTEM_IMGS = ["01", "02", "03", "04", "05"];

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
        <section ref={trackRef} className={styles.finalSystem}>
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

            {/* ═══════════════════════════════════════════════════════
          PAGE 1 — THE IDEA  (dark)
      ═══════════════════════════════════════════════════════ */}
            <section className={styles.idea}>
                <div className={styles.ideaInner}>

                    {/* breadcrumb */}
                    <motion.div className={styles.breadcrumb}
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                        <Link href="/"><a className={styles.backLink}><ArrowLeft size={13} /> Archive</a></Link>
                        <span className={styles.sep}>/</span>
                        <span className={styles.curr}>Mycroche</span>
                    </motion.div>

                    {/* title block */}
                    <motion.div className={styles.titleBlock} variants={fadeUp} initial="hidden" animate="visible">
                        <h1 className={styles.heroTitle}>Mycroche</h1>
                        <div className={styles.accentLine} />
                        <p className={styles.heroSub}>Bio-Fabricated Structural Material System</p>
                    </motion.div>

                    {/* hero image — almost full bleed */}
                    <motion.div
                        className={styles.heroImageWrap}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
                    >
                        <img
                            src="/images/hero images/Mycrochet.png"
                            alt="Mycroche grown bio-fabricated structure"
                            className={styles.heroImg}
                        />
                    </motion.div>

                    {/* bottom text */}
                    <motion.div className={styles.ideaText} variants={fadeUp} custom={3} initial="hidden" animate="visible">
                        <p className={styles.ideaBody}>
                            A fabrication method that combines crochet structures with mycelium growth to create
                            lightweight, mold-free architectural forms.
                        </p>
                        <p className={styles.ideaTag}>Growing structures instead of manufacturing them.</p>
                    </motion.div>

                    {/* meta row */}
                    <motion.div className={styles.metaRow} variants={fadeUp} custom={4} initial="hidden" animate="visible">
                        {[
                            { label: "Type", value: project.role },
                            { label: "Category", value: project.category },
                            { label: "Year", value: project.year },
                            { label: "Method", value: "Bio-Fabrication" },
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
          PAGE 2 — WHY IT MATTERS  (light)
      ═══════════════════════════════════════════════════════ */}
            <section className={styles.gap}>
                <div className={styles.sectionInner}>

                    <motion.span className={styles.sectionTag}
                        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        The Gap
                    </motion.span>

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
                            <div className={styles.gapPlusIcon}>+</div>
                            <p className={styles.gapInsight}>
                                Craft has geometry<br />but no structure.<br /><br />
                                Bio-materials have structure<br />but no geometry.
                            </p>
                            <div className={styles.gapArrow}><ArrowRight size={18} /></div>
                        </motion.div>

                        {/* Mycelium */}
                        <motion.div className={styles.gapCard}
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
            <section className={styles.principle}>
                {/* section tag lives inside padded inner container */}
                <div className={styles.sectionInner}>
                    <motion.span className={styles.sectionTag}
                        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        The Mycroche Method
                    </motion.span>
                </div>

                {/* ── Full-bleed process image ── */}
                <div className={styles.processImgWrap}>
                    <img
                        src="/images/PROJECTS/mycrochet/2.png"
                        alt="Mycroche process — from scaffold to composite"
                        className={styles.processImg}
                    />
                </div>

                {/* ── 5-col grid: step cards aligned to image ── */}
                <div className={styles.sectionInner}>
                    <motion.div
                        className={styles.processDiagram}
                        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                    >
                        {[
                            { icon: "⟁", label: "Crochet Scaffold", sub: "textile framework" },
                            { icon: "◉", label: "Mycelium Paste", sub: "fill & inject" },
                            { icon: "⊛", label: "Growth", sub: "48–72 hour period" },
                            { icon: "◈", label: "Drying", sub: "heat cure & harden" },
                            { icon: "◆", label: "Structural Composite", sub: "final material" },
                        ].map((step, i, arr) => (
                            <>
                                <div key={step.label} className={styles.processCard}>
                                    <div className={styles.processCardIcon}>{step.icon}</div>
                                    <span className={styles.processCardLabel}>{step.label}</span>
                                    <span className={styles.processCardSub}>{step.sub}</span>
                                </div>
                                {i < arr.length - 1 && (
                                    <span className={styles.processCardArrow} key={`arr-${i}`}>
                                        <ArrowRight size={14} />
                                    </span>
                                )}
                            </>
                        ))}
                    </motion.div>

                    {/* principle bottom text */}
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
            <section className={styles.process}>
                <div className={styles.sectionInner}>

                    <motion.span className={styles.sectionTag}
                        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        Ideation
                    </motion.span>

                    {/* Two direction cards */}
                    <div className={styles.ideationGrid}>
                        {/* Direction 1 */}
                        <motion.div
                            className={styles.ideationCard}
                            variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }}
                        >
                            <div className={styles.ideationCardTop}>
                                <span className={styles.ideationDir}>Direction 1 — Impregnation</span>
                                <h3 className={styles.ideationTitle}>Mycelium Impregnation Approach</h3>
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
                            className={styles.ideationCard}
                            variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}
                        >
                            <div className={styles.ideationCardTop}>
                                <span className={styles.ideationDir}>Direction 2 — Extrusion</span>
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

                    {/* Key Takeaway */}
                    <motion.div
                        className={styles.ideationTakeaway}
                        variants={fadeUp} custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }}
                    >
                        <div className={styles.ideationTakeawayBar} />
                        <div>
                            <span className={styles.ideationTakeawayLabel}>Key Takeaway — Why Extrusion</span>
                            <p className={styles.ideationTakeawayText}>
                                While impregnation relied on existing yarn structures, extrusion allowed the material
                                itself to generate the structure, offering greater control over form, continuity,
                                and scalability.
                            </p>
                        </div>
                    </motion.div>

                </div>
            </section>


            {/* ═══════════════════════════════════════════════════════
          PAGE 5 — MATERIAL EXPLORATION  (dark)
      ═══════════════════════════════════════════════════════ */}
            <section className={styles.proto}>
                <div className={styles.sectionInner}>

                    <motion.span className={styles.sectionTag}
                        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        Material Exploration
                    </motion.span>

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
                                        {col.selected && <span className={styles.matrixSelectedBadge}> </span>}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </motion.div>

                    {/* ── Key Insights below ── */}
                    <motion.div
                        className={styles.matrixInsights}
                        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                    >
                        <p className={styles.matrixInsightsLabel}>Key Insights</p>
                        <div className={styles.matrixInsightCols}>
                            {[
                                { finding: "Sawdust addition (Recipe 2) produced the most cohesive mycelium binding — higher structural density across both jute types." },
                                { finding: "Rough jute held paste more effectively; polished jute caused slippage during early growth cycles." },
                                { finding: "2nd-gen mycelium spawns (Recipe 3) colonised faster but dried unevenly — surface cracking observed in Test 2." },
                            ].map((ins, i) => (
                                <div key={i} className={styles.matrixInsightItem}>
                                    <div className={styles.matrixInsightBar} />
                                    <p className={styles.matrixInsightText}>{ins.finding}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* ── Bake Test section ── */}
                    <motion.div
                        className={styles.bakeSection}
                        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                    >
                        <span className={styles.bakeSectionTag}>Bake Test</span>
                        <p className={styles.bakeSectionSub}>The two best-performing specimens were selected for a two-stage heat cure.</p>

                        {/* Unified grid: [row-label | img1 | img2 | info] — rows shared across both sides */}
                        <div className={styles.bakeLayout}>

                            {/* Header row: spacers for the three image columns, then empty info header */}
                            <div className={styles.bakeGridHeaderEmpty} />
                            <span className={styles.bakeGridColLabel}>POlished Recipe 2_Test 2</span>
                            <span className={styles.bakeGridColLabel}>Polished Recipe1_Test 2</span>
                            <div />

                            {/* Day 1 row */}
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
                                    Specimens remained moisture-rich and porous; form was present but not yet structurally consolidated
                                </p>
                            </div>

                            {/* Day 8 row */}
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
                                    By Day 8, visible mycelial coverage and drying shifted the material from soft/porous to more rigid and consolidated, with early signs of shrinkage at edges
                                </p>
                            </div>

                            {/* Baked row */}
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


                </div>
            </section>


            {/* ═══════════════════════════════════════════════════════
          PAGE 6 — ITERATION DECISION MAP  (light)
      ═══════════════════════════════════════════════════════ */}
            <section className={styles.iterMap}>
                <div className={styles.sectionInner}>

                    <motion.span className={styles.sectionTag}
                        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        Iteration Decision Map
                    </motion.span>

                    {/* ── A: Concept split ─────────────────────────────── */}
                    <motion.div className={styles.iterBlock}
                        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <h2 className={styles.iterBlockTitle}>Architecture Exploration: Where Does Motion Live?</h2>
                        <div className={styles.iterConceptGrid}>

                            {/* V1 — Chosen */}
                            <div className={`${styles.iterConceptCard} ${styles.iterConceptChosen}`}>
                                <div className={styles.iterConceptCardHeader}>
                                    <span className={styles.iterVersionTag}>V1</span>
                                    <span className={styles.iterChosenBadge}>✓ Chosen</span>
                                </div>
                                <h3 className={styles.iterConceptCardTitle}>Needle holder stays fixed,<br />outer body moves</h3>
                                <div className={styles.iterMotionDiagram}>
                                    <div className={styles.iterDiagramCore}>
                                        <span className={styles.iterDiagramLabel}>Needle core</span>
                                        <div className={styles.iterDiagramBox}>●</div>
                                    </div>
                                    <div className={styles.iterDiagramArrows}>
                                        <span className={styles.iterDiagramArrow}>↺</span>
                                        <span className={styles.iterDiagramMovingLabel}>outer housing rotates</span>
                                    </div>
                                </div>
                                <div className={styles.iterNodeRows}>
                                    <div className={styles.iterNodeRow}><span className={styles.iterNodeKey}>Hypothesis</span><span className={styles.iterNodeVal}>Stable needle alignment + simpler reference frame</span></div>
                                    <div className={styles.iterNodeRow}><span className={styles.iterNodeKey}>What you built</span><span className={styles.iterNodeVal}>First physical prototype</span></div>
                                    <div className={styles.iterNodeRow}><span className={styles.iterNodeKey}>Why picked</span><span className={styles.iterNodeVal}>Mechanically clean, easier to drive</span></div>
                                </div>
                                <div className={styles.iterImgRow}>
                                    <img src="/images/PROJECTS/mycrochet/prototyping/Early prototype 1.JPG" alt="V1 early prototype" className={styles.iterConceptImg} />
                                    <img src="/images/PROJECTS/mycrochet/prototyping/Early prototype 2.JPG" alt="V1 early prototype 2" className={styles.iterConceptImg} />
                                </div>
                            </div>

                            {/* V2 — Rejected */}
                            <div className={`${styles.iterConceptCard} ${styles.iterConceptRejected}`}>
                                <div className={styles.iterConceptCardHeader}>
                                    <span className={styles.iterVersionTag}>V2</span>
                                    <span className={styles.iterRejectedBadge}>✕ Rejected Early</span>
                                </div>
                                <h3 className={styles.iterConceptCardTitle}>Needle holder moves,<br />body stays fixed</h3>
                                <div className={styles.iterMotionDiagram}>
                                    <div className={styles.iterDiagramCore}>
                                        <span className={styles.iterDiagramLabel}>Fixed body</span>
                                        <div className={`${styles.iterDiagramBox} ${styles.iterDiagramBoxFixed}`}>◻</div>
                                    </div>
                                    <div className={styles.iterDiagramArrows}>
                                        <span className={`${styles.iterDiagramArrow} ${styles.iterDiagramArrowRej}`}>↕</span>
                                        <span className={styles.iterDiagramMovingLabel}>needle module moves</span>
                                    </div>
                                </div>
                                <div className={styles.iterNodeRows}>
                                    <div className={styles.iterNodeRow}><span className={styles.iterNodeKey}>Hypothesis</span><span className={styles.iterNodeVal}>Motion closer to needles = better control + less wasted volume</span></div>
                                    <div className={styles.iterNodeRow}><span className={styles.iterNodeKey}>Status</span><span className={styles.iterNodeVal}>Concept / early mock — no physical build</span></div>
                                    <div className={styles.iterNodeRow}><span className={styles.iterNodeKey}>Decision</span><span className={styles.iterNodeVal}>Increased mechanical complexity outweighed benefits at this stage</span></div>
                                </div>
                                <div className={styles.iterSchematic}>
                                    <div className={styles.iterSchematicBox}>
                                        <div className={styles.iterSchematicFixed}>BODY</div>
                                        <div className={styles.iterSchematicMover}>
                                            <span className={styles.iterSchematicArrow}>⬆</span>
                                            NEEDLE MODULE
                                            <span className={styles.iterSchematicArrow}>⬇</span>
                                        </div>
                                    </div>
                                    <span className={styles.iterSchematicNote}>concept schematic — not built</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* ── B: Motorised scale-up hero ───────────────────── */}
                    <motion.div className={styles.iterBlock}
                        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <div className={styles.iterHeroWrap}>
                            <img
                                src="/images/PROJECTS/mycrochet/prototyping/rendered fuction system-prototype one.png"
                                alt="Motorised scale-up prototype"
                                className={styles.iterHeroImg}
                            />
                            <div className={styles.iterHeroOverlay}>
                                <span className={styles.iterHeroVersion}>V1 — Motorised</span>
                                <h3 className={styles.iterHeroTitle}>Motorised scale-up of V1<br /><span className={styles.iterHeroSub}>Proof of mechanism</span></h3>
                                <div className={styles.iterHeroTags}>
                                    <span className={styles.iterHeroTag}>Test: needle actuation + feeding</span>
                                    <span className={`${styles.iterHeroTag} ${styles.iterHeroTagIssue}`}>Issue 01: needle motion wasn't guided cleanly</span>
                                    <span className={`${styles.iterHeroTag} ${styles.iterHeroTagIssue}`}>Issue 02: poor space efficiency — bulky volume vs functional parts</span>
                                </div>
                                <p className={styles.iterHeroLearning}>↳ We learned the hard truth here.</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* ── C: CAD-only integrated extruder ─────────────── */}
                    <motion.div className={styles.iterBlock}
                        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <div className={styles.iterCadWrap}>
                            <div className={styles.iterCadImgArea}>
                                <div className={styles.iterCadBadge}>CAD-only iteration</div>
                                <img
                                    src="/images/PROJECTS/mycrochet/prototyping/Direrction 2 kniting worked out.png"
                                    alt="Integrated extruder section view"
                                    className={styles.iterCadImg}
                                />
                            </div>
                            <div className={styles.iterCadText}>
                                <span className={styles.iterVersionTag}>V1.5 — Modeled</span>
                                <h3 className={styles.iterCadTitle}>Integrated extruder + knitting<br /><span className={styles.iterCadSubLabel}>(modeled, not prototyped yet)</span></h3>
                                <div className={styles.iterNodeRows}>
                                    <div className={styles.iterNodeRow}><span className={styles.iterNodeKey}>Reason for modeling only</span><span className={styles.iterNodeVal}>Extrusion tests still in progress, parameters unstable</span></div>
                                    <div className={styles.iterNodeRow}><span className={styles.iterNodeKey}>Risk identified</span><span className={styles.iterNodeVal}>Stacking extrusion + knitting increased overall height + made cleaning / reloading harder</span></div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* ── D: Form refinement ───────────────────────────── */}
                    <motion.div className={styles.iterBlock}
                        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <div className={styles.iterFormWrap}>
                            <img
                                src="/images/PROJECTS/mycrochet/prototyping/renderer-redesigned with direction 2.png"
                                alt="Rounded housing iteration"
                                className={styles.iterFormImg}
                            />
                            <div className={styles.iterFormText}>
                                <span className={styles.iterVersionTag}>V2 — Form</span>
                                <h3 className={styles.iterFormTitle}>Packaging iteration<br />(rounded housing)</h3>
                                <p className={styles.iterFormLearning}>
                                    Improved form clarity, but internal volume still inefficient + service access still poor.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* ── E: Pivot box ─────────────────────────────────── */}
                    <motion.div className={styles.iterPivotBox}
                        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <div className={styles.iterPivotHeader}>
                            <span className={styles.iterPivotIcon}>⟳</span>
                            <div>
                                <span className={styles.iterPivotEyebrow}>Key Pivot — from test insight</span>
                                <h3 className={styles.iterPivotTitle}>Extrusion AFTER knitting</h3>
                            </div>
                        </div>
                        <p className={styles.iterPivotBody}>
                            Extrusion tests showed better consistency when extrusion happened after knitting,
                            reducing upstream drag and allowing the knitting head to stay compact and stable.
                        </p>

                        <div className={styles.iterPivotBottom}>
                            {/* Final architecture diagram */}
                            <div className={styles.iterArchDiagram}>
                                <span className={styles.iterArchDiagramLabel}>Final Architecture</span>
                                <div className={styles.iterArchFlow}>
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
                                                <span key={`a-${i}`} className={styles.iterArchArrow}>→</span>
                                            )}
                                        </>
                                    ))}
                                </div>
                                <div className={styles.iterArchFinal}>
                                    <img src="/images/PROJECTS/mycrochet/prototyping/final design.png" alt="Final architecture" className={styles.iterArchFinalImg} />
                                </div>
                            </div>

                            {/* Benefits bullets */}
                            <ul className={styles.iterPivotBenefits}>
                                {[
                                    "Easier reloading",
                                    "Easier cleaning",
                                    "Smaller end-effector footprint",
                                    "Decouples tuning — extrusion tests don't block knitting iteration",
                                ].map(b => (
                                    <li key={b} className={styles.iterPivotBenefit}>
                                        <span className={styles.iterPivotBullet}>↳</span>
                                        {b}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>

                    {/* ── Micro-iterations strip ───────────────────────── */}
                    <motion.div className={styles.iterMicroStrip}
                        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <span className={styles.iterMicroTitle}>Needle Holder + Cam Development — intermediate iterations</span>
                        <div className={styles.iterMicroGrid}>
                            {[
                                { label: "Cam A", verdict: "slip", shape: "M10,30 Q30,5 50,30 Q70,55 90,30" },
                                { label: "Cam B", verdict: "jam", shape: "M10,25 L50,10 L90,25 L90,45 L50,60 L10,45 Z" },
                                { label: "Cam C", verdict: "smooth", shape: "M10,30 Q30,10 50,30 Q70,50 90,30 Q70,10 50,30 Q30,50 10,30" },
                                { label: "Guide V1", verdict: "misalign", shape: "M20,10 L80,10 L80,60 L20,60 Z" },
                                { label: "Guide V2", verdict: "stable", shape: "M20,10 L80,10 L80,25 L55,25 L55,60 L45,60 L45,25 L20,25 Z" },
                                { label: "Guide V3", verdict: "smooth", shape: "M15,10 Q50,5 85,10 L85,60 Q50,65 15,60 Z" },
                            ].map(item => (
                                <div key={item.label} className={styles.iterMicroCard}>
                                    <svg viewBox="0 0 100 70" className={styles.iterMicroSvg}>
                                        <path d={item.shape} fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                                    </svg>
                                    <span className={styles.iterMicroLabel}>{item.label}</span>
                                    <span className={`${styles.iterMicroVerdict} ${styles[`iterVerdict_${item.verdict}`]}`}>{item.verdict}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                </div>
            </section>




            {/* ═══════════════════════════════════════════════════════
          PAGE 7 — FINAL SYSTEM  (dark)
      ═══════════════════════════════════════════════════════ */}
            <FinalSystem />


            <section className={styles.simulation}>
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
          PAGE 8 — TECHNICAL DRAWING  (dark)
      ═══════════════════════════════════════════════════════ */}
            <section className={styles.techDrawing}>
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
          


            {/* ═══════════════════════════════════════════════════════
          PAGE 10 — APPLICATION & IMPACT  (light)
      ═══════════════════════════════════════════════════════ */}
            <section className={styles.applications}>
                <div className={styles.sectionInner}>

                    <motion.span className={styles.sectionTag}
                        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        Applications
                    </motion.span>

                    {/* three application tiles */}
                    <div className={styles.appGrid}>
                        {[
                            {
                                title: "Acoustic Panels",
                                desc: "The open mycelium structure absorbs sound. Shapes can be tuned through stitch density.",
                                src: "/images/hero images/Mycrochet.png",
                            },
                            {
                                title: "Filtration Panels",
                                desc: "Porous growth channels filter air and particulate. Bio-degradable after lifecycle.",
                                src: "/images/hero images/Mycrochet.png",
                            },
                            {
                                title: "Lightweight Structures",
                                desc: "Low-weight composite forms for temporary structures, packaging, and exhibition display.",
                                src: "/images/hero images/Mycrochet.png",
                            },
                        ].map((app, i) => (
                            <motion.div key={app.title} className={styles.appCard}
                                variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                                <div className={styles.appImgWrap}>
                                    <img src={app.src} alt={app.title} className={styles.appImg} />
                                </div>
                                <div className={styles.appText}>
                                    <h3 className={styles.appTitle}>{app.title}</h3>
                                    <p className={styles.appDesc}>{app.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

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

                    {/* back nav */}
                    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <Link href="/"><a className={styles.backNavLink}><ArrowLeft size={14} /> Back to Archive</a></Link>
                    </motion.div>
                </div>
            </section>

            <ProjectNav currentId={5} />
        </div >
    );
}
