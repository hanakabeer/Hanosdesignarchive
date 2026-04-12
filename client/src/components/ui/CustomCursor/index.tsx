import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useCursorStore } from "@/hooks/use-cursor-store";
import styles from "./styles.module.css";

export function CustomCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const [isVisible, setIsVisible] = useState(false);
  const cursorType = useCursorStore((state) => state.cursorType);
  const cursorVisible = useCursorStore((state) => state.cursorVisible);

  // Smooth springs for the cursor movement
  const springConfig = { damping: 25, stiffness: 250 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  return (
    <>
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>
      <motion.div
        className={styles.cursorWrapper}
        style={{
          x: cursorX,
          y: cursorY,
          opacity: isVisible && cursorVisible ? 1 : 0,
        }}
      >
        <AnimatePresence mode="wait">
          {cursorType === 'default' ? (
            <motion.div
              key="default"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className={styles.defaultCursor}
            >
              <svg width="24" height="26" viewBox="0 0 29 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path 
                  d="M16.3785 20.24C15.4685 20.41 14.8285 20.8 14.3685 21.55L9.16854 30.09C8.54854 31.1 7.57854 31.71 6.36854 31.51C5.32854 31.34 4.32854 30.57 4.13854 29.34L0.038539 3.17003C-0.131461 2.07003 0.268539 1.13003 1.08854 0.530029C1.90854 -0.0699714 2.99854 -0.209971 3.92854 0.320029L26.8685 13.32C28.0085 13.97 28.5885 14.96 28.3685 16.25C28.1685 17.47 27.2185 18.22 25.9385 18.46L16.3785 20.25V20.24Z" 
                  fill="currentColor"
                />
              </svg>
            </motion.div>
          ) : (
            <motion.div
              key="project"
              initial={{ scale: 0.5, opacity: 0, x: "-50%", y: "-50%" }}
              animate={{ scale: 1, opacity: 1, x: "-50%", y: "-50%" }}
              exit={{ scale: 0.5, opacity: 0, x: "-50%", y: "-50%" }}
              className={styles.projectCursor}
            >
              <span>Check out the project</span>
              <ArrowUpRight size={18} strokeWidth={1.5} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
