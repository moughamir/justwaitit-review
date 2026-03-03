"use client";

import { motion } from "framer-motion";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const problems = [
  {
    title: "Expensive Productions",
    description: "Traditional studio shoots cost thousands in equipment, talent, and logistics.",
  },
  {
    title: "Slow Time-to-Market",
    description: "Weeks of planning and editing delay your collection's digital launch.",
  },
  {
    title: "Creative Limits",
    description: "Physical constraints limit your ability to experiment with diverse environments and styles.",
  },
];

export function ProblemSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 snap-start py-20">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUpVariants}
          className="text-center mb-16 space-y-4"
        >
          <h2 className="text-xs sm:text-sm font-bold text-aq-blue uppercase tracking-[0.3em]">The Problem</h2>
          <h3 className="text-3xl sm:text-5xl font-bold tracking-tight font-display">
            Fashion imagery is <span className="text-muted-foreground italic">hard.</span>
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { delay: index * 0.1, duration: 0.6 },
                },
              }}
              className="glass-card p-6 sm:p-8 rounded-2xl border-white/5 hover:border-aq-blue/20 transition-all group relative overflow-hidden"
            >
              <div className="text-aq-blue mb-4 font-mono text-lg font-bold group-hover:scale-110 transition-transform origin-left">0{index + 1}</div>
              <h4 className="text-xl font-bold mb-3 group-hover:text-brand-gradient transition-colors">
                {problem.title}
              </h4>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors">
                {problem.description}
              </p>
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-brand-gradient group-hover:w-full transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
