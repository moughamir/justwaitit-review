"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { WaitlistForm } from "./waitlist-form";

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function WaitlistSection() {
  return (
    <section id="waitlist" className="relative min-h-screen flex items-center justify-center px-4 snap-start overflow-hidden py-20">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[800px] bg-aq-blue/10 rounded-full blur-[160px] pointer-events-none animate-glow" />
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="mx-auto max-w-4xl w-full relative z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
          {/* Incentives */}
          <div className="lg:col-span-2 space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight font-display">
                Why Join <br />
                <span className="text-brand-gradient">Early?</span>
              </h2>
              <p className="text-muted-foreground font-body text-sm sm:text-base max-w-md mx-auto lg:mx-0">
                Join 200+ Moroccan brands upgrading their visual commerce.
              </p>
            </div>

            <div className="space-y-6 max-w-sm mx-auto lg:mx-0 text-left">
              {[
                { title: "30-Minute Turnarounds", desc: "Go from raw garment imagery to a 4K editorial lookbook before your morning espresso cools." },
                { title: "Save 15,000+ MAD Per Campaign", desc: "Eliminate model fees, location scouting, and lighting rentals with 100% AI-generated sets." },
                { title: "Casablanca's Private Beta", desc: "Limited to 200 early-access brands locking in pioneer DH pricing before our public launch." },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-aq-blue/20 flex items-center justify-center mt-1">
                    <div className="w-2 h-2 rounded-full bg-aq-blue" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-sm sm:text-base">{item.title}</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Card */}
          <div className="lg:col-span-3 glass-strong rounded-[2rem] border-white/5 p-6 sm:p-10 text-left space-y-8 noise-overlay w-full max-w-md mx-auto lg:max-w-none">
            <div className="space-y-2 relative z-10 text-center sm:text-left">
              <h3 className="text-2xl font-bold tracking-tight font-display">
                Request an invitation to the atelier.
              </h3>
              <p className="text-sm text-muted-foreground font-body">
                Only 200 early-access spots available. Takes 30 seconds.
              </p>
            </div>

            <WaitlistForm source="home" />

            <p className="text-[10px] text-muted-foreground/50 font-body text-center relative z-10">
              By joining you agree to our{" "}
              <Link href="/terms" className="underline hover:text-aq-blue transition-colors">Terms</Link>
              {" "}and{" "}
              <Link href="/privacy" className="underline hover:text-aq-blue transition-colors">Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
