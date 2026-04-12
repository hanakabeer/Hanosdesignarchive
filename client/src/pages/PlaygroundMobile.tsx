import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "wouter";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useTransform,
  type MotionValue,
  type PanInfo,
} from "framer-motion";
import { Navbar } from "@/components/sections/Navbar";
import { playgroundCategories, playgroundItems, type PlaygroundItem } from "@/components/sections/Playground";
import styles from "./PlaygroundMobile.module.css";

const MIN_STEP = 106;
const MAX_STEP = 132;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getStepSize() {
  if (typeof window === "undefined") return 120;
  return clamp(window.innerHeight * 0.145, MIN_STEP, MAX_STEP);
}

export default function PlaygroundMobile() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState<PlaygroundItem | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [stepSize, setStepSize] = useState(getStepSize);
  const [, navigate] = useLocation();
  const reelPosition = useMotionValue(0);
  const dragStartIndex = useRef(0);

  const filteredItems = useMemo(() => {
    return activeCategory === "All"
      ? playgroundItems
      : playgroundItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  useEffect(() => {
    const updateStepSize = () => setStepSize(getStepSize());
    updateStepSize();
    window.addEventListener("resize", updateStepSize);
    return () => window.removeEventListener("resize", updateStepSize);
  }, []);

  useEffect(() => {
    if (selectedItem) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedItem]);

  const maxIndex = Math.max(filteredItems.length - 1, 0);

  const snapToIndex = (index: number) => {
    const nextIndex = clamp(index, 0, maxIndex);
    setActiveIndex(nextIndex);
    animate(reelPosition, nextIndex, {
      type: "spring",
      stiffness: 260,
      damping: 34,
      mass: 0.95,
      restDelta: 0.001,
    });
  };

  useEffect(() => {
    setSelectedItem(null);
    setActiveIndex(0);
    snapToIndex(0);
  }, [activeCategory]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (activeIndex > maxIndex) {
      setActiveIndex(maxIndex);
      snapToIndex(maxIndex);
    }
  }, [activeIndex, maxIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleDragStart = () => {
    dragStartIndex.current = reelPosition.get();
  };

  const handleDrag = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const offsetInItems = info.offset.y / stepSize;
    reelPosition.set(clamp(dragStartIndex.current - offsetInItems, 0, maxIndex));
  };

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const projectedIndex = reelPosition.get() - info.velocity.y / 1100;
    snapToIndex(Math.round(projectedIndex));
  };

  const activeItem = filteredItems[activeIndex];

  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        <section className={styles.hero}>
          <p className={styles.eyebrow}>Playground</p>
          <h1 className={styles.title}>Playground</h1>
          <p className={styles.description}>
            A vertical archive of smaller experiments across industrial design, interfaces, and motion.
          </p>
          <Link href="/#work">
            <a className={styles.backLink}>Back to Archive</a>
          </Link>
        </section>

        <section className={styles.filters}>
          {playgroundCategories.map((category) => (
            <button
              key={category}
              type="button"
              className={`${styles.filterButton} ${activeCategory === category ? styles.active : ""}`}
              onClick={() => setActiveCategory(category)}
            >
              <span>{category}</span>
              <span className={styles.filterCount}>
                {category === "All"
                  ? playgroundItems.length
                  : playgroundItems.filter((item) => item.category === category).length}
              </span>
            </button>
          ))}
        </section>

        <section className={styles.reelSection}>
          <div className={styles.reelFrame}>
            <div className={styles.reelFadeTop} />
            <div className={styles.reelFadeBottom} />
            <div className={styles.reelCenterAura} />
            <div className={styles.reelCenterRing} />

            <motion.div
              className={styles.gestureSurface}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.02}
              dragMomentum={false}
              onDragStart={handleDragStart}
              onDrag={handleDrag}
              onDragEnd={handleDragEnd}
            >
              {filteredItems.map((item, index) => (
                <ReelCircle
                  key={item.id}
                  item={item}
                  index={index}
                  stepSize={stepSize}
                  reelPosition={reelPosition}
                  isActive={index === activeIndex}
                  onPress={() => {
                    if (index !== activeIndex) {
                      snapToIndex(index);
                      return;
                    }
                    setSelectedItem(item);
                  }}
                />
              ))}
            </motion.div>
          </div>

          <AnimatePresence mode="wait">
            {activeItem && (
              <motion.div
                key={activeItem.id}
                className={styles.activeDetails}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className={styles.activeMetaRow}>
                  <span className={styles.activeCategory}>{activeItem.category}</span>
                  <span className={styles.activeYear}>{activeItem.year}</span>
                </div>
                <h2 className={styles.activeTitle}>{activeItem.title}</h2>
                <p className={styles.activeDescription}>{activeItem.description}</p>
                <div className={styles.activeTags}>
                  {activeItem.tags.map((tag) => (
                    <span key={`${activeItem.id}-${tag}`} className={styles.activeTag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <button className={styles.activeButton} onClick={() => setSelectedItem(activeItem)}>
                  Open Item
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>

      <AnimatePresence>
        {selectedItem && (
          <PlaygroundMobileModal
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
            onNavigate={() => {
              if (!selectedItem.link) return;
              if (selectedItem.link.startsWith("http")) {
                window.open(selectedItem.link, "_blank", "noopener,noreferrer");
                return;
              }
              navigate(selectedItem.link);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function ReelCircle({
  item,
  index,
  stepSize,
  reelPosition,
  isActive,
  onPress,
}: {
  item: PlaygroundItem;
  index: number;
  stepSize: number;
  reelPosition: MotionValue<number>;
  isActive: boolean;
  onPress: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const distance = useTransform(reelPosition, (value) => index - value);

  const y = useTransform(distance, (delta) => {
    const direction = Math.sign(delta);
    const magnitude = Math.abs(delta);

    if (magnitude <= 1) return direction * magnitude * stepSize;
    if (magnitude <= 2) return direction * (stepSize + (magnitude - 1) * stepSize * 0.82);
    return direction * (stepSize + stepSize * 0.82 + (magnitude - 2) * stepSize * 0.62);
  });

  const scale = useTransform(distance, [-3, -2, -1, 0, 1, 2, 3], [0.5, 0.64, 0.82, 1, 0.82, 0.64, 0.5]);
  const opacity = useTransform(distance, [-3, -2, -1, 0, 1, 2, 3], [0.12, 0.26, 0.58, 1, 0.58, 0.26, 0.12]);
  const blur = useTransform(distance, [-3, -2, -1, 0, 1, 2, 3], [7, 4.5, 1.6, 0, 1.6, 4.5, 7]);
  const brightness = useTransform(distance, [-3, -2, -1, 0, 1, 2, 3], [0.6, 0.7, 0.88, 1, 0.88, 0.7, 0.6]);
  const zIndex = useTransform(distance, (delta) => {
    if (isActive) return 220;
    return 100 - Math.round(Math.abs(delta) * 12);
  });

  useEffect(() => {
    if (item.type !== "video" || !videoRef.current) return;
    if (isActive) {
      videoRef.current.play().catch(() => {});
      return;
    }
    videoRef.current.pause();
  }, [isActive, item.type]);

  return (
    <motion.button
      type="button"
      className={styles.reelItem}
      style={{
        x: "-50%",
        y,
        scale,
        opacity,
        zIndex,
        filter: useTransform([blur, brightness], ([nextBlur, nextBrightness]) =>
          `blur(${nextBlur}px) brightness(${nextBrightness})`
        ),
      }}
      onClick={onPress}
      aria-label={item.title}
    >
      <div className={`${styles.circleShell} ${isActive ? styles.circleShellActive : ""}`}>
        <div className={styles.circleMediaWrap}>
          {item.type === "image" ? (
            <img src={item.src} alt={item.title} className={styles.circleMedia} loading="lazy" />
          ) : (
            <video
              ref={videoRef}
              src={item.src}
              className={styles.circleMedia}
              muted
              loop
              playsInline
              preload="metadata"
            />
          )}
        </div>
        <div className={styles.circleOverlay} />
        <div className={styles.circleLabel}>
          <span>{item.title}</span>
        </div>
      </div>
    </motion.button>
  );
}

function PlaygroundMobileModal({
  item,
  onClose,
  onNavigate,
}: {
  item: PlaygroundItem;
  onClose: () => void;
  onNavigate: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (item.type === "video" && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [item]);

  return (
    <>
      <motion.div
        className={styles.modalBackdrop}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      <div className={styles.modalWrapper} onClick={onClose}>
        <motion.div
          className={styles.modal}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 22 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          onClick={(event) => event.stopPropagation()}
        >
          <button className={styles.modalClose} onClick={onClose} aria-label="Close">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>

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
          </div>

          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <p className={styles.modalKicker}>
                {item.category} · {item.year}
              </p>
              <h2 className={styles.modalTitle}>{item.title}</h2>
            </div>
            <p className={styles.modalDescription}>{item.description}</p>
            <div className={styles.modalMeta}>
              {item.industry && <p>{item.industry}</p>}
              {item.duration && <p>{item.duration}</p>}
              {item.role && <p>{item.role}</p>}
            </div>
            <div className={styles.modalTags}>
              {item.tags.map((tag) => (
                <span key={tag} className={styles.modalTag}>
                  {tag}
                </span>
              ))}
            </div>
            {item.link && (
              <button className={styles.modalAction} onClick={onNavigate}>
                {item.link.startsWith("http") ? "Visit Project" : "View Case Study"}
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
}
