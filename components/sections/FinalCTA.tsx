'use client';

import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';

const FinalCTA = () => {
  return (
    <section className="bg-secondary-surface relative overflow-hidden py-32">
      {/* Background glow */}
      <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-aq-blue/10 blur-[100px]" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-10"
          >
            <h2 className="text-4xl font-bold leading-tight text-secondary-foreground md:text-5xl lg:text-6xl">
              Join the Evolution of
              <br />
              <span className="text-brand-gradient">Fashion Production</span>
            </h2>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                variant="hero"
                size="xl"
                onClick={() =>
                  document
                    .getElementById('waitlist')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                Join the Waitlist
              </Button>
              <Button
                variant="heroOutline"
                size="xl"
                onClick={() =>
                  document
                    .getElementById('how-it-works')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                See How It Works
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
