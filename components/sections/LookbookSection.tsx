'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

import lookbookImage1 from '@/public/images/lookbook-1.png';
import lookbookImage2 from '@/public/images/lookbook-2.png';
import lookbookImage3 from '@/public/images/lookbook-3.png';

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
  },
};

export function LookbookSection() {
  return (
    <section
      className="relative flex w-full flex-col items-center justify-center bg-background px-4 py-24 sm:px-8 lg:px-12"
      style={{ contentVisibility: 'auto', containIntrinsicSize: '1px 1200px' }}
    >
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-24 lg:gap-32">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={fadeUpVariants}
          className="flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="max-w-2xl">
            <h2 className="font-display text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              The Old Way is <br />
              <span className="font-serif italic text-aq-blue">
                Costing You.
              </span>
            </h2>
            <p className="mt-6 text-lg font-light leading-relaxed text-muted-foreground sm:text-xl">
              Fashion ecommerce moves fast. Waiting weeks and paying premium
              rates for traditional photography holds your brand back.
            </p>
          </div>

          <div className="hidden flex-col items-end gap-2 sm:flex">
            <span className="font-mono text-xs tracking-widest text-muted-foreground">
              AQ-LKBK-01
            </span>
            <div className="h-[1px] w-12 bg-aq-blue opacity-50" />
          </div>
        </motion.div>

        {/* Lookbook Layout */}
        <div className="flex w-full flex-col gap-8 sm:gap-12 lg:gap-24">
          {/* Row 1: Full-width cinematic shot */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={fadeUpVariants}
            className="flex flex-col gap-4"
          >
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-neutral-100 sm:aspect-[21/9]">
              <Image
                src={lookbookImage1}
                alt="Cinematic editorial shot of fashion models walking in a minimalist concrete space"
                fill
                className="object-cover object-center"
                placeholder="blur"
                quality={80}
                sizes="100vw"
              />
            </div>
            <div className="flex justify-between px-2">
              <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                01 // The Collection
              </span>
              <span className="font-sans text-xs text-muted-foreground">
                AI-Generated Environment
              </span>
            </div>
          </motion.div>

          {/* Row 2: Asymmetric Grid */}
          <div className="grid grid-cols-1 gap-8 sm:gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Left Col: Detail Shot (Offset down for parallax feel) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={fadeUpVariants}
              className="flex flex-col gap-4 lg:col-span-5 lg:col-start-1 lg:mt-32"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-neutral-100 sm:aspect-square lg:aspect-[4/5]">
                <Image
                  src={lookbookImage2}
                  alt="Close up of luxury fashion fabric texture and metallic accessory"
                  fill
                  className="object-cover object-center"
                  placeholder="blur"
                  quality={80}
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
              <div className="flex flex-col gap-1 px-2">
                <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  02 // Detail Focus
                </span>
                <p className="font-body text-sm font-light text-muted-foreground">
                  Physics-based lighting reveals true fabric textures and
                  material properties.
                </p>
              </div>
            </motion.div>

            {/* Right Col: Portrait Shot */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              variants={fadeUpVariants}
              className="flex flex-col gap-4 lg:col-span-6 lg:col-start-7"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl bg-neutral-100 lg:aspect-[2/3]">
                <Image
                  src={lookbookImage3}
                  alt="Vertical fashion portrait of a stylish model"
                  fill
                  className="object-cover object-center"
                  placeholder="blur"
                  quality={80}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="flex flex-col gap-1 px-2">
                <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  03 // The Look
                </span>
                <p className="font-body text-sm font-light text-muted-foreground">
                  Consistent model styling across entire cohesive campaigns.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
