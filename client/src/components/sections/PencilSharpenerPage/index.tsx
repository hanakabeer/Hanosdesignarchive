import { motion } from "framer-motion";
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
        transition: { duration: 0.82, ease: [0.16, 1, 0.3, 1], delay: i * 0.09 },
    }),
};

const IMG = "/images/PROJECTS/Pencil%20sharper";

interface Props { project: Project; }

export function PencilSharpenerPage({ project }: Props) {
    return (
        <div className={styles.page}>
            <Navbar />
            <ProjectSideNav
                accentColor="#00AEEF"
                sections={[
                    { id: "context", label: "Context" },
                    { id: "ergonomics", label: "Ergonomics" },
                    { id: "teardown", label: "Teardown" },
                    { id: "cad", label: "CAD" },
                    { id: "docs", label: "Docs" },
                    { id: "dfma", label: "DFMA" },
                ]}
            />

            {/* PAGE 1 — HERO (universal two-column component) */}
            <ProjectHero
                title="Pencil Sharpener"
                breadcrumbLabel="Pencil Sharpener"
                subtitle="Manual Helical Mechanism Study"
                description="A reverse-engineering study of a manual helical pencil sharpener, focused on understanding how a compact everyday object balances mechanism, usability, and manufacturability."
                tags={["Mechanical Object", "Desktop Tool"]}
                meta={[
                    { label: "Year", value: project.year },
                    { label: "Type", value: "Reverse Engineering" },
                    { label: "Method", value: "Teardown · CAD · DFMA" },
                    { label: "Tools", value: "SolidWorks · Physical Analysis" },
                ]}
                panel={{
                    heading: "Project Data",
                    items: [
                        { label: "Year", value: "2026" },
                        { label: "Type", value: "Mechanical Product" },
                        { label: "Team", value: "Solo" },
                        { label: "Context", value: "Academic" },
                    ],
                }}
                imageSrc="/images/PROJECTS/Pencil sharper/Render.png"
                imageAlt="Pencil sharpener render"
                accentColor="#00AEEF"
                theme="dark"
                darkBgColor="#06080c"
                darkPanelBgColor="rgba(10, 15, 24, 0.92)"
                darkPanelBorderColor="rgba(0, 174, 239, 0.18)"
            />

            {/* ═══════════════════════════════════════════════════════
              PAGE 2 — OBJECT + USE CONTEXT  (light)
          ═══════════════════════════════════════════════════════ */}
            <section id="context" className={styles.context} data-theme="light">
                <div className={styles.sectionInner}>
                    <motion.div className={styles.sectionHeader}
                        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <span className={styles.sectionNum}>02</span>
                        <span className={styles.sectionTag}>Object + Use Context</span>
                    </motion.div>

                    {/* text left / product image right */}
                    <div className={styles.contextGrid}>
                        <div className={styles.contextText}>
                            <motion.h2 className={styles.sectionHeading}
                                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                                Simple on the outside. Coordinated on the inside.
                            </motion.h2>
                            <motion.p className={styles.bodyText}
                                variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                                The sharpener is a hand-operated product designed for classrooms, studios, and home
                                environments. It uses an internal gear train, helical cutting blade, auto-feed system,
                                jam-release rocker, and detachable shavings bin inside an ABS and translucent plastic housing.
                            </motion.p>
                            <motion.p className={styles.bodyText}
                                variants={fadeUp} custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                                This made it a strong object to study because it appears simple externally but contains
                                a surprisingly coordinated internal mechanism.
                            </motion.p>
                        </div>

                        <motion.div className={styles.contextImgWrap}
                            variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                            <img src={`${IMG}/product%20picture.png`} alt="Pencil sharpener product" className={styles.contextImg} />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════
              PAGE 3 — USER EXPERIENCE + ERGONOMICS  (dark)
          ═══════════════════════════════════════════════════════ */}
            <section id="ergonomics" className={styles.ergonomics} data-theme="dark">
                <div className={styles.sectionInner}>
                    <motion.div className={styles.sectionHeader}
                        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <span className={styles.sectionNum}>03</span>
                        <span className={styles.sectionTagLight}>User Experience + Ergonomic Findings</span>
                    </motion.div>

                    <div className={styles.ergoGrid}>
                        <motion.div className={styles.ergoIntro}
                            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                            <h2 className={styles.sectionHeadingLight}>
                                Mapping the sharpening and cleaning journey.
                            </h2>
                            <p className={styles.bodyTextLight}>
                                I mapped the sharpening and cleaning journey through storyboard analysis and ergonomic study.
                                The product performs smoothly for standard graphite pencils, but requires more effort with flat,
                                unused, or non-cylindrical pencils.
                            </p>
                            <p className={styles.bodyTextLight}>
                                The analysis also showed issues around wrist strain, grip differences across hand sizes, and
                                limited clarity in some cues — especially around rotation direction, jam release, and blade
                                access for cleaning.
                            </p>
                        </motion.div>

                        <div className={styles.ergoFindings}>
                            <motion.div className={styles.findingsLabel}
                                variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                                Identified Issues
                            </motion.div>
                            <div className={styles.findingsList}>
                                {[
                                    { type: "friction", label: "Wrist strain during prolonged use", detail: "Grip fatigue after extended crank rotation" },
                                    { type: "friction", label: "Grip differences across hand sizes", detail: "Housing diameter not optimised for smaller hands" },
                                    { type: "unclear", label: "Rotation direction ambiguity", detail: "No clear visual cue about correct turn direction" },
                                    { type: "unclear", label: "Jam release — unclear affordance", detail: "Rocker mechanism not intuitive without instruction" },
                                    { type: "unclear", label: "Blade access for cleaning", detail: "Disassembly path not evident from exterior" },
                                ].map((f, i) => (
                                    <motion.div key={i} className={`${styles.findingRow} ${styles[f.type]}`}
                                        variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                                        <div className={styles.findingIndicator} />
                                        <div className={styles.findingContent}>
                                            <span className={styles.findingLabelLight}>{f.label}</span>
                                            <span className={styles.findingDetail}>{f.detail}</span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Flowchart image — full width below grid */}
                    <motion.div className={styles.ergoFlowWrap}
                        variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <img src={`${IMG}/Flowchart.png`} alt="User journey and ergonomic flowchart" className={styles.ergoFlowImg} />
                        <span className={styles.imgCaptionLight}>User journey + storyboard analysis</span>
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════
              PAGE 4 — TEARDOWN + MECHANICAL UNDERSTANDING  (light)
              flow steps LEFT, sectview.svg (mechanical diagram) RIGHT
              disassmebledparts.png full-width below, no bg
          ═══════════════════════════════════════════════════════ */}
            <section id="teardown" className={styles.teardown} data-theme="light">
                <div className={styles.sectionInner}>
                    <motion.div className={styles.sectionHeader}
                        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <span className={styles.sectionNum}>04</span>
                        <span className={styles.sectionTag}>Teardown + Mechanical Understanding</span>
                    </motion.div>

                    <motion.h2 className={styles.sectionHeading}
                        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        23 parts. One coordinated mechanism.
                    </motion.h2>
                    <motion.p className={styles.bodyText}
                        variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        I disassembled the product, identified and numbered 23 parts, and mapped how they work
                        together. The core mechanism converts crank rotation into coordinated cutting and feeding.
                    </motion.p>

                    {/* 2-col: steps LEFT + mechanical diagram RIGHT */}
                    <div className={styles.teardownSplitGrid}>
                        {/* left: numbered steps */}
                        <div className={styles.mechanismFlow}>
                            {[
                                { step: "0", title: "Rocker Spring Mechanism", desc: "Allows the release and removal of any stuck pencil or lead smoothly." },
                                { step: "1", title: "Hand Crank", desc: "Manual input used to rotate the sharpening mechanism." },
                                { step: "2", title: "Internal Gear Train", desc: "Provides an internal track for the helical cutter system." },
                                { step: "3", title: "Helical Cutter", desc: "Rotates inside the internal gear and cuts the pencil." },
                                { step: "4", title: "Primary Shaft + Feed Gear", desc: "Manual input of crank turns shaft, which turns the primary gear of the auto-feed system." },
                                { step: "5", title: "Secondary Feed Gear Rollers", desc: "Primary gear drives two secondary gears with rubber rollers to pull the pencil forward." },
                            ].map((step, i) => (
                                <motion.div key={step.step} className={styles.flowStep}
                                    variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                                    <div className={styles.flowLine} />
                                    <div className={styles.flowCard}>
                                        <span className={styles.flowNum}>{step.step}</span>
                                        <div className={styles.flowInfo}>
                                            <span className={styles.flowTitle}>{step.title}</span>
                                            <span className={styles.flowDesc}>{step.desc}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* right: mechanical diagram */}
                        <motion.div className={styles.mechDiagramCol}
                            variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                            <img src={`${IMG}/mechanical%20diagram.png`} alt="Mechanical diagram" className={styles.mechDiagramColImg} />

                        </motion.div>
                    </div>

                    {/* disassembled parts — full width */}
                    <motion.div className={styles.teardownImgBlock}
                        variants={fadeUp} custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <img src={`${IMG}/disassmebledparts.png`} alt="All 23 disassembled parts" className={styles.teardownImgFull} />
                        <span className={styles.imgCaption}>23 identified and numbered components</span>
                    </motion.div>

                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════
              PAGE 5 — CAD RECONSTRUCTION  (dark)
              moddeled parts + assembled (booklet) + Animation video
          ═══════════════════════════════════════════════════════ */}
            <section id="cad" className={styles.cad} data-theme="dark">
                <div className={styles.sectionInner}>
                    <motion.div className={styles.sectionHeader}
                        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <span className={styles.sectionNum}>05</span>
                        <span className={styles.sectionTagLight}>CAD Reconstruction</span>
                    </motion.div>

                    <motion.h2 className={styles.sectionHeadingLight}
                        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        From physical teardown to digital reconstruction.
                    </motion.h2>
                    <motion.p className={styles.bodyTextLight}
                        variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        I rebuilt each component digitally in SolidWorks, then assembled them with full mating constraints
                        to understand spatial relationships, part interfaces, and how the mechanism is packaged within the housing.
                    </motion.p>

                    {/* moddeled parts — full width (big, like disassembled) */}
                    <motion.div className={styles.cadFullBlock}
                        variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <img src={`${IMG}/moddeled%20parts.png`} alt="SolidWorks modelled parts" className={styles.cadFullImg} />
                        <span className={styles.imgCaptionLight}>SolidWorks — 23 modelled components</span>
                    </motion.div>

                    {/* assembled + animation in a 2-col pair below */}
                    <div className={styles.cadPair}>
                        <motion.div className={styles.cadPairItem}
                            variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                            <div className={styles.cadPairImgBox}>
                                <img src={`${IMG}/assembled.png`} alt="Assembled CAD model" className={styles.cadPairImg} />
                            </div>
                            <span className={styles.cadTripleLabel}>Assembled Model</span>
                            <span className={styles.imgCaptionLight}>Full assembly with mating constraints</span>
                        </motion.div>

                        <motion.div className={styles.cadPairItem}
                            variants={fadeUp} custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                            <div className={styles.cadPairImgBox}>
                                <video
                                    src={`${IMG}/Animation.MOV`}
                                    className={styles.cadPairVideo}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                />
                            </div>
                            <span className={styles.cadTripleLabel}>Animation</span>
                            <span className={styles.imgCaptionLight}>Motion study — mechanism in action</span>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════
              PAGE 6 — TECHNICAL DOCUMENTATION  (light)
              sectview / exp / ortho — displayed without card bg
          ═══════════════════════════════════════════════════════ */}
            <section id="docs" className={styles.techDoc} data-theme="light">
                <div className={styles.sectionInner}>
                    <motion.div className={styles.sectionHeader}
                        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <span className={styles.sectionNum}>06</span>
                        <span className={styles.sectionTag}>Technical Documentation</span>
                    </motion.div>

                    <motion.h2 className={styles.sectionHeading}
                        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        Engineering drawings + technical analysis.
                    </motion.h2>
                    <motion.p className={styles.bodyText}
                        variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        Exploded views, section cuts, and orthographic drawings produced to fully document the assembly
                        logic, part relationships, and dimensional accuracy of the reconstructed sharpener.
                    </motion.p>

                    {/* all three drawings stacked full-width, no bg */}
                    <motion.div className={styles.techDocStack}
                        variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <img src={`${IMG}/sectview.svg`} alt="Section view" className={styles.techDocSvgFull} />
                        <span className={styles.imgCaption}>Section view — internal assembly</span>
                    </motion.div>

                    <motion.div className={styles.techDocStack}
                        variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <img src={`${IMG}/exp.svg`} alt="Exploded view" className={styles.techDocSvgFull} />
                        <span className={styles.imgCaption}>Exploded view — assembly sequence</span>
                    </motion.div>

                    <motion.div className={styles.techDocStack}
                        variants={fadeUp} custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <img src={`${IMG}/ortho.svg`} alt="Orthographic drawing" className={styles.techDocSvgFull} />
                        <span className={styles.imgCaption}>Orthographic technical drawing</span>
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════
              PAGE 7 — DFMA + FMEA TABLE  (light)
          ═══════════════════════════════════════════════════════ */}
            <section id="dfma" className={styles.fmea} data-theme="light">
                <div className={styles.sectionInner}>
                    <motion.div className={styles.sectionHeader}
                        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <span className={styles.sectionNum}>07</span>
                        <span className={styles.sectionTagLight}>Design for Manufacturing</span>
                    </motion.div>

                    <motion.h2 className={styles.fmeaHeading}
                        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        Design for Manufacturing<br />and Failure Modes
                    </motion.h2>
                    <motion.p className={styles.fmeaSubtitle}
                        variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        Failure Modes and Effects Analysis
                    </motion.p>

                    {/* FMEA Table */}
                    <motion.div className={styles.fmeaTableWrap}
                        variants={fadeUp} custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <table className={styles.fmeaTable}>
                            <thead>
                                <tr>
                                    <th className={styles.fmTh}>Item / Function</th>
                                    <th className={styles.fmTh}>Failure Mode</th>
                                    <th className={styles.fmTh}>Effect</th>
                                    <th className={`${styles.fmTh} ${styles.fmThAccent}`}>S</th>
                                    <th className={styles.fmTh}>Cause</th>
                                    <th className={`${styles.fmTh} ${styles.fmThAccent}`}>O</th>
                                    <th className={styles.fmTh}>Controls</th>
                                    <th className={`${styles.fmTh} ${styles.fmThAccent}`}>D</th>
                                    <th className={`${styles.fmTh} ${styles.fmThRpn}`}>RPN</th>
                                    <th className={styles.fmTh}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    {
                                        item: "Primary/Secondary Gears", mode: "Tooth wear / stripping",
                                        effect: "Skipping, loss of drive", s: 8,
                                        cause: "Jam overload, repeated torque", o: 4,
                                        controls: "Manual feel + enclosed gear train", d: 6, rpn: 192,
                                        action: "Stronger gear polymer / overload protection",
                                    },
                                    {
                                        item: "Auto-feed Rollers", mode: "Slip / wear",
                                        effect: "Poor feeding, uneven sharpening", s: 6,
                                        cause: "Roller wear, dust buildup", o: 5,
                                        controls: "Dual rollers", d: 5, rpn: 150,
                                        action: "Improve roller texture + material hardness",
                                    },
                                    {
                                        item: "Helical Cutter Area", mode: "Debris jam",
                                        effect: "Pencil stalls, high resistance", s: 7,
                                        cause: "Wood/lead buildup", o: 5,
                                        controls: "Rocker jam-release button", d: 4, rpn: 140,
                                        action: "Add better debris escape path / cleaning access",
                                    },
                                    {
                                        item: "Helical Cutting Blade", mode: "Dulling / corrosion",
                                        effect: "Rough sharpening, more force", s: 7,
                                        cause: "Wear, moisture, poor cleaning", o: 4,
                                        controls: "Hardened steel blade", d: 5, rpn: 140,
                                        action: "Add anti-corrosion finish + cleaning guidance",
                                    },
                                    {
                                        item: "Alignment Caps / Pins", mode: "Misalignment / wobble",
                                        effect: "Uneven tip, friction/noise", s: 7,
                                        cause: "Tolerance stack-up, wear", o: 3,
                                        controls: "Alignment caps + guide pins", d: 6, rpn: 126,
                                        action: "Tighten critical alignment dimensions only",
                                    },
                                    {
                                        item: "Rocker Button + Spring", mode: "Sticking / weak return",
                                        effect: "Jam release fails", s: 5,
                                        cause: "Dust ingress, spring fatigue", o: 4,
                                        controls: "Button + compression spring", d: 4, rpn: 80,
                                        action: "Improve guide clearance + spring life spec",
                                    },
                                    {
                                        item: "Housing / Screw Bosses", mode: "Cracking / looseness",
                                        effect: "Rattle, misalignment", s: 6,
                                        cause: "Over-tightening, impact", o: 3,
                                        controls: "Screw-fastened housing", d: 5, rpn: 90,
                                        action: "Add boss fillets/ribs + screw torque spec",
                                    },
                                    {
                                        item: "Shavings Bin", mode: "Loose fit / spill",
                                        effect: "Debris leakage, messy use", s: 4,
                                        cause: "Snap wear, mis-seating", o: 6,
                                        controls: "Removable bin", d: 2, rpn: 48,
                                        action: "Add stronger latch and seating feedback",
                                    },
                                ].map((row, i) => (
                                    <tr key={i} className={styles.fmRow}>
                                        <td className={`${styles.fmTd} ${styles.fmTdItem}`} data-label="Item / Function">{row.item}</td>
                                        <td className={styles.fmTd} data-label="Failure Mode">{row.mode}</td>
                                        <td className={styles.fmTd} data-label="Effect">{row.effect}</td>
                                        <td className={`${styles.fmTd} ${styles.fmTdAccent}`} data-label="S">{row.s}</td>
                                        <td className={styles.fmTd} data-label="Cause">{row.cause}</td>
                                        <td className={`${styles.fmTd} ${styles.fmTdAccent}`} data-label="O">{row.o}</td>
                                        <td className={styles.fmTd} data-label="Controls">{row.controls}</td>
                                        <td className={`${styles.fmTd} ${styles.fmTdAccent}`} data-label="D">{row.d}</td>
                                        <td className={`${styles.fmTd} ${styles.fmTdRpn}`} data-label="RPN">{row.rpn}</td>
                                        <td className={styles.fmTd} data-label="Action">{row.action}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </motion.div>

                </div>
            </section>

            <ProjectNav currentId={5} />
        </div>
    );
}
