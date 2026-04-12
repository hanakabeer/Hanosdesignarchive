import { motion } from "framer-motion";
import type { Project } from "@shared/schema";
import { Navbar } from "@/components/sections/Navbar";
import { ProjectNav } from "@/components/sections/ProjectNav";
import { ProjectHero } from "@/components/sections/ProjectHero";
import { ProjectSideNav } from "@/components/sections/ProjectSideNav";
import styles from "./styles.module.css";

const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.82, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 },
    }),
};

interface Props { project: Project; }

const systemStages = [
    {
        index: "01",
        title: "Assist",
        body: "Stabilize and support when control is limited",
        bullets: ["guided grip", "motor support", "object stabilization"],
    },
    {
        index: "02",
        title: "Train",
        body: "Introduce adaptive challenge to build control",
        bullets: ["adaptive resistance", "visual feedback", "repetition learning"],
    },
    {
        index: "03",
        title: "Augment",
        body: "Enhance performance beyond baseline ability",
        bullets: ["precision enhancement", "stronger grip output", "performance extension"],
    },
];

const mechanicalDevelopment = [
    {
        index: "01",
        title: "Early exploration",
        body: "Exploring segmented structures to understand bending behavior and joint articulation.",
        tone: "early",
        image: "/images/PROJECTS/versagrip/pneumatic.png",
        imageAlt: "Early segmented spine studies for VersaGrip",
    },
    {
        index: "02",
        title: "Refinement",
        body: "Refining segmentation density and structure to improve curvature control and consistency.",
        tone: "mid",
        image: "/images/PROJECTS/versagrip/pro3.png",
        imageAlt: "Refined segmented VersaGrip structure",
    },
    {
        index: "03",
        title: "Final system",
        body: "Developing a string-pulled system that enables controlled, responsive finger actuation.",
        tone: "final",
        image: "/images/PROJECTS/versagrip/22.png",
        imageAlt: "Final VersaGrip prototype on a dark background",
    },
];

const handUnderstanding = [
    {
        title: "Detect",
        body: "Hand tracking is established using real-time pose estimation, capturing finger positions and movement data.",
        image: "/images/PROJECTS/versagrip/UNDERSTANDINGHAND/detect3.mp4",
        imageAlt: "Hand tracking clip showing landmark detection",
        visual: "video",
    },
    {
        title: "Interpret",
        body: "Captured data is processed into simplified representations of finger movement and spatial positioning.",
        image: "/images/PROJECTS/versagrip/UNDERSTANDINGHAND/detect2.mp4",
        imageAlt: "Tracked hand movement clip with interpretation overlays",
        visual: "video",
    },
    {
        title: "Estimate Support",
        body: "Hand position and object context are analyzed together to infer how the grip should adapt during interaction.",
        image: "/images/PROJECTS/versagrip/UNDERSTANDINGHAND/detect1.mp4",
        imageAlt: "Support estimation clip based on tracked hand movement",
        visual: "video",
    },
];

const interactionTraining = [
    {
        title: "Feedback",
        body: "Visual and audio feedback systems respond dynamically to movement, reinforcing correct interaction.",
        image: "/images/PROJECTS/versagrip/INTERACT/INTERACT1.mp4",
        imageAlt: "Interaction feedback clip for VersaGrip",
        visual: "video",
    },
    {
        title: "Training",
        body: "Structured training modes provide visual feedback and adjustable difficulty to support repeated practice.",
        image: "/images/PROJECTS/versagrip/INTERACT/INTERACT2.mp4",
        imageAlt: "Training interaction clip for VersaGrip",
        visual: "video",
    },
    {
        title: "Engagement",
        body: "A simplified interface allows users to engage with the system through guided hand interaction.",
        image: "/images/PROJECTS/versagrip/INTERACT/INTERACT3.mp4",
        imageAlt: "Engagement interaction clip for VersaGrip",
        visual: "video",
    },
];

