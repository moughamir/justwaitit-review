'use client';

import { motion } from 'framer-motion';
import { Code2, Layers, Sparkles } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

const orbitCards = [
  {
    title: 'Layered composition',
    copy: 'Stacked gradients, soft glows, and radial masks create a polished demo-first surface.',
    icon: Layers,
    position: 'left-2 top-6 sm:left-8 sm:top-10',
  },
  {
    title: 'Library primitives',
    copy: 'Built from existing UI primitives so styles stay consistent across sections and pages.',
    icon: Code2,
    position: 'right-2 top-20 sm:right-8 sm:top-24',
  },
  {
    title: 'Smooth interaction',
    copy: 'Animated with framer-motion for lightweight transitions that feel close to CodePen demos.',
    icon: Sparkles,
    position: 'bottom-3 left-1/2 -translate-x-1/2 sm:bottom-8',
  },
];

export function CodepenInspirationSection() {
  return (
    <section className="relative overflow-hidden bg-background px-4 py-24 sm:px-8 lg:px-12">
      <div className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute left-1/2 top-0 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-aq-blue/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 h-[24rem] w-[24rem] -translate-x-1/2 rounded-full bg-violet-300/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-col gap-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-4"
        >
          <Badge className="w-fit bg-aq-blue/15 px-4 py-1 text-xs uppercase tracking-[0.2em] text-aq-blue">
            CodePen-inspired
          </Badge>
          <h2 className="max-w-3xl font-display text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
            Build components with UI libs,
            <span className="font-serif italic text-aq-blue">
              {' '}
              ship visual polish faster.
            </span>
          </h2>
          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
            This section recreates the feel of an experimental demo with
            reusable React building blocks and animated states.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-120px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto flex h-[34rem] w-full max-w-5xl items-center justify-center overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-b from-zinc-100/70 to-white/60 shadow-[0_24px_80px_rgba(16,24,40,0.12)] dark:from-zinc-900/90 dark:to-zinc-950/70"
        >
          <motion.div
            aria-hidden="true"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
            className="absolute h-[26rem] w-[26rem] rounded-full border border-aq-blue/25"
          />
          <motion.div
            aria-hidden="true"
            animate={{ rotate: -360 }}
            transition={{ duration: 22, ease: 'linear', repeat: Infinity }}
            className="absolute h-[20rem] w-[20rem] rounded-full border border-aq-blue/20"
          />
          <motion.div
            aria-hidden="true"
            animate={{ rotate: 360 }}
            transition={{ duration: 16, ease: 'linear', repeat: Infinity }}
            className="absolute h-[14rem] w-[14rem] rounded-full border border-aq-blue/30"
          />

          <Card className="relative z-20 w-[16rem] border-aq-blue/25 bg-background/85 p-6 text-center backdrop-blur">
            <p className="text-xs uppercase tracking-[0.18em] text-aq-blue">
              UI Playground
            </p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight">
              Component Orbit
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Motion + primitives, composed as production-ready UI.
            </p>
          </Card>

          {orbitCards.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-120px' }}
                transition={{ delay: 0.2 + index * 0.12, duration: 0.45 }}
                className={`absolute ${item.position}`}
              >
                <Card className="w-[15rem] border-border/60 bg-background/90 p-4 shadow-md backdrop-blur sm:w-[16rem]">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-aq-blue/15 text-aq-blue">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </div>
                  <h4 className="text-sm font-semibold">{item.title}</h4>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {item.copy}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
