import { useState, useRef, useMemo, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { useLocation } from "wouter";
import styles from "./styles.module.css";
import { Button } from "@/components/ui/button";

interface PlaygroundItem {
  id: string;
  title: string;
  year: string;
  tags: string[];
  coverColor: string;
  category: string;
  type: 'image' | 'video';
  src: string;
  link?: string;
  description?: string;
  industry?: string;
  duration?: string;
  team?: string[];
  role?: string;
}

const playgroundItems: PlaygroundItem[] = [
  // Industrial Category
  {
    id: "ind-1",
    title: "Art organizer",
    year: "2016",
    tags: ["Competition", "3D Printing"],
    coverColor: "#e5e5e5",
    category: "Industrial",
    type: 'image',
    src: "/images/Playground/industrial/Art organizer.png",
    link: "https://www.youtube.com/watch?v=GR5FLFMRYdk&list=PL7TJR9XUT3RjTS3Zo2APE9WAEon_yNvtN&index=11",
    description: "In 6th grade, I designed a rotating art organizer inspired by the Expo 2020 logo, combining symbolism with everyday function. That project became my first introduction to product design, showing me how design can communicate an idea while solving a real user need.",
    industry: "Industrial Design — Consumer Products",
    duration: "2 weeks",
    team: ["Solo Project"],
    role: "Industrial Designer"
  },
  {
    id: "ind-2",
    title: "Ecocycler",
    year: "2017",
    tags: ["Sustainability", "Product"],
    coverColor: "#d4d4d4",
    category: "Industrial",
    type: 'image',
    src: "/images/Playground/industrial/Ecocycler.png",
    description: "A home composting device that transforms organic waste into nutrient-rich soil pellets. Designed for compact urban living with a focus on sustainable material choices.",
    industry: "Industrial Design — Sustainability",
    duration: "2 weeks",
    team: ["Solo Project"],
    role: "Industrial Designer"
  },
  {
    id: "ind-3",
    title: "Kinetic Systems",
    year: "2023",
    tags: ["Mechanism", "Motion"],
    coverColor: "#a3a3a3",
    category: "Industrial",
    type: 'video',
    src: "/images/Playground/industrial/Kinetic Systems.mp4",
    description: "A kinetic dome sculpture exploring mechanical linkage systems, where motion, geometry, and light-responsive sensing come together in a dynamic form that opens during the day and closes at night.",
    industry: "Industrial Design — Kinetic Art",
    duration: "2 weeks",
    team: ["Solo Project"],
    role: "Designer & Fabricator"
  },
  {
    id: "ind-4",
    title: "Portapalm",
    year: "2024",
    tags: ["Python", "Industrial"],
    coverColor: "#525252",
    category: "Industrial",
    type: 'image',
    src: "/images/Playground/industrial/Portapalm.jpg",
    link: "/portapalm",
    description: "Porta Palm is a portable robotic assistance concept designed to support emergency response in hazardous situations. Developed as a proof-of-concept, the project explores how a gesture-controlled telepresence robotic arm, guided through a camera-based system.",
    industry: "Industrial Design",
    duration: "2 months",
    team: ["Solo Project"],
    role: "Industrial Designer"
  },
  // Interfaces Category
  {
    id: "int-1",
    title: "Blackforest",
    year: "2025",
    tags: ["UI/UX", "Interface"],
    coverColor: "#262626",
    category: "Interfaces",
    type: 'image',
    src: "/images/Playground/interfaces/Blackforest.png",
    link: "https://blackforest.finance/",
    description: "BlackForest involved a full redesign of the platform's UI and UX, focused on creating a clearer, more cohesive, and more intuitive user experience. I also designed a narrative-driven landing page that introduced the platform through a more immersive and engaging visual journey.",
    industry: "UI/UX — Finance",
    duration: "3 months",
    team: ["Internship Solo Project"],
    role: "UI Designer"
  },
  {
    id: "int-2",
    title: "DIDI Concept Library",
    year: "2024",
    tags: ["Interface", "Library", "Storytelling"],
    coverColor: "#404040",
    category: "Interfaces",
    type: 'video',
    src: "/images/Playground/interfaces/DIDI Concept Library.MP4",
    description: "DIDI Concept Library is a digital archive platform designed to organize and showcase design objects from our university museum in a more interactive and accessible way. The project focused on building the platform experience, including the interface, structure, and navigation system, to make exploring the collection feel intuitive, engaging, and visually rich.",
    industry: "UI/UX — Motion Design",
    duration: "2 months",
    team: ["Group Project"],
    role: "UI/UX & Motion Designer"
  },
  {
    id: "int-3",
    title: "TURABH",
    year: "2024",
    tags: ["Cultural Heritage", "Interactive Experience"],
    coverColor: "#737373",
    category: "Interfaces",
    type: 'video',
    src: "/images/Playground/interfaces/TURABH.mp4",
    description: "Turabh is an interactive cultural platform that reimagines how UAE village heritage can be explored through digital experience. The project combines mapping, storytelling, and community-driven features to make local history, crafts, and traditions more engaging, accessible, and immersive.",
    industry: "UI/UX — Cultural Heritage",
    duration: "4 weeks",
    team: ["Duo Project"],
    role: "Brand & Interface Designer"
  },
  // Videos Category
  {
    id: "vid-1",
    title: "AFTERTHEPOSE",
    year: "2025",
    tags: ["Motion", "Film"],
    coverColor: "#d4d4d4",
    category: "Videos",
    type: 'video',
    src: "/images/Playground/videos/AFTERTHEPOSE.mp4",
    description: "Video exploring how beauty and ritual are performed or lived, weaving together the Viennese Ball and the henna wedding through precise match cuts and quiet moments of presence. Displayed at TODA, Dubai with the UAE Philharmonic Orchestra as part of a fashion lecture.",
    industry: "Motion — Documentary Film",
    duration: "1 week",
    team: ["Solo Project"],
    role: "Director & Editor"
  },
  {
    id: "vid-2",
    title: "BLACKBIRD",
    year: "2025",
    tags: ["CGI", "Motion"],
    coverColor: "#f5f5f5",
    category: "Videos",
    type: 'video',
    src: "/images/Playground/videos/BLACKBIRD.mp4",
    description: "This fashion show opener introduces the dress as a symbol of rebellion against a simulacric world — a world built on appearances, control, and endless imitation. It begins in artificial perfection and ends in rupture, where the dress emerges as a symbol of defiance, raw identity, and power.",
    industry: "Motion — CGI & VFX",
    duration: "2 weeks",
    team: ["Solo Project"],
    role: "3D Artist & Motion Designer"
  },
  {
    id: "vid-3",
    title: "Haikyu Title Animation",
    year: "2025",
    tags: ["Anime", "Title"],
    coverColor: "#171717",
    category: "Videos",
    type: 'video',
    src: "/images/Playground/videos/Haikyu Title Animation.mp4",
    description: "A title sequence animation inspired by Haikyu!! Combines dynamic typography, impactful transitions, and a high-energy color palette.",
    industry: "Motion — Title Design",
    duration: "2 weeks",
    team: ["Solo Project"],
    role: "Motion Designer"
  },
  {
    id: "vid-4",
    title: "QuantumQi",
    year: "2025",
    tags: ["Tech", "Motion"],
    coverColor: "#2a2a2a",
    category: "Videos",
    type: 'video',
    src: "/images/Playground/videos/QuantumQi.mp4",
    description: "A 45-second product animation designed as a step-by-step interaction sequence, visualizing how a user enters, engages with, and activates the Quantum Qi pod.",
    industry: "Motion — Speculative Design",
    duration: "3 weeks",
    team: ["Solo Project"],
    role: "Director & Motion Designer"
  },
];

const categories = ["All", "Industrial", "Interfaces", "Videos"];

export function Playground() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState<PlaygroundItem | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [, navigate] = useLocation();

  const activePosition = useMotionValue(0);
  const springPosition = useSpring(activePosition, { stiffness: 150, damping: 25 });

  const filteredItems = useMemo(() => {
    return activeCategory === "All"
      ? playgroundItems
      : playgroundItems.filter(item => item.category === activeCategory);
  }, [activeCategory]);

  const totalCount = filteredItems.length;

  useEffect(() => {
    setActiveIndex(0);
    activePosition.set(0);
  }, [activeCategory, activePosition]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [selectedItem]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const progress = Math.max(0, Math.min(1, x / rect.width));
    const targetPos = progress * (totalCount - 1);
    activePosition.set(targetPos);
    const newIndex = Math.round(targetPos);
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  const activeItem = filteredItems[activeIndex];

  return (
    <section className={styles.playground}>
      <div className={styles.container}>
        {/* Filters */}
        <div className={styles.sidebar}>
          <div className={styles.filters}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`${styles.filterBtn} ${activeCategory === cat ? styles.active : ""}`}
              >
                <span className={styles.filterName}>{cat}</span>
                <span className={styles.filterCount}>
                  {cat === "All" ? playgroundItems.length : playgroundItems.filter(i => i.category === cat).length}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 3D Stack Area */}
        <div
          className={styles.stackWrapper}
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onClick={() => setSelectedItem(activeItem)}
          style={{ cursor: "pointer" }}
        >
          <div className={styles.stackPerspective}>
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => {
                const isVisible = Math.abs(index - activeIndex) <= 4;
                if (!isVisible) return null;

                return (
                  <Card
                    key={`${item.id}-${activeCategory}`}
                    item={item}
                    index={index}
                    activePosition={springPosition}
                    isActive={index === activeIndex}
                    onClick={() => setSelectedItem(item)}
                  />
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Metadata */}
        <div className={styles.footer}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeItem?.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={styles.meta}
            >
              <div className={styles.metaInfo}>
                <span className={styles.title}>{activeItem?.title}</span>
                <span className={styles.divider}>•</span>
                <span className={styles.year}>{activeItem?.year}</span>
                <span className={styles.divider}>•</span>
                <span className={styles.tags}>{activeItem?.tags.join(", ")}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                className={styles.openBtn}
                onClick={() => setSelectedItem(activeItem)}
              >
                View Details
              </Button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Pop Card Modal */}
      <AnimatePresence>
        {selectedItem && (
          <ProjectModal
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
            onNavigate={() => {
              if (!selectedItem.link) return;
              if (selectedItem.link.startsWith('http')) {
                window.open(selectedItem.link, '_blank', 'noopener,noreferrer');
              } else {
                navigate(selectedItem.link);
              }
            }}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

/* ─────────────────── Card ─────────────────── */
function Card({
  item,
  index,
  activePosition,
  isActive,
  onClick
}: {
  item: PlaygroundItem;
  index: number;
  activePosition: any;
  isActive: boolean;
  onClick: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const t = useTransform(activePosition, (pos: number) => index - pos);

  useEffect(() => {
    if (item.type === 'video' && videoRef.current) {
      if (isActive) {
        videoRef.current.play().catch(() => { });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isActive, item.type]);

  const x = useTransform(t, (v: number) => v * 140);
  const z = useTransform(t, (v: number) => -Math.abs(v) * 160);
  const y = useTransform(t, (v: number) => Math.abs(v) * 15);
  const rotateY = useTransform(t, (v: number) => Math.max(Math.min(v * -12, 35), -35));
  const scale = useTransform(t, (v: number) => 1 - Math.min(Math.abs(v) * 0.1, 0.3));
  const opacity = useTransform(t, (v: number) => 1 - Math.min(Math.abs(v) * 0.2, 0.85));
  const blur = useTransform(t, (v: number) => Math.min(Math.abs(v) * 2, 8));

  return (
    <motion.div
      className={styles.card}
      style={{
        x,
        y,
        z,
        rotateY,
        scale,
        opacity,
        filter: useTransform(blur, (v: number) => `blur(${v}px)`),
        zIndex: useTransform(t, (v: number) => 100 - Math.abs(Math.round(v * 10))),
      }}
      transition={{ type: "spring", stiffness: 200, damping: 25 }}
      whileHover={isActive ? { y: -10, scale: 1.02 } : {}}
      onClick={isActive ? onClick : undefined}
    >
      <div className={`${styles.cardContent} ${isActive ? styles.cardActive : ""}`}>
        {item.type === 'image' ? (
          <img
            src={item.src}
            alt={item.title}
            className={styles.cardMedia}
            loading="lazy"
          />
        ) : (
          <video
            ref={videoRef}
            src={item.src}
            className={styles.cardMedia}
            muted
            loop
            playsInline
            preload="metadata"
          />
        )}
        <div className={styles.cardGlint} />
        <div className={styles.cardGrain} />
        {isActive && (
          <div className={styles.cardClickHint}>
            <span>Click to expand</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ─────────────────── Project Modal ─────────────────── */
function ProjectModal({
  item,
  onClose,
  onNavigate
}: {
  item: PlaygroundItem;
  onClose: () => void;
  onNavigate: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (item.type === "video" && videoRef.current) {
      videoRef.current.play().catch(() => { });
    }
  }, [item]);

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className={styles.modalBackdrop}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Centering wrapper — sits above backdrop, uses flexbox to center */}
      <div className={styles.modalWrapper} onClick={onClose}>
        {/* Modal Card */}
        <motion.div
          className={styles.modal}
          initial={{ opacity: 0, scale: 0.88 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ type: "spring", stiffness: 280, damping: 28 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button className={styles.modalClose} onClick={onClose} aria-label="Close">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>

          {/* Media */}
          <div className={styles.modalMedia}>
            {item.type === "image" ? (
              <img src={item.src} alt={item.title} className={styles.modalImage} />
            ) : (
              <video
                ref={videoRef}
                src={item.src}
                className={styles.modalImage}
                controls
                loop
                playsInline
              />
            )}
            {/* Pill tags overlaid on image */}
            <div className={styles.modalTagsOverlay}>
              {item.tags.map(tag => (
                <span key={tag} className={styles.modalTag}>{tag}</span>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className={styles.modalContent}>
            <div className={styles.modalLeft}>
              <h2 className={styles.modalTitle}>{item.title}</h2>
              <p className={styles.modalDescription}>{item.description}</p>
            </div>

            <div className={styles.modalRight}>
              {item.industry && (
                <div className={styles.modalMeta}>
                  <span className={styles.modalMetaIcon}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M2 13V6l6-4 6 4v7H10V9H6v4H2Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <span className={styles.modalMetaText}>{item.industry}</span>
                </div>
              )}

              {item.duration && (
                <div className={styles.modalMeta}>
                  <span className={styles.modalMetaIcon}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <rect x="2" y="3" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.3" />
                      <path d="M5 1v3M11 1v3M2 7h12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                  </span>
                  <span className={styles.modalMetaText}>{item.duration}</span>
                </div>
              )}

              {item.team && item.team.length > 0 && (
                <div className={styles.modalMeta}>
                  <span className={styles.modalMetaIcon}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="6" cy="5" r="2.5" stroke="currentColor" strokeWidth="1.3" />
                      <path d="M1 13c0-2.76 2.24-5 5-5s5 2.24 5 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                      <circle cx="12" cy="5" r="2" stroke="currentColor" strokeWidth="1.2" />
                      <path d="M14 13c0-1.86-1.12-3.46-2.74-4.2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                  </span>
                  <div className={styles.modalMetaTeam}>
                    {item.team.map((member, i) => (
                      <span key={i} className={styles.modalMetaText}>{member}</span>
                    ))}
                  </div>
                </div>
              )}

              {item.role && (
                <div className={styles.modalMeta}>
                  <span className={styles.modalMetaIcon}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M8 9a3 3 0 100-6 3 3 0 000 6z" stroke="currentColor" strokeWidth="1.3" />
                      <path d="M2 14a6 6 0 0112 0" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                    </svg>
                  </span>
                  <div className={styles.modalMetaTeam}>
                    <span className={styles.modalMetaLabel}>{item.role}</span>
                    <span className={styles.modalMetaSubtext}>{item.year}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Footer CTA */}
          {item.link && (
            <div className={styles.modalFooter}>
              <button className={styles.modalCta} onClick={onNavigate}>
                {item.link.startsWith('http') ? 'Visit Project →' : 'View Case Study →'}
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
}