const contextInsights = [
    {
        title: "Fingertips",
        body: "Supports contact timing and finger sequencing.",
    },
    {
        title: "Thumb",
        body: "Reinforces control during pinch and directional grip.",
    },
    {
        title: "Palm",
        body: "Adds stabilizing support while preserving effort.",
    },
];

export function VersaGripProjectPage({ project }: Props) {
    return (
        <div className={styles.page}>
            <Navbar />
            <ProjectSideNav
                accentColor="#C5B359"
                sections={[
                    { id: "overview", label: "Overview" },
                    { id: "context", label: "Context" },
                    { id: "system-logic", label: "System Logic" },
                    { id: "ideation", label: "Ideation" },
                    { id: "development", label: "Development" },
                    { id: "ongoing-project", label: "Recognition & Next Steps" },
                ]}
            />

            <div id="overview">
                <ProjectHero
                    title="VersaGrip"
                    breadcrumbLabel="VersaGrip"
                    subtitle="Adaptive Assistive Hand Training System"
                    description="An ongoing assistive-system concept for people with Multiple Sclerosis that supports grasping and hand training without removing the user from the action."
                    tags={["Assistive Wearable", "Hand Rehabilitation"]}
                    meta={[
                        { label: "Year", value: project.year },
                        { label: "Type", value: project.role },
                        { label: "Category", value: project.category },
                        { label: "Focus", value: "Adaptive Grip Support" },
                    ]}
                    panel={{
                        heading: "Project Data",
                        items: [
                            { label: "Year", value: "2025" },
                            { label: "Type", value: "Assistive Wearable" },
                            { label: "Team", value: "Team of 3" },
                            { label: "Context", value: "Competition" },
                        ],
                    }}
                    imageSrc="/images/hero images/versagrip.png"
                    imageAlt="VersaGrip wearable system on a hand"
                    accentColor="#C5B359"
                />
            </div>

            <section id="context" className={styles.context} data-theme="dark">
                <div className={styles.sectionInner}>
                    <motion.span
                        className={styles.sectionTag}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        Context
                    </motion.span>

                    <div className={styles.contextGrid}>
                        <div className={styles.contextIntro}>
                            <motion.h2
                                className={styles.sectionHeadingLight}
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                When coordination drops, grasping becomes less stable.
                            </motion.h2>
                            <motion.p
                                className={styles.sectionBodyLight}
                                variants={fadeUp}
                                custom={1}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                Reduced coordination affects how the hand initiates contact, controls pressure,
                                and maintains hold. VersaGrip responds with targeted support across key grasp
                                zones, helping the user stay involved in the effort rather than replacing it.
                            </motion.p>
                        </div>

                        <motion.div
                            className={styles.contextScene}
                            variants={fadeUp}
                            custom={2}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <div className={styles.contextGlow} />
                            <div className={styles.contextSceneOverlay} />
                            <img
                                className={styles.contextImage}
                                src="/images/PROJECTS/versagrip/palm.png"
                                alt="VersaGrip hand support diagram highlighting fingertips, thumb, and palm support zones"
                            />
                        
                        </motion.div>

                        <div className={styles.contextInsights}>
                            {contextInsights.map((item, index) => (
                                <motion.div
                                    key={item.title}
                                    className={styles.contextInsight}
                                    variants={fadeUp}
                                    custom={index + 2}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                >
                                    <span className={styles.contextInsightIndex}>
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                    <h3>{item.title}</h3>
                                    <p>{item.body}</p>
                                </motion.div>
                            ))}
                        </div>

                    </div>
                </div>
            </section>

            <section id="system-logic" className={styles.system} data-theme="light">
                <div className={styles.sectionInner}>
                    <motion.span
                        className={styles.sectionTag}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        System Logic
                    </motion.span>

                    <div className={styles.systemIntro}>
                        <motion.h2
                            className={styles.sectionHeading}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            How might a responsive glove evolve from support into augmentation?
                        </motion.h2>
                        <motion.p
                            className={styles.sectionBody}
                            variants={fadeUp}
                            custom={1}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            VersaGrip is framed as a progression over time: first stabilizing motion, then
                            introducing challenge, and eventually extending performance once control is stronger.
                        </motion.p>
                    </div>

                    <motion.div
                        className={styles.systemDiagram}
                        variants={fadeUp}
                        custom={2}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <div className={styles.systemGlow} aria-hidden="true" />
                        <div className={styles.systemGlowAccent} aria-hidden="true" />

                        <div className={styles.nodeTrack}>
                            {systemStages.map((stage, index) => (
                                <motion.article
                                    key={stage.title}
                                    className={`${styles.stageCard} ${styles[`stage${stage.title}` as keyof typeof styles]}`}
                                    variants={fadeUp}
                                    custom={index + 2}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                >
                                    <span className={styles.stageIndex}>{stage.index}</span>
                                    <div className={styles.stagePanel}>
                                        <div className={styles.stagePanelInner}>
                                            <h3 className={styles.stageTitle}>{stage.title}</h3>
                                            <p className={styles.stageBody}>{stage.body}</p>
                                            <ul className={styles.stageList}>
                                                {stage.bullets.map((bullet) => (
                                                    <li key={bullet}>{bullet}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </motion.article>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            <section id="ideation" className={styles.ideationSection} data-theme="dark">
                <div className={styles.sectionInner}>
                    <motion.span
                        className={styles.sectionTag}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        Ideation
                    </motion.span>
                    <motion.h2
                        className={styles.sectionHeadingLight}
                        variants={fadeUp}
                        custom={1}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        Form and wearable direction
                    </motion.h2>
                    <motion.div
                        className={styles.ideationCopy}
                        variants={fadeUp}
                        custom={2}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <p className={styles.sectionBodyLight}>
                            Early concepts improved grip through simple adaptive attachments, but they felt external and purely assistive. This revealed an opportunity to rethink the system as a more integrated extension of the body.
                        </p>
                        <p className={styles.ideationQuestion}>
                            How might this become something users want to wear, not just need to?
                        </p>
                        <p className={styles.sectionBodyLight}>
                            The exploration shifted toward a lighter, more minimal approach, drawing from
                            jewelry-like structures and wearable aesthetics, while still maintaining the core
                            actuation logic.
                        </p>
                    </motion.div>

                    <motion.div
                        variants={fadeUp}
                        custom={3}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <img
                            src="/images/PROJECTS/versagrip/Sketch.png"
                            alt="VersaGrip ideation and wearable form direction"
                            className={styles.ideationImage}
                        />
                    </motion.div>
                </div>
            </section>

            <section id="development" className={styles.development} data-theme="light">
                <div className={styles.sectionInner}>
                    <motion.span
                        className={styles.sectionTag}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        Development
                    </motion.span>

                    <div className={styles.developmentIntro}>
                        <motion.h2
                            className={styles.sectionHeading}
                            variants={fadeUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            The project comes together through body, brain, and behavior.
                        </motion.h2>
                        <motion.p
                            className={styles.sectionBody}
                            variants={fadeUp}
                            custom={1}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            Development was narrowed into three connected tracks: mechanical form, hand
                            understanding, and interaction.
                        </motion.p>
                    </div>

                    <div className={styles.developmentTracks}>
                        <section className={styles.developmentTrack}>
                            <motion.div
                                className={styles.trackIntro}
                                variants={fadeUp}
                                custom={2}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                <span className={styles.trackIndex}>01</span>
                                <div>
                                    <h3 className={styles.trackHeading}>Mechanical development</h3>
                                    <p className={styles.trackBody}>
                                        From segmented structures to controlled actuation.
                                    </p>
                                </div>
                            </motion.div>

                            <div className={styles.mechanicalFlow}>
                                {mechanicalDevelopment.map((item, index) => (
                                    <motion.article
                                        key={item.title}
                                        className={`${styles.mechanicalStep} ${styles[`mechanical${item.tone.charAt(0).toUpperCase()}${item.tone.slice(1)}` as keyof typeof styles]}`}
                                        variants={fadeUp}
                                        custom={index + 3}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                    >
                                        <div className={styles.mechanicalStepHeader}>
                                            <span className={styles.mechanicalStepIndex}>{item.index}</span>
                                            <h4 className={styles.mechanicalStepTitle}>{item.title}</h4>
                                        </div>
                                        {item.image ? (
                                            item.image.endsWith(".mp4") || item.image.endsWith(".webm") || item.image.endsWith(".mov") ? (
                                                <video
                                                    src={item.image}
                                                    aria-label={item.imageAlt}
                                                    className={item.tone === "final" ? styles.mechanicalImageLarge : styles.mechanicalImageSmall}
                                                    autoPlay
                                                    muted
                                                    loop
                                                    playsInline
                                                />
                                            ) : (
                                                <img
                                                    src={item.image}
                                                    alt={item.imageAlt}
                                                    className={item.tone === "final" ? styles.mechanicalImageLarge : styles.mechanicalImageSmall}
                                                />
                                            )
                                        ) : null}
                                        <p className={styles.mechanicalStepBody}>{item.body}</p>
                                    </motion.article>
                                ))}
                            </div>
                        </section>

                        <section className={styles.developmentTrack}>
                            <motion.div
                                className={styles.trackIntro}
                                variants={fadeUp}
                                custom={9}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                <span className={styles.trackIndex}>02</span>
                                <div>
                                    <h3 className={styles.trackHeading}>Understanding the hand</h3>
                                    <p className={styles.trackBody}>
                                        The system captures real-time hand movement and translates it into
                                        meaningful signals.
                                    </p>
                                </div>
                            </motion.div>

                            <div className={styles.systemStack}>
                                {handUnderstanding.map((item, index) => (
                                    <motion.article
                                        key={item.title}
                                        className={styles.systemCard}
                                        variants={fadeUp}
                                        custom={index + 10}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                    >
                                        <div className={styles.trackStepHeader}>
                                            <span className={styles.trackStepIndex}>{item.index}</span>
                                            <h4 className={styles.trackStepTitle}>{item.title}</h4>
                                        </div>
                                        <div className={styles.systemVisual}>
                                            {item.visual === "video" && item.image ? (
                                                <video
                                                    src={item.image}
                                                    aria-label={item.imageAlt}
                                                    className={styles.systemVisualImage}
                                                    autoPlay
                                                    muted
                                                    loop
                                                    playsInline
                                                />
                                            ) : item.visual === "image" && item.image ? (
                                                <img
                                                    src={item.image}
                                                    alt={item.imageAlt}
                                                    className={styles.systemVisualImage}
                                                />
                                            ) : (
                                                <div className={styles.systemEstimateVisual} aria-hidden="true">
                                                    <span />
                                                    <span />
                                                    <span />
                                                </div>
                                            )}
                                        </div>
                                        <p className={styles.systemCardBody}>{item.body}</p>
                                    </motion.article>
                                ))}
                            </div>
                        </section>

                        <section className={styles.developmentTrack}>
                            <motion.div
                                className={styles.trackIntro}
                                variants={fadeUp}
                                custom={13}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                <span className={styles.trackIndex}>03</span>
                                <div>
                                    <h3 className={styles.trackHeading}>Interaction & training</h3>
                                    <p className={styles.trackBody}>
                                        The system evolves from immediate feedback into structured training and
                                        expressive interaction.
                                    </p>
                                </div>
                            </motion.div>

                            <div className={styles.interactionFlow}>
                                {interactionTraining.map((item, index) => (
                                    <motion.article
                                        key={item.title}
                                        className={styles.interactionCard}
                                        variants={fadeUp}
                                        custom={index + 14}
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: true }}
                                    >
                                        <div className={styles.trackStepHeader}>
                                            <span className={styles.trackStepIndex}>{item.index}</span>
                                            <h4 className={styles.trackStepTitle}>{item.title}</h4>
                                        </div>
                                        <div className={styles.interactionVisual}>
                                            {item.visual === "video" && item.image ? (
                                                <video
                                                    src={item.image}
                                                    aria-label={item.imageAlt}
                                                    className={styles.interactionVisualImage}
                                                    autoPlay
                                                    muted
                                                    loop
                                                    playsInline
                                                />
                                            ) : item.visual === "training" ? (
                                                <div className={styles.trainingInterface} aria-hidden="true">
                                                    <span />
                                                    <span />
                                                    <span />
                                                </div>
                                            ) : (
                                                <div className={styles.engagementVisual} aria-hidden="true">
                                                    <span />
                                                    <span />
                                                    <span />
                                                </div>
                                            )}
                                        </div>
                                        <p className={styles.interactionBody}>{item.body}</p>
                                    </motion.article>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </section>

            <section id="ongoing-project" className={styles.ongoing} data-theme="light">
                <div className={styles.sectionInner}>
                    <motion.span
                        className={styles.sectionTag}
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        Recognition & Next Steps
                    </motion.span>

                    <div className={styles.ongoingGrid}>
                        <div className={styles.recognitionColumn}>
                            <div className={styles.recognitionIntro}>
                            <motion.h2
                                className={styles.sectionHeading}
                                    variants={fadeUp}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                >
                                    Recognized for inclusive design, VersaGrip moves into its next-stage prototype.
                                </motion.h2>
                            <motion.p
                                className={styles.sectionBody}
                                    variants={fadeUp}
                                    custom={1}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                >
                                    The project was recognized through the National MS Society&apos;s Universal
                                    Design for Inclusion program, marking external validation for the concept and a
                                    clearer foundation for focused development ahead.
                                </motion.p>
                            </div>

                            <motion.figure
                                className={styles.recognitionFigure}
                                variants={fadeUp}
                                custom={2}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                <img
                                    src="/images/PROJECTS/versagrip/recognition1.png"
                                    alt="VersaGrip prototype shown as the recognition visual for the project"
                                    className={styles.recognitionImage}
                                />
                                <figcaption className={styles.imageCardCaption}>
                                    Recognized through the National MS Society program.
                                </figcaption>
                            </motion.figure>
                        </div>

                        <div className={styles.nextStepsColumn}>
                            <motion.div
                                className={styles.ongoingCard}
                                variants={fadeUp}
                                custom={3}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                <span className={styles.cardEyebrow}>Next Steps</span>
                                <div className={styles.nextList}>
                                    <div className={styles.nextItem}>
                                        <span>Physical proof of concept</span>
                                        <p>Improve force delivery, wearability, and repeatable actuation.</p>
                                    </div>
                                    <div className={styles.nextItem}>
                                        <span>Interface refinement</span>
                                        <p>Clarify feedback, training flow, and session guidance.</p>
                                    </div>
                                    <div className={styles.nextItem}>
                                        <span>System validation</span>
                                        <p>Test support, sensing, and grasp performance across realistic grasp scenarios.</p>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.figure
                                className={styles.nextStepsFigure}
                                variants={fadeUp}
                                custom={4}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                            >
                                <img
                                    src="/images/PROJECTS/versagrip/recognition2.jpg"
                                    alt="VersaGrip prototype detail supporting the next steps roadmap"
                                    className={styles.nextStepsImage}
                                />
                                <figcaption className={styles.imageCardCaption}>
                                   Certification Cermony at Dubai Design Week, November 2025.
                                </figcaption>
                            </motion.figure>
                        </div>
                    </div>
                </div>
            </section>

            <ProjectNav currentId={4} />
        </div>
    );
}
