"use client";

import { Asterisk } from "lucide-react";

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
    <section className="relative flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-24 min-h-screen snap-start">
      <div className="z-10 mx-auto w-full max-w-[1400px]">
        <div className="gap-16 lg:gap-24 grid grid-cols-1 lg:grid-cols-2">

          {/* Left Column - Heading */}
          <div className="flex flex-col justify-center max-w-xl animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both">
            <h2 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl text-balance tracking-tighter">
              The Old Way is <br />
              <span className="font-serif italic">Costing You</span>.
            </h2>
            <p className="mt-6 font-light text-muted-foreground/80 text-lg sm:text-xl">
              Fashion ecommerce moves fast. Waiting weeks and paying premium rates for traditional photography holds your brand back.
            </p>
          </div>

          {/* Right Column - Problem List */}
          <div className="flex flex-col justify-center gap-12">
            {problems.map((item, index) => (
              <div
                key={index}
                className="group flex gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both"
                style={{ animationDelay: `${200 * (index + 1)}ms` }}
              >
                <div className="flex-shrink-0 pt-2">
                  <div className="flex justify-center items-center bg-aq-blue/10 rounded-full w-10 h-10">
                    <Asterisk className="group-hover:rotate-180 w-5 h-5 text-aq-blue transition-transform duration-700 ease-out" />
                  </div>
                </div>
                <div>
                  <h3 className="mb-2 font-display font-bold text-2xl tracking-tight">
                    {item.title}
                  </h3>
                  <p className="font-light text-muted-foreground/80 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
