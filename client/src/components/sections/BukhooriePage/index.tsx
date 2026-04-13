import { useEffect, useRef, useState } from "react";
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
        transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 },
    }),
};

interface Props { project: Project; }

const bukhoorieFeatureSlides = [
    {
        title: "Lamp Base",
        subtitle: "Ornate Islamic Designs",
        bullets: [
            "The base of the lamp incorporates intricate Islamic geometric patterns, inspired by traditional Emirati architecture. These symmetrical motifs symbolize harmony and spirituality.",
            "Injection-molded patterned base allows light to pass through, adding an extra layer of visual interest.",
        ],
        src: "/images/PROJECTS/Kartell/SCROLLTELLING/LAMP%20BASE.png",
        alt: "Lamp base feature board with ornate Islamic designs callouts",
    },
    {
        title: "Bukhoor Dispenser",
        subtitle: "Traditional incense",
        bullets: [
            "A ceramic bukhoor chamber is housed within the base to retain heat while keeping the exterior safe to touch.",
            "A stainless steel plate distributes heat evenly at a controlled 110°C, while the electric heating element provides safe, flameless fragrance diffusion.",
        ],
        src: "/images/PROJECTS/Kartell/SCROLLTELLING/BUKHOORLAMP.png",
        alt: "Bukhoor dispenser feature board with traditional incense callouts",
    },
    {
        title: "Refractive Shade",
        subtitle: "Simulating Desert Dunes",
        bullets: [
            "The shade is crafted from polycarbonate, chosen for its optical transparency and durability.",
            "The wavy dune-like effect is achieved through injection molding, ensuring light refraction mimics desert mirages.",
        ],
        src: "/images/PROJECTS/Kartell/SCROLLTELLING/REFRACTIVE%20SHADE.png",
        alt: "Refractive shade feature board with desert dune callouts",
    },
];

