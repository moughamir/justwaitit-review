'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

import { useAnimationReady } from '@/hooks/use-animation-ready';

// Layer 1: outer edges (col 1 + col 5)
const LAYER_1 = [
  { src: '/images/lookbook-1.png', alt: 'Fashion lookbook 1' },
  { src: '/images/lookbook-2.png', alt: 'Fashion lookbook 2' },
  { src: '/images/lookbook-3.png', alt: 'Fashion lookbook 3' },
  {
    src: 'https://images.unsplash.com/photo-1488161628813-04466f872be2?w=600&auto=format&fit=crop&q=60',
    alt: 'Fashion street style',
  },
  {
    src: 'https://images.unsplash.com/photo-1565321590372-09331b9dd1eb?w=600&auto=format&fit=crop&q=60',
    alt: 'Air jordan sneakers',
  },
  { src: '/images/model-t.png', alt: 'Fashion model' },
];

// Layer 2: inner columns (col 2 + col 4)
const LAYER_2 = [
  {
    src: 'https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?w=600&auto=format&fit=crop&q=60',
    alt: 'Product photography',
  },
  {
    src: 'https://images.unsplash.com/photo-1637414165749-9b3cd88b8271?w=600&auto=format&fit=crop&q=60',
    alt: 'Tech product',
  },
  {
    src: 'https://images.unsplash.com/photo-1699911251220-8e0de3b5ce88?w=600&auto=format&fit=crop&q=60',
    alt: 'One wheel',
  },
  {
    src: 'https://images.unsplash.com/photo-1667483629944-6414ad0648c5?w=600&auto=format&fit=crop&q=60',
    alt: 'Luxury watch',
  },
  {
    src: 'https://images.unsplash.com/photo-1463100099107-aa0980c362e6?w=600&auto=format&fit=crop&q=60',
    alt: 'Fashion photography',
  },
  {
    src: 'https://images.unsplash.com/photo-1525385444278-b7968e7e28dc?w=600&auto=format&fit=crop&q=60',
    alt: 'Accessories',
  },
];

// Layer 3: center column top + bottom
const LAYER_3 = [
  {
    src: 'https://images.unsplash.com/photo-1590330297626-d7aff25a0431?w=600&auto=format&fit=crop&q=60',
    alt: 'Fashion editorial',
  },
  {
    src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=60',
    alt: 'Fashion model yellow',
  },
];

// Center image that scales from viewport → natural size
const CENTER_IMAGE = '/images/hero-model.png';

function GridLayer({
  items,
  layerIndex,
  progress,
}: {
  items: { src: string; alt: string }[];
  layerIndex: number;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
}) {
  // Staggered reveal: opacity 0→0→1 and scale 0→0→1
  const delayStart = 0.25 + layerIndex * 0.08;
  const opacity = useTransform(
    progress,
    [delayStart, delayStart + 0.15, 1],
    [0, 0, 1]
  );
  const scale = useTransform(
    progress,
    [delayStart - 0.05, delayStart, 1],
    [0.3, 0.3, 1]
  );

  return (
    <motion.div
      style={{ opacity, scale }}
      className="scroll-grid-layer"
      data-layer={layerIndex + 1}
    >
      {items.map((item, i) => (
        <div key={i}>
          <Image
            src={item.src}
            alt={item.alt}
            width={400}
            height={500}
            className="h-full w-full rounded-lg object-cover"
            style={{ aspectRatio: '4/5' }}
            loading="lazy"
          />
        </div>
      ))}
    </motion.div>
  );
}

export function ScrollGridSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { animated, reduced } = useAnimationReady();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  // Center image shrinks from viewport size → natural grid size
  const scalerWidth = useTransform(
    scrollYProgress,
    [0, 0.5],
    ['100vw', '100%']
  );
  const scalerHeight = useTransform(
    scrollYProgress,
    [0, 0.5],
    ['100vh', '100%']
  );
  const scalerRadius = useTransform(
    scrollYProgress,
    [0, 0.4],
    ['0px', '0.5rem']
  );

  // Fade out the center image slightly as layers appear
  const scalerOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    [1, 1, 0.85, 0.85]
  );

  if (reduced || !animated) {
    return (
      <section className="relative bg-[#0d0d0d] px-6 py-24">
        <div className="mx-auto grid max-w-[1600px] grid-cols-5 gap-6">
          {LAYER_1.slice(0, 3).map((item, i) => (
            <div key={i}>
              <Image
                src={item.src}
                alt={item.alt}
                width={400}
                height={500}
                className="h-full w-full rounded-lg object-cover"
                style={{ aspectRatio: '4/5' }}
                loading="lazy"
              />
            </div>
          ))}
          <div className="col-span-2 row-span-3">
            <Image
              src={CENTER_IMAGE}
              alt="Anaquo hero model"
              width={600}
              height={750}
              className="h-full w-full rounded-lg object-cover"
              style={{ aspectRatio: '4/5' }}
              priority
            />
          </div>
          {LAYER_1.slice(3).map((item, i) => (
            <div key={i}>
              <Image
                src={item.src}
                alt={item.alt}
                width={400}
                height={500}
                className="h-full w-full rounded-lg object-cover"
                style={{ aspectRatio: '4/5' }}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="relative h-[280vh] bg-[#0d0d0d]"
      aria-hidden="true"
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        <div className="scroll-grid">
          {/* Layer 1: outer edges */}
          <GridLayer
            items={LAYER_1}
            layerIndex={0}
            progress={scrollYProgress}
          />

          {/* Layer 2: inner columns */}
          <GridLayer
            items={LAYER_2}
            layerIndex={1}
            progress={scrollYProgress}
          />

          {/* Layer 3: center top + bottom */}
          <GridLayer
            items={LAYER_3}
            layerIndex={2}
            progress={scrollYProgress}
          />

          {/* Center scaler image */}
          <motion.div
            className="scroll-grid-scaler"
            style={{
              width: scalerWidth,
              height: scalerHeight,
              borderRadius: scalerRadius,
              opacity: scalerOpacity,
            }}
          >
            <Image
              src={CENTER_IMAGE}
              alt="Anaquo hero model"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 40vw"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
