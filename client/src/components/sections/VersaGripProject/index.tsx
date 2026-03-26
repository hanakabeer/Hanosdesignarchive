import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import type { Project } from "@shared/schema";
import { Navbar } from "@/components/sections/Navbar";
import { ProjectNav } from "@/components/sections/ProjectNav";
import styles from "./styles.module.css";

const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: (i = 0) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.82, ease: [0.16, 1, 0.3, 1], delay: i * 0.09 },
    }),
};

interface Props { project: Project; }

export function VersaGripProjectPage({ project }: Props) {
    return (
        <div className={styles.page}>
            <Navbar />

            {/* ═══════════════════════════════════════════════════════
          PAGE 1 — PURPOSE  (dark)
      ═══════════════════════════════════════════════════════ */}
            <section className={styles.purpose}>
                <div className={styles.purposeInner}>

                    {/* breadcrumb */}
                    <motion.div className={styles.breadcrumb} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                        <Link href="/"><a className={styles.backLink}><ArrowLeft size={13} /> Archive</a></Link>
                        <span className={styles.sep}>/</span>
                        <span className={styles.curr}>VersaGrip</span>
                    </motion.div>

                    {/* title block */}
                    <motion.div className={styles.titleBlock} variants={fadeUp} initial="hidden" animate="visible">
                        <h1 className={styles.heroTitle}>VersaGrip</h1>
                        <div className={styles.accentLine} />
                        <p className={styles.heroSub}>Adaptive Assistive Hand Training System</p>
                    </motion.div>

                    {/* full-width hero image */}
                    <motion.div
                        className={styles.heroImageWrap}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                    >
                        <img
                            src="/images/hero images/versagrip.png"
                            alt="VersaGrip device on a hand"
                            className={styles.heroImg}
                        />
                    </motion.div>

                    {/* bottom text */}
                    <motion.div className={styles.purposeText} variants={fadeUp} custom={3} initial="hidden" animate="visible">
                        <p className={styles.purposeBody}>
                            Multiple Sclerosis can reduce coordination, grip strength, and confidence in daily
                            hand actions. VersaGrip supports movement without replacing user effort — helping
                            users perform actions themselves while assisting the remaining motion.
                        </p>
                        <p className={styles.purposeTag}>Assistive training, not automation.</p>
                    </motion.div>

                    {/* specs row */}
                    <motion.div className={styles.metaRow} variants={fadeUp} custom={4} initial="hidden" animate="visible">
                        {[
                            { label: "Type", value: project.role },
                            { label: "Category", value: project.category },
                            { label: "Year", value: project.year },
                            { label: "Focus", value: "Motor Rehabilitation" },
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
          PAGE 2 — SYSTEM  (light)
      ═══════════════════════════════════════════════════════ */}
            <section className={styles.system}>
                <div className={styles.sectionInner}>
                    <motion.span className={styles.sectionTag} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        How It Works
                    </motion.span>

                    <div className={styles.systemGrid}>
                        {/* left 60% — flow diagram */}
                        <div className={styles.systemDiagramCol}>
                            <motion.div className={styles.flowDiagram} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                                {[
                                    { icon: "✋", label: "HAND" },
                                    { icon: "⟶", label: "" },
                                    { icon: "◎", label: "TRACKING" },
                                    { icon: "⟶", label: "" },
                                    { icon: "⚙", label: "PROCESSING" },
                                    { icon: "⟶", label: "" },
                                    { icon: "🤲", label: "ASSISTANCE" },
                                    { icon: "⟶", label: "" },
                                    { icon: "◈", label: "FEEDBACK" },
                                ].map((step, i) => (
                                    <div key={i} className={step.label ? styles.flowStep : styles.flowArrow}>
                                        {step.label ? (
                                            <>
                                                <div className={styles.flowIcon}>{step.icon}</div>
                                                <span className={styles.flowLabel}>{step.label}</span>
                                            </>
                                        ) : (
                                            <span className={styles.flowArrowIcon}>{step.icon}</span>
                                        )}
                                    </div>
                                ))}
                            </motion.div>

                            {/* model equation */}
                            <motion.div className={styles.equationBox} variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                                <span className={styles.eqPart}>User effort</span>
                                <span className={styles.eqOp}>+</span>
                                <span className={styles.eqPart}>Adaptive assistance</span>
                                <span className={styles.eqOp}>=</span>
                                <span className={styles.eqResult}>Full motion</span>
                            </motion.div>
                        </div>

                        {/* right 40% — text */}
                        <div className={styles.systemTextCol}>
                            <motion.h2 className={styles.lightHeading} variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                                The system observes hand motion, estimates intended grip, assists finger
                                movement, and provides feedback to guide correct actions.
                            </motion.h2>
                            <motion.ul className={styles.bulletList} variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                                <li>Detects hand pose in real-time</li>
                                <li>Supports individual finger movement</li>
                                <li>Reinforces correct motion with feedback</li>
                            </motion.ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════
          PAGE 3 — MECHANICAL  (dark)
      ═══════════════════════════════════════════════════════ */}
            <section className={styles.mechanical}>
                <div className={styles.sectionInner}>
                    <motion.span className={styles.sectionTag} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        Wearable Mechanism Development
                    </motion.span>

                    {/* horizontal timeline */}
                    <motion.div className={styles.timeline} variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        {[
                            { src: "/images/hero images/versagrip.png", cap: "Pneumatic — smooth but bulky" },
                            { src: "/images/hero images/versagrip.png", cap: "String push — simple but weak force" },
                            { src: "/images/hero images/versagrip.png", cap: "PLA bones — rigid control" },
                            { src: "/images/hero images/versagrip.png", cap: "String pull + TPU — responsive & comfortable" },
                        ].map((item, i) => (
                            <motion.div key={i} className={styles.timelineStep} variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                                <div className={styles.timelineNum}>{String(i + 1).padStart(2, "0")}</div>
                                <div className={styles.timelineImgWrap}>
                                    <img src={item.src} alt={item.cap} className={styles.timelineImg} />
                                </div>
                                <span className={styles.timelineCap}>{item.cap}</span>
                                {i < 3 && <div className={styles.timelineConnector} />}
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* key insight */}
                    <motion.p className={styles.boldInsight} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        A tendon-inspired string mechanism provided controlled assistance while allowing natural finger movement.
                    </motion.p>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════
          PAGE 4 — HAND TRACKING  (light)
      ═══════════════════════════════════════════════════════ */}
            <section className={styles.tracking}>
                <div className={styles.sectionInner}>
                    <motion.span className={styles.sectionTag} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        Motion Detection &amp; Control
                    </motion.span>

                    <div className={styles.trackingGrid}>
                        {/* images left */}
                        <div className={styles.trackingImages}>
                            {[
                                { src: "/images/hero images/versagrip.png", cap: "Landmark tracking overlay" },
                                { src: "/images/hero images/versagrip.png", cap: "3D hand skeleton model" },
                                { src: "/images/hero images/versagrip.png", cap: "Actuator mapping diagram" },
                            ].map((img, i) => (
                                <motion.div key={i} className={styles.trackingImgBox} variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                                    <img src={img.src} alt={img.cap} className={styles.trackingImg} />
                                    <span className={styles.cap}>{img.cap}</span>
                                </motion.div>
                            ))}
                        </div>

                        {/* text right */}
                        <div className={styles.trackingText}>
                            <motion.h2 className={styles.lightHeading} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                                Real-time hand tracking measures finger curl and orientation to calculate
                                how much assistance each finger needs.
                            </motion.h2>

                            <motion.div className={styles.calloutDots} variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                                {["Finger curl", "Object distance", "Grip posture"].map(dot => (
                                    <div key={dot} className={styles.dotRow}>
                                        <span className={styles.dot} />
                                        <span className={styles.dotLabel}>{dot}</span>
                                    </div>
                                ))}
                            </motion.div>

                            <motion.p className={styles.philosophyLine} variants={fadeUp} custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                                Assistance increases only when the user cannot complete the motion.
                            </motion.p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════
          PAGE 5 — TRAINING & FEEDBACK  (dark)
      ═══════════════════════════════════════════════════════ */}
            <section className={styles.training}>
                <div className={styles.sectionInner}>
                    <motion.span className={styles.sectionTag} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        Guided Training Interface
                    </motion.span>

                    {/* image grid */}
                    <motion.div className={styles.trainingImages} variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        {[
                            { src: "/images/hero images/versagrip.png", cap: "Feedback visuals" },
                            { src: "/images/hero images/versagrip.png", cap: "Interactive exercises" },
                            { src: "/images/hero images/versagrip.png", cap: "Creative interaction — art" },
                        ].map((img, i) => (
                            <motion.div key={i} className={styles.trainingImgBox} variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                                <img src={img.src} alt={img.cap} className={styles.trainingImg} />
                                <span className={styles.capLight}>{img.cap}</span>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.p className={styles.trainingBody} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        Visual and sound feedback encourage correct movement and transform
                        rehabilitation into engaging practice.
                    </motion.p>

                    {/* three labeled modes */}
                    <motion.div className={styles.modesRow} variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        {[
                            { mode: "Learning", desc: "Guided exercises with step-by-step instruction" },
                            { mode: "Practice", desc: "Daily hand tasks with adaptive resistance" },
                            { mode: "Play", desc: "Creative interaction — art, piano, guitar" },
                        ].map((m, i) => (
                            <div key={i} className={styles.modeCard}>
                                <span className={styles.modeNum}>{String(i + 1).padStart(2, "0")}</span>
                                <h3 className={styles.modeTitle}>{m.mode}</h3>
                                <p className={styles.modeDesc}>{m.desc}</p>
                            </div>
                        ))}
                    </motion.div>

                    <motion.p className={styles.boldInsightLight} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        The system motivates repetition by turning therapy into interaction.
                    </motion.p>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════
          PAGE 6 — OUTCOME & IMPACT  (light)
      ═══════════════════════════════════════════════════════ */}
            <section className={styles.outcome}>
                <div className={styles.sectionInner}>
                    <motion.span className={styles.sectionTag} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        Outcome
                    </motion.span>

                    {/* main result image */}
                    <motion.div className={styles.outcomeHero} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <img src="/images/hero images/versagrip.png" alt="VersaGrip wearable and UI in use" className={styles.outcomeImg} />
                        <span className={styles.cap}>Final wearable + UI working together</span>
                    </motion.div>

                    {/* results text */}
                    <motion.p className={styles.outcomeLine} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        VersaGrip helps users complete hand actions while training their muscles and
                        coordination over time, improving confidence in everyday interaction.
                    </motion.p>

                    <div className={styles.outcomeBottom}>
                        {/* reflection */}
                        <motion.div className={styles.reflection} variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                            <div className={styles.reflectionBar} />
                            <blockquote className={styles.reflectionText}>
                                Instead of replacing the user's ability, the system strengthens it. The
                                project explores assistive technology as collaboration between the body and
                                responsive systems.
                            </blockquote>
                        </motion.div>

                        {/* effort diagram */}
                        <motion.div className={styles.effortDiagram} variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                            <svg viewBox="0 0 180 140" className={styles.effortSvg}>
                                {/* axes */}
                                <line x1="20" y1="120" x2="170" y2="120" stroke="#C5B359" strokeWidth="1.5" />
                                <line x1="20" y1="20" x2="20" y2="120" stroke="#C5B359" strokeWidth="1.5" />
                                {/* user effort line — rising */}
                                <polyline points="20,110 60,90 100,70 140,50 170,30" fill="none" stroke="#C5B359" strokeWidth="2" strokeLinecap="round" />
                                {/* assistance line — falling */}
                                <polyline points="20,30 60,50 100,70 140,90 170,110" fill="none" stroke="rgba(197,179,89,0.4)" strokeWidth="2" strokeDasharray="5 3" strokeLinecap="round" />
                                {/* labels */}
                                <text x="25" y="16" fill="#C5B359" fontSize="8" fontWeight="700">User effort ↑</text>
                                <text x="110" y="118" fill="rgba(197,179,89,0.6)" fontSize="7">Assistance ↓ over time</text>
                                {/* x-axis label */}
                                <text x="80" y="135" fill="#bbb" fontSize="7" textAnchor="middle" letterSpacing="2">TIME</text>
                            </svg>
                        </motion.div>
                    </div>

                    {/* bottom line */}
                    <motion.p className={styles.applicabilityLine} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        Designed for MS — applicable to broader motor rehabilitation and dexterity learning.
                    </motion.p>

                    <motion.div className={styles.backNav} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <Link href="/"><a className={styles.backNavLink}><ArrowLeft size={15} /> Back to Archive</a></Link>
                    </motion.div>
                </div>
            </section>

            <ProjectNav currentId={3} />
        </div>
    );
}