export function BukhooriePage({ project }: Props) {
    const [activeFeature, setActiveFeature] = useState(0);
    const featureRefs = useRef<Array<HTMLDivElement | null>>([]);

    useEffect(() => {
        const elements = featureRefs.current.filter(Boolean) as HTMLDivElement[];
        if (!elements.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    const index = Number(entry.target.getAttribute("data-feature-index"));
                    if (!Number.isNaN(index)) {
                        setActiveFeature(index);
                    }
                });
            },
            {
                root: null,
                threshold: 0.55,
                rootMargin: "-12% 0px -12% 0px",
            },
        );

        elements.forEach((element) => observer.observe(element));
        return () => observer.disconnect();
    }, []);

    return (
        <div className={styles.page}>
            <Navbar />
            <ProjectSideNav
                accentColor="#C72A09"
                sections={[
                    { id: "context", label: "Context" },
                    { id: "ideation", label: "Ideation" },
                    { id: "concept", label: "Concept" },
                    { id: "product", label: "Features" },
                    { id: "outcome", label: "Conclusion" },
                    { id: "recognition", label: "Recognition" },
                ]}
            />

            {/* PAGE 1 — HERO (universal two-column component) */}
            <ProjectHero
                title="Bukhoorie"
                breadcrumbLabel="Bukhoorie"
                subtitle="A Ritual Lighting Experience"
                description="Lighting in Emirati homes is not only illumination — it accompanies rituals of hospitality, gathering, and scent. Bukhoorie reimagines a contemporary lamp as a vessel for welcoming guests through light and fragrance."
                tags={["Ritual Object", "Ambient Lighting"]}
                meta={[
                    { label: "Year", value: project.year },
                    { label: "Type", value: project.role },
                    { label: "Category", value: project.category },
                    { label: "Material", value: "Polycarbonate · Ceramic · Steel" },
                ]}
                panel={{
                    heading: "Project Data",
                    items: [
                        { label: "Year", value: "2025" },
                        { label: "Type", value: "Ritual Lighting Object" },
                        { label: "Team", value: "Duo" },
                        { label: "Context", value: "Competiton" },
                    ],
                }}
                imageSrc="/images/hero%20images/kartell.png"
                imageAlt="Bukhoorie lamp with smoke — ritual lighting"
                accentColor="#C72A09"
                theme="light"
            />

            {/* ═══════════════════════════════════════════════════════
          PAGE 2 — CONTEXT  (light)
      ═══════════════════════════════════════════════════════ */}
            <section id="context" className={`${styles.context} ${styles.contextDark}`} data-theme="dark">
                <div className={styles.sectionInner}>

                    <motion.span className={styles.sectionTag}
                        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        Cultural Translation
                    </motion.span>

                    <motion.p className={styles.contextLead}
                        variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        How can we reimagine Kartell’s iconic Bourgie lamp to honor the rich Emirati tradition?
                    </motion.p>

                   
                    <motion.div
                        className={styles.contextVenn}
                        variants={fadeUp}
                        custom={3}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <img
                            src="/images/PROJECTS/Kartell/venn.png"
                            alt="Venn diagram showing the relationship between the Bourgie lamp and Emirati hospitality ritual"
                            className={styles.contextVennImage}
                        />
                    </motion.div>

                    <div className={styles.contextTraitsRow}>
                        <motion.div
                            className={`${styles.contextTraitsBlock} ${styles.contextTraitsLeft}`}
                            variants={fadeUp}
                            custom={4}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <span className={styles.contextCardLabel}>Existing Lamp</span>
                            <ul className={styles.contextTraitList}>
                                <li>transparent polycarbonate</li>
                                <li>baroque ornament</li>
                                <li>decorative luxury object</li>
                            </ul>
                        </motion.div>

                        <motion.div
                            className={`${styles.contextTraitsBlock} ${styles.contextTraitsRight}`}
                            variants={fadeUp}
                            custom={5}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <span className={styles.contextCardLabel}>Emirati Ritual</span>
                            <ul className={styles.contextTraitList}>
                                <li>bukhoor as welcome</li>
                                <li>scent before speech</li>
                                <li>hospitality through atmosphere</li>
                            </ul>
                        </motion.div>
                    </div>

                   
                </div>
            </section>

            <section id="ideation" className={styles.ideation} data-theme="light">
                <div className={styles.sectionInner}>
                    <motion.span className={styles.sectionTag}
                        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        Ideation
                    </motion.span>

                    <motion.h2 className={styles.contextLead}
                        variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        Form and pattern exploration
                    </motion.h2>

                    <motion.p className={styles.contextSub}
                        variants={fadeUp} custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        Early sketches explored how Bukhoorie could translate ritual, ornament, and atmospheric
                        presence into a contemporary object while staying rooted in Emirati cultural references.
                    </motion.p>

                    <motion.div
                        variants={fadeUp} custom={3} initial="hidden" whileInView="visible" viewport={{ once: true }}
                    >
                        <img
                            src="/images/PROJECTS/Kartell/Sketch.png"
                            alt="Bukhoorie ideation sketches"
                            className={styles.ideationImage}
                        />
                    </motion.div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════
          PAGE 3 — DESIGN CONCEPT  (dark)
      ═══════════════════════════════════════════════════════ */}
            <section id="concept" className={styles.concept} data-theme="dark">
                <div className={styles.sectionInner}>

                    <motion.span className={styles.sectionTag}
                        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        Concept Direction
                    </motion.span>

                    {/* Bukhoor + Mashrabiya reference images */}


                    {/* three directions with individual images */}
                    <div className={styles.directionGrid}>
                        {[
                            {
                                icon: "◇",
                                title: "Desert Mirage",
                                desc: "Layered refractive shades cast shifting light patterns across the ground, echoing the visual shimmer of the desert mirage and reflecting the region’s deep-rooted connection to landscape.",
                                img: "/images/PROJECTS/Kartell/Desert Mirage.webp",
                                imgAlt: "Desert mirage light refraction",
                            },
                            {
                                icon: "⊞",
                                title: "Mashrabiya Privacy",
                                desc: "The shade reinterprets mashrabiya geometry, filtering light while referencing the architectural language of privacy, modesty, and controlled visibility.",
                                img: "/images/PROJECTS/Kartell/Mashrabiya+History.webp",
                                imgAlt: "Mashrabiya geometric pattern",
                            },

                            {
                                icon: "⊛",
                                title: "Bukhoor Diffusion",
                                desc: "An integrated bukhoor chamber allows fragrance to rise through the lamp’s body, transforming light into a sensory ritual of welcome, warmth, and presence.",
                                img: "/images/PROJECTS/Kartell/Bukhoor.jpg",
                                imgAlt: "Bukhoor incense ritual",
                            },
                        ].map((d, i) => (
                            <motion.div key={d.title} className={styles.directionCard}
                                variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                                <div className={styles.directionImgWrap}>
                                    <img src={d.img} alt={d.imgAlt} className={styles.directionImg} />
                                </div>
                                <span className={styles.directionIcon}>{d.icon}</span>
                                <h3 className={styles.directionTitle}>{d.title}</h3>
                                <p className={styles.directionDesc}>{d.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    <motion.p className={styles.conceptKeyLine}
                        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        Roots . Craft . Ritual
                    </motion.p>
                </div>
            </section>

            <section id="product" className={styles.featuresSection} data-theme="dark">
                <div className={styles.featuresDesktop}>
                    <div className={styles.featuresScroller}>
                        <div className={styles.featuresSticky}>
                            <div className={styles.featuresMeta}>
                                <span className={styles.sectionTag}>Features</span>
                                <span className={styles.featuresCounter}>{`0${activeFeature + 1} / 03`}</span>
                            </div>
                            <div className={styles.featuresMedia}>
                                {bukhoorieFeatureSlides.map((slide, index) => (
                                    <img
                                        key={slide.src}
                                        src={slide.src}
                                        alt={slide.alt}
                                        className={`${styles.featureImage} ${index === activeFeature ? styles.featureImageActive : ""}`}
                                    />
                                ))}
                            </div>
                            <div className={styles.featuresTextLayer}>
                                {bukhoorieFeatureSlides.map((slide, index) => (
                                    <article
                                        key={slide.title}
                                        className={`${styles.featureTextCard} ${index === activeFeature ? styles.featureTextCardActive : ""}`}
                                        aria-hidden={index !== activeFeature}
                                    >
                                        <h3 className={styles.featureTitle}>{slide.title}</h3>
                                        <p className={styles.featureSubtitle}>{slide.subtitle}</p>
                                        <ul className={styles.featureBulletList}>
                                            {slide.bullets.map((bullet) => (
                                                <li key={bullet}>{bullet}</li>
                                            ))}
                                        </ul>
                                    </article>
                                ))}
                            </div>
                        </div>

                        <div className={styles.featureMarkers} aria-hidden="true">
                            {bukhoorieFeatureSlides.map((slide, index) => (
                                <div
                                    key={slide.title}
                                    ref={(node) => {
                                        featureRefs.current[index] = node;
                                    }}
                                    data-feature-index={index}
                                    className={styles.featureMarker}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className={styles.featuresMobile}>
                    <div className={styles.sectionInner}>
                        <span className={styles.sectionTag}>Features</span>
                        <div className={styles.featureMobileList}>
                            {bukhoorieFeatureSlides.map((slide, index) => (
                                <article key={slide.title} className={styles.featureMobileCard}>
                                    <img
                                        src={slide.src}
                                        alt={slide.alt}
                                        className={styles.featureMobileImage}
                                    />
                                    <div className={styles.featureMobileCopy}>
                                        <span className={styles.featuresCounter}>{`0${index + 1} / 03`}</span>
                                        <h3 className={styles.featureTitle}>{slide.title}</h3>
                                        <p className={styles.featureSubtitle}>{slide.subtitle}</p>
                                        <ul className={styles.featureBulletList}>
                                            {slide.bullets.map((bullet) => (
                                                <li key={bullet}>{bullet}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════
          PAGE 7 — OUTCOME  (dark)
      ═══════════════════════════════════════════════════════ */}
            <section id="outcome" className={styles.outcome} data-theme="dark">
                <div className={styles.sectionInner}>
                    <motion.span className={styles.sectionTag}
                        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        Outcome
                    </motion.span>

                    {/* video only */}
                    <motion.div className={styles.outcomeVideoWrap}
                        variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <video
                            className={styles.outcomeVideo}
                            src="/images/PROJECTS/Kartell/kartell.MOV"
                            autoPlay
                            muted
                            loop
                            playsInline
                        />
                    </motion.div>

                    <motion.div className={styles.reflection}
                        variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <div className={styles.reflectionBar} />
                        <div>
                            <p className={styles.outcomeLine}>
                                The project demonstrates how contemporary design can carry tradition forward by
                                translating rituals into everyday objects.
                            </p>
                        
                            <p className={styles.closingLine}>
                                Design as a bridge between heritage and modern living.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            <section id="recognition" className={styles.recognitionSection}>
                <div className={styles.sectionInner}>
                    <div className={styles.recognitionBlock}>
                        <motion.span className={styles.sectionTagDark}
                            variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                            Recognition
                        </motion.span>
                        <motion.p
                            className={styles.recognitionNote}
                            variants={fadeUp}
                            custom={0}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            Presented at Design Week 2025, where the project was recognized in the presence of Lorenza Luti.
                        </motion.p>

                        <div className={styles.recognitionGrid}>
                            <motion.div className={styles.recognitionImgBox}
                                variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                                <img src="/images/PROJECTS/Kartell/recognitoin1.jpeg" alt="Recognition image 1" className={styles.recognitionImg} />
                            </motion.div>
                            <motion.div className={styles.recognitionImgBox}
                                variants={fadeUp} custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                                <img src="/images/PROJECTS/Kartell/recognitoin2.jpeg" alt="Recognition image 2" className={styles.recognitionImg} />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            <ProjectNav currentId={6} />
        </div>
    );
}
