import { motion } from "framer-motion";
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
        transition: { duration: 0.82, ease: [0.16, 1, 0.3, 1], delay: i * 0.09 },
    }),
};

interface Props { project: Project; }

export function PortaPalmPage({ project }: Props) {
    return (
        <div className={styles.page}>
            <Navbar />

            {/* ═══════════════════════════════════════════════════════
          PAGE 1 — HERO / CONCEPT  (dark)
      ═══════════════════════════════════════════════════════ */}
            <section className={styles.hero}>
                <div className={styles.heroInner}>

                    {/* breadcrumb */}
                    <motion.div className={styles.breadcrumb}
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                        <Link href="/"><a className={styles.backLink}><ArrowLeft size={13} /> Archive</a></Link>
                        <span className={styles.sep}>/</span>
                        <span className={styles.curr}>PortaPalm</span>
                    </motion.div>

                    {/* title */}
                    <motion.div className={styles.titleBlock} variants={fadeUp} initial="hidden" animate="visible">
                        <h1 className={styles.heroTitle}>PortaPalm</h1>
                        <div className={styles.accentLine} />
                        <p className={styles.heroSub}>Gesture-Controlled Tactile Telepresence Prototype</p>
                    </motion.div>

                    {/* hero + render panel */}
                    <motion.div
                        className={styles.heroMedia}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                    >
                        <div className={styles.heroMainImg}>
                            <img
                                src="/images/Playground/industrial/Portapalm.jpg"
                                alt="PortaPalm robotic arm in action"
                                className={styles.heroImg}
                            />
                            {/* scanline atmosphere overlay */}
                            <div className={styles.heroScanlines} />
                        </div>
                        <div className={styles.heroSidePanel}>
                            <img
                                src="/images/Playground/industrial/Portapalm.jpg"
                                alt="PortaPalm concept render"
                                className={styles.heroSideImg}
                            />
                            <div className={styles.heroBadges}>
                                {["Solo", "3D", "Prototype", "Code"].map(b => (
                                    <span key={b} className={styles.badge}>{b}</span>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* hook text */}
                    <motion.div className={styles.heroText} variants={fadeUp} custom={3} initial="hidden" animate="visible">
                        <p className={styles.heroHook}>
                            A gesture-controlled robotic arm prototype exploring how remote hands could
                            intervene in hazardous environments through natural hand motion.
                        </p>
                    </motion.div>

                    {/* meta */}
                    <motion.div className={styles.metaRow} variants={fadeUp} custom={4} initial="hidden" animate="visible">
                        {[
                            { label: "Role", value: "Solo Project" },
                            { label: "Stack", value: "Python · MediaPipe · Arduino" },
                            { label: "Output", value: "Working Prototype" },
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
          PAGE 2 — CONTEXT  (light)
      ═══════════════════════════════════════════════════════ */}
            <section className={styles.context}>
                <div className={styles.sectionInner}>

                    <motion.span className={styles.sectionTag} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        Why Telepresence Needs Hands
                    </motion.span>

                    <div className={styles.contextGrid}>
                        {/* left — context tiles */}
                        <div className={styles.contextImages}>
                            {[
                                { src: "/images/Playground/industrial/Portapalm.jpg", cap: "Hazardous environment — remote intervention need" },
                                { src: "/images/Playground/industrial/Portapalm.jpg", cap: "Storyboard — gesture intent to robotic response" },
                                { src: "/images/Playground/industrial/Portapalm.jpg", cap: "Concept scene — tactile telepresence in context" },
                            ].map((img, i) => (
                                <motion.div key={i} className={styles.contextImgBox}
                                    variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                                    <img src={img.src} alt={img.cap} className={styles.contextImg} />
                                    <span className={styles.cap}>{img.cap}</span>
                                </motion.div>
                            ))}
                        </div>

                        {/* right — text */}
                        <div className={styles.contextText}>
                            <motion.h2 className={styles.darkHeading} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                                In dangerous environments, distance protects humans — but distance also removes tactile control.
                            </motion.h2>
                            <motion.p className={styles.darkBody} variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                                PortaPalm explores how hand gestures can become a simple, intuitive interface
                                for remote manipulation — without specialized controllers or training.
                            </motion.p>
                            <motion.p className={styles.designQuestion} variants={fadeUp} custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                                How can we translate human hand intent into safe, real-time robotic action?
                            </motion.p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════
          PAGE 3 — SYSTEM ARCHITECTURE  (dark)
      ═══════════════════════════════════════════════════════ */}
            <section className={styles.architecture}>
                <div className={styles.sectionInner}>

                    <motion.span className={styles.sectionTag} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        System Architecture
                    </motion.span>

                    {/* pipeline diagram */}
                    <motion.div className={styles.pipeline} variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        {[
                            { label: "Hand Tracking", sub: "Python + MediaPipe" },
                            null,
                            { label: "Signal Mapping", sub: "Pyduino bridge" },
                            null,
                            { label: "Servo Actuation", sub: "Serial communication" },
                            null,
                            { label: "Robotic Motion", sub: "Movement recreation" },
                        ].map((step, i) =>
                            step === null ? (
                                <span key={i} className={styles.pipeArrow}><ArrowRight size={18} /></span>
                            ) : (
                                <div key={i} className={styles.pipeStep}>
                                    <div className={styles.pipeStepInner}>
                                        <span className={styles.pipeLabel}>{step.label}</span>
                                        <span className={styles.pipeSub}>{step.sub}</span>
                                    </div>
                                </div>
                            )
                        )}
                    </motion.div>

                    {/* three steps */}
                    <div className={styles.stepsRow}>
                        {[
                            {
                                num: "STEP 1",
                                title: "Hand Tracking",
                                body: "Python + MediaPipe reads 21 hand landmarks in real-time. Finger curl values are extracted per joint.",
                                callouts: ["21 landmark points", "Finger bend values", "Frame-rate capture"],
                            },
                            {
                                num: "STEP 2",
                                title: "Pyduino Bridge",
                                body: "A custom Pyduino system handles serial communication between Python and the Arduino controller.",
                                callouts: ["Smoothing logic", "Mapping algorithm", "Serial protocol"],
                            },
                            {
                                num: "STEP 3",
                                title: "Servo Actuation",
                                body: "Finger curl values are translated into servo motor angles — recreating the gesture on the physical arm.",
                                callouts: ["Motor angles 0–180°", "5-finger mapping", "Actuation delay"],
                            },
                        ].map((step, i) => (
                            <motion.div key={step.num} className={styles.stepCard}
                                variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                                <span className={styles.stepNum}>{step.num}</span>
                                <h3 className={styles.stepTitle}>{step.title}</h3>
                                <p className={styles.stepBody}>{step.body}</p>
                                <div className={styles.calloutList}>
                                    {step.callouts.map(c => (
                                        <div key={c} className={styles.calloutRow}>
                                            <span className={styles.calloutDot} />
                                            <span className={styles.calloutText}>{c}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════
          PAGE 4 — BUILD / PROTOTYPE  (light)
      ═══════════════════════════════════════════════════════ */}
            <section className={styles.build}>
                <div className={styles.sectionInner}>

                    <motion.span className={styles.sectionTag} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        Prototype Build
                    </motion.span>

                    {/* photo grid */}
                    <div className={styles.buildGrid}>
                        <motion.div className={styles.buildMain}
                            variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                            <img src="/images/Playground/industrial/Portapalm.jpg" alt="PortaPalm physical arm prototype" className={styles.buildImg} />
                        </motion.div>
                        <div className={styles.buildSmallCol}>
                            {[
                                "Finger segments — printed PLA links",
                                "Servo mounting — precision bracket",
                            ].map((cap, i) => (
                                <motion.div key={i} className={styles.buildSmall}
                                    variants={fadeUp} custom={i + 1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                                    <img src="/images/Playground/industrial/Portapalm.jpg" alt={cap} className={styles.buildImg} />
                                    <span className={styles.cap}>{cap}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* caption */}
                    <motion.p className={styles.buildCaption}
                        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        A physical actuator system translates computed finger curl values into servo
                        angles to reproduce gesture motion.
                    </motion.p>

                    {/* BOM-lite */}
                    <motion.div className={styles.bom}
                        variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <span className={styles.bomLabel}>Components</span>
                        <div className={styles.bomItems}>
                            {["Servos", "Arduino", "Printed links", "Fasteners", "Power supply"].map(item => (
                                <span key={item} className={styles.bomTag}>{item}</span>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════
          PAGE 5 — DEMO / INTERACTION  (dark)
      ═══════════════════════════════════════════════════════ */}
            <section className={styles.demo}>
                <div className={styles.sectionInner}>

                    <motion.span className={styles.sectionTag} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        Real-Time Control Demo
                    </motion.span>

                    <div className={styles.demoGrid}>
                        {/* left — sequential frames */}
                        <div className={styles.demoFrames}>
                            {[
                                { step: "01", cap: "Open hand detected — resting state" },
                                { step: "02", cap: "Finger curl input — grip gesture" },
                                { step: "03", cap: "Servo response — arm closes" },
                            ].map((frame, i) => (
                                <motion.div key={i} className={styles.demoFrame}
                                    variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                                    <div className={styles.demoFrameImgWrap}>
                                        <img src="/images/Playground/industrial/Portapalm.jpg" alt={frame.cap} className={styles.demoFrameImg} />
                                        <span className={styles.demoStep}>{frame.step}</span>
                                    </div>
                                    <span className={styles.demoFrameCap}>{frame.cap}</span>
                                </motion.div>
                            ))}
                        </div>

                        {/* right — behavior notes */}
                        <div className={styles.demoNotes}>
                            <motion.h3 className={styles.demoNotesTitle} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                                Behavior
                            </motion.h3>

                            <div className={styles.notesList}>
                                {[
                                    { icon: "✓", label: "Real-time gesture mirroring", type: "good" },
                                    { icon: "✓", label: "Stable finger articulation", type: "good" },
                                    { icon: "△", label: "Speed — limited by serial latency", type: "limit" },
                                    { icon: "△", label: "Precision — calibration drift", type: "limit" },
                                    { icon: "△", label: "Force feedback — not yet modeled", type: "limit" },
                                ].map((note, i) => (
                                    <motion.div key={i} className={`${styles.noteRow} ${styles[note.type]}`}
                                        variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                                        <span className={styles.noteIcon}>{note.icon}</span>
                                        <span className={styles.noteLabel}>{note.label}</span>
                                    </motion.div>
                                ))}
                            </div>

                            <motion.p className={styles.honestyLine} variants={fadeUp} custom={5} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                                This first prototype prioritizes end-to-end interaction proof over final robustness.
                            </motion.p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════
          PAGE 6 — OUTCOME  (light)
      ═══════════════════════════════════════════════════════ */}
            <section className={styles.outcome}>
                <div className={styles.sectionInner}>

                    <motion.span className={styles.sectionTag} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        Outcome
                    </motion.span>

                    {/* exhibition image */}
                    <motion.div className={styles.outcomeHero} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <img src="/images/Playground/industrial/Portapalm.jpg" alt="PortaPalm at exhibition" className={styles.outcomeImg} />
                        <span className={styles.cap}>PortaPalm exhibited — early exploration of human–robot interaction</span>
                    </motion.div>

                    {/* outcome text */}
                    <motion.p className={styles.outcomeLine} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        PortaPalm was exhibited as an early exploration of human–robot interaction,
                        combining 3D modeling, physical prototyping, and code into a working system.
                    </motion.p>

                    {/* next iteration callouts */}
                    <motion.div className={styles.nextIterations} variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <span className={styles.nextLabel}>Next Iteration</span>
                        <div className={styles.nextItems}>
                            {[
                                "Force feedback loop",
                                "Wireless communication",
                                "Reduced latency pipeline",
                                "Haptic glove input",
                            ].map((item, i) => (
                                <div key={i} className={styles.nextItem}>
                                    <span className={styles.nextArrow}><ArrowRight size={12} /></span>
                                    <span>{item}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* reflection */}
                    <motion.div className={styles.reflection} variants={fadeUp} custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <div className={styles.reflectionBar} />
                        <blockquote className={styles.reflectionText}>
                            The project demonstrates that gesture-controlled telepresence is achievable
                            with modular off-the-shelf components — what remains is refining the pipeline
                            for precision, latency, and bi-directional feedback.
                        </blockquote>
                    </motion.div>

                    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <Link href="/#work"><a className={styles.backNavLink}><ArrowLeft size={14} /> Back to Archive</a></Link>
                    </motion.div>
                </div>
            </section>

            <ProjectNav currentId={4} />
        </div>
    );
}
