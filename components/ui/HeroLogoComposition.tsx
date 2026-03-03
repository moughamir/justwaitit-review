"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraphicLogo } from "./GraphicLogo";
import { TypoLogo } from "./TypoLogo";

interface HeroLogoCompositionProps {
  onComplete?: () => void;
  theme?: "light" | "dark";
  className?: string;
}

export function HeroLogoComposition({
  onComplete,
  theme = "dark",
  className = ""
}: HeroLogoCompositionProps) {
  const [isOpening, setIsOpening] = useState(false);
  const [isUnmounting, setIsUnmounting] = useState(false);

  useEffect(() => {
    // 1. Initial draw of GraphicLogo (takes ~1.8s total)
    // 2. Start opening parallax reveal after drawing finishes
    const openTimer = setTimeout(() => {
      setIsOpening(true);
    }, 2500);

    // 3. Unmount after reveal (parallax reveal takes 1.2s starting at 2.5s)
    const unmountTimer = setTimeout(() => {
      setIsUnmounting(true);
      if (onComplete) onComplete();
    }, 4500);

    return () => {
      clearTimeout(openTimer);
      clearTimeout(unmountTimer);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isUnmounting && (
        <motion.div
          className={`relative flex items-center justify-center w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] ${className}`}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)", transition: { duration: 1, ease: "easeInOut" } }}
        >
          {/* TypoLogo (Revealed underneath) */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center z-10"
            initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
            animate={
              isOpening
                ? { opacity: 1, scale: 1, filter: "blur(0px)" }
                : { opacity: 0, scale: 0.8, filter: "blur(10px)" }
            }
            transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <TypoLogo theme={theme} animate={false} className="w-[80%] drop-shadow-[0_0_30px_rgba(124,58,237,0.5)]" />
          </motion.div>

          {/* GraphicLogo (Parallax Overlay) */}
          <div className="absolute inset-0 z-20 pointer-events-none drop-shadow-2xl">
            <GraphicLogo animate={true} isOpening={isOpening} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}