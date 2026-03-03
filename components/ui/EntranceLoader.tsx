"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeroLogoComposition } from "./HeroLogoComposition";

export function EntranceLoader() {
  const [loading, setLoading] = useState(true);

  const handleAnimationComplete = () => {
    setLoading(false);
  };

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 1.5, ease: [0.22, 1, 0.36, 1] }
          }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0F172A] overflow-hidden"
        >
          {/* Background cinematic glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.5, scale: 1.2 }}
            transition={{ duration: 4, ease: "easeOut" }}
            className="absolute inset-0 bg-radial-gradient from-aq-purple/20 to-transparent blur-3xl"
          />

          <div className="relative w-full max-w-[320px] sm:max-w-[400px] px-8 flex flex-col items-center">
            <HeroLogoComposition
              theme="dark"
              onComplete={handleAnimationComplete}
              className="w-full h-auto"
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 1, ease: "easeOut" }}
              className="mt-8 text-center"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-aq-muted/50">
                Experience the Future of Fashion
              </span>
            </motion.div>
          </div>

          {/* Grain overlay for cinematic feel */}
          <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-20 bg-grain" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
