import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import type { Project } from "@shared/schema";
import { Navbar } from "@/components/sections/Navbar";
import { ProjectNav } from "@/components/sections/ProjectNav";
import styles from "./styles.module.css";

const fadeUp = {
    hidden: { opacity: 0, y: 26 },
    visible: (i = 0) => ({
        opacity: 1, y: 0,
        transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 },
    }),
};

interface Props { project: Project; }

export function BukhooriePage({ project }: Props) {
    return (
        <div className={styles.page}>
            <Navbar />

            {/* ═══════════════════════════════════════════════════════
          PAGE 1 — EXPERIENCE  (dark)
      ═══════════════════════════════════════════════════════ */}
            <section className={styles.experience}>
                <div className={styles.expInner}>

                    {/* breadcrumb */}
                    <motion.div className={styles.breadcrumb}
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                        <Link href="/"><a className={styles.backLink}><ArrowLeft size={13} /> Archive</a></Link>
                        <span className={styles.sep}>/</span>
                        <span className={styles.curr}>Bukhoorie</span>
                    </motion.div>

                    {/* title block */}
                    <motion.div className={styles.titleBlock} variants={fadeUp} initial="hidden" animate="visible">
                        <h1 className={styles.heroTitle}>Bukhoorie</h1>
                        <div className={styles.accentLine} />
                        <p className={styles.heroSub}>A Ritual Lighting Experience</p>
                    </motion.div>

                    {/* full hero image */}
                    <motion.div
                        className={styles.heroImageWrap}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                    >
                        <img
                            src="/images/hero images/Kartell.png"
                            alt="Bukhoorie lamp with smoke — ritual lighting"
                            className={styles.heroImg}
                        />
                        {/* atmosphere overlay */}
                        <div className={styles.heroGlow} />
                    </motion.div>

                    {/* text + bottom line */}
                    <motion.div className={styles.expText} variants={fadeUp} custom={3} initial="hidden" animate="visible">
                        <p className={styles.expBody}>
                            Lighting in Emirati homes is not only illumination — it accompanies rituals of
                            hospitality, gathering, and scent. Bukhoorie reimagines a contemporary lamp as a
                            vessel for welcoming guests through light and fragrance.
                        </p>
                        <p className={styles.expTag}>Light becomes atmosphere.</p>
                    </motion.div>

                    {/* meta */}
                    <motion.div className={styles.metaRow} variants={fadeUp} custom={4} initial="hidden" animate="visible">
                        {[
                            { label: "Type", value: project.role },
                            { label: "Category", value: project.category },
                            { label: "Year", value: project.year },
                            { label: "Material", value: "Polycarbonate · Ceramic · Steel" },
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

                    <motion.span className={styles.sectionTag}
                        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        Cultural Translation
                    </motion.span>

                    <motion.p className={styles.contextLead}
                        variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        How can we reimagine Kartell’s iconic Bourgie lamp to honor the rich Emirati tradition?
                    </motion.p>

                    <motion.p className={styles.contextSub}
                        variants={fadeUp} custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        The project explores how a global design icon can respectfully integrate local
                        rituals and architectural language.
                    </motion.p>

                    {/* reference images: Kartell lamp + Emirati hospitality only */}
                    <div className={styles.contextImages}>
                        {[
                            { src: "/images/PROJECTS/Kartell/Burgie.png" },
                            { src: "/images/PROJECTS/Kartell/emirati-hospitality-by-carmen-update-image-1-e1742554805266-1024x577.webp" },
                        ].map((img, i) => (
                            <motion.div key={i} className={styles.contextImgBox}
                                variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                                <img src={img.src} alt={img.cap} className={styles.contextImg} />
                                <span className={styles.cap}>{img.cap}</span>
                            </motion.div>
                        ))}
                    </div>

                    {/* two columns */}
                    <div className={styles.contextCols}>
                        <motion.div className={styles.contextCard}
                            variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                            <span className={styles.contextCardLabel}>Existing Lamp</span>
                            <p className={styles.contextCardDesc}>
                                The Kartell Bourgie — a visual luxury object. Transparent polycarbonate,
                                baroque ornament, pure decoration.
                            </p>
                        </motion.div>

                        <motion.div className={styles.contextDivider}
                            variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                            <div className={styles.dividerLine} />
                            <span className={styles.dividerIcon}>＋</span>
                            <div className={styles.dividerLine} />
                        </motion.div>

                        <motion.div className={styles.contextCard}
                            variants={fadeUp} custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                            <span className={styles.contextCardLabel}>Emirati Ritual</span>
                            <p className={styles.contextCardDesc}>
                                Bukhoor — olfactory and social experience. Fragrance communicates
                                welcome, purity, and presence before words do.
                            </p>
                        </motion.div>
                    </div>

                    <motion.p className={styles.contextInsight}
                        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        Hospitality is communicated through scent as much as through space.
                    </motion.p>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════
          PAGE 3 — DESIGN CONCEPT  (dark)
      ═══════════════════════════════════════════════════════ */}
            <section className={styles.concept}>
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
                                desc: "Refracted polycarbonate layers produce shifting, heat-shimmer shadow patterns across surfaces.",
                                img: "/images/hero images/Kartell.png",
                                imgAlt: "Desert mirage light refraction",
                            },
                            {
                                icon: "⊞",
                                title: "Mashrabiya Privacy",
                                desc: "The ornate shade reinterprets mashrabiya geometry — filtering and patterning light while shielding the interior flame.",
                                img: "/images/PROJECTS/Kartell/Mashrabiya+History.webp",
                                imgAlt: "Mashrabiya geometric pattern",
                            },

                            {
                                icon: "⊛",
                                title: "Bukhoor Diffusion",
                                desc: "Integrated ceramic chamber allows fragrant incense to rise through the lamp’s body — scent follows light.",
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

            {/* ═══════════════════════════════════════════════════════
          PAGE 4 — PRODUCT DESIGN  (light)
      ═══════════════════════════════════════════════════════ */}
            <section className={styles.product}>
                <div className={styles.sectionInner}>

                    <motion.span className={styles.sectionTag}
                        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        Integrated Bukhoor Burner
                    </motion.span>

                    <div className={styles.productLayout}>
                        {/* image */}
                        <motion.div className={styles.productImgWrap}
                            variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                            <img src="/images/hero images/Kartell.png" alt="Bukhoorie lamp components" className={styles.productImg} />
                        </motion.div>

                        {/* diagram + text */}
                        <div className={styles.productRight}>
                            {/* vertical system diagram */}
                            <motion.div className={styles.systemDiagram}
                                variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                                {[
                                    { layer: "LIGHT", detail: "Polycarbonate shade — patterned diffusion", accent: true },
                                    { layer: "SMOKE", detail: "Fragrance channel — passive convection rise", accent: false },
                                    { layer: "CHAMBER", detail: "Ceramic cup + steel heating plate", accent: false },
                                ].map((row, i) => (
                                    <div key={row.layer} className={styles.diagramRow}>
                                        <div className={styles.diagramDot + (row.accent ? ` ${styles.diagramDotAccent}` : "")} />
                                        <div className={styles.diagramLine} />
                                        <div className={styles.diagramLabel}>{row.layer}</div>
                                        <div className={styles.diagramDetail}>{row.detail}</div>
                                    </div>
                                ))}
                            </motion.div>

                            <motion.p className={styles.productBody}
                                variants={fadeUp} custom={2} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                                The lamp contains a ceramic chamber and stainless steel heating plate to
                                safely burn incense without open flame — embedding ritual into form.
                            </motion.p>

                            <motion.p className={styles.productKeyLine}
                                variants={fadeUp} custom={3} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                                Light and fragrance operate together to create a shared sensory environment.
                            </motion.p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════
          PAGE 5 — REFRACTIVE SHADE  (dark)
      ═══════════════════════════════════════════════════════ */}
            <section className={styles.material}>
                <div className={styles.sectionInner}>
                    <motion.span className={styles.sectionTag}
                        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        Refractive Shade
                    </motion.span>

                    <motion.h2 className={styles.sectionTitle}
                        variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        Simulating Desert Dunes
                    </motion.h2>

                    <div className={styles.lightGrid}>
                        <motion.div className={styles.lightImgMain}
                            variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                            <img src="/images/hero images/Kartell.png" alt="Refractive shade light projection" className={styles.lightImg} />
                            <span className={styles.lightCap}>Light projection — layered refractive shade</span>
                        </motion.div>
                        <div className={styles.lightImgCol}>
                            {[
                                "Shadow patterns — surface texture",
                                "Close-up — polycarbonate optical depth",
                            ].map((cap, i) => (
                                <motion.div key={i} className={styles.lightImgSmall}
                                    variants={fadeUp} custom={i + 1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                                    <img src="/images/PROJECTS/Kartell/reflect.png" alt={cap} className={styles.lightImg} />
                                    <span className={styles.lightCap}>{cap}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <motion.div className={styles.materialCallout}
                        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <span className={styles.materialTag}>Polycarbonate</span>
                        <p className={styles.materialReason}>Chosen for optical transparency and heat resistance — the material participates in the ritual.</p>
                    </motion.div>

                    <motion.p className={styles.materialInsight}
                        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        The layered refractive shade produces shifting patterns resembling desert sand movement.
                    </motion.p>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════
          PAGE 6 — ORNATE ISLAMIC DESIGNS  (light)
      ═══════════════════════════════════════════════════════ */}
            <section className={styles.islamicDesigns}>
                <div className={styles.sectionInner}>
                    <motion.span className={styles.sectionTagDark}
                        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        Ornate Symmetric Islamic Designs
                    </motion.span>

                    <motion.h2 className={styles.islamicTitle}
                        variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        Geometric Heritage<br />Encoded in Light
                    </motion.h2>

                    {/* placeholder images for Islamic pattern explorations */}
                    <div className={styles.islamicGrid}>
                        {[
                            { src: "/images/PROJECTS/Kartell/Mashrabiya+History.webp", cap: "Mashrabiya lattice — privacy and pattern" },
                            { src: "/images/hero images/Kartell.png", cap: "Bourgie reinterpreted — ornate shade geometry" },
                            { src: "/images/PROJECTS/Kartell/Bukhoor.jpg", cap: "Ritual context — scent and symmetry" },
                        ].map((img, i) => (
                            <motion.div key={i} className={styles.islamicImgBox}
                                variants={fadeUp} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                                <img src={img.src} alt={img.cap} className={styles.islamicImg} />
                                <span className={styles.islamicCap}>{img.cap}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════════════════════════════════════════════════════
          PAGE 7 — OUTCOME  (dark)
      ═══════════════════════════════════════════════════════ */}
            <section className={styles.outcome}>
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
                            src="/images/PROJECTS/Kartell/bukhoorie.mp4"
                            autoPlay
                            muted
                            loop
                            playsInline
                        />
                    </motion.div>

                    <motion.p className={styles.outcomeLine}
                        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        Bukhoorie transforms a decorative object into a cultural interaction — combining
                        light, scent, and pattern to create a welcoming atmosphere.
                    </motion.p>

                    <motion.div className={styles.reflection}
                        variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        <div className={styles.reflectionBar} />
                        <div>
                            <p className={styles.reflectionText}>
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

            {/* ═══════════════════════════════════════════════════════
          PAGE 8 — RECOGNITION  (light)
      ═══════════════════════════════════════════════════════ */}
            <section className={styles.recognition}>
                <div className={styles.sectionInner}>
                    <motion.span className={styles.sectionTagDark}
                        variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                        Recognition
                    </motion.span>

                    <div className={styles.recognitionGrid}>
                        <motion.div className={styles.recognitionImgBox}
                            variants={fadeUp} custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                            <img src="/images/PROJECTS/Kartell/recognitoin1.jpeg" alt="Recognition image 1" className={styles.recognitionImg} />
                        </motion.div>
                        <motion.div className={styles.recognitionImgBox}
                            variants={fadeUp} custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                            <img src="/images/PROJECTS/Kartell/recognitoin2.jpeg" alt="Recognition image 2" className={styles.recognitionImg} />
                        </motion.div>
                    </div>

                    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}
                        style={{ marginTop: "3rem" }}>
                        <Link href="/"><a className={styles.backNavLink}><ArrowLeft size={14} /> Back to Archive</a></Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
