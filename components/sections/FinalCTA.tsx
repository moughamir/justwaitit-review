'use client';

import { motion } from 'framer-motion';

import { Button } from '@/components/ui/button';

const FinalCTA = () => {
  return (
    <section className="bg-gradient-dark relative overflow-hidden py-32">
      {/* Background glow */}
      <div className="bg-primary/8 absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[100px]" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-10"
          >
            <h2 className="text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
              Join the Evolution of
              <br />
              <span className="text-gradient-primary">Fashion Production</span>
            </h2>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button variant="hero" size="xl">
                Start Creating
              </Button>
              <Button variant="heroOutline" size="xl">
                Request a Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="container mx-auto mt-32 px-6">
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border/30 pt-8 md:flex-row">
          <img
            src="/brand/anaqio-typography-logo.svg"
            alt="ANAQIO"
            className="h-8 w-auto opacity-50 invert"
          />
          <p className="text-sm text-muted-foreground/50">
            © {new Date().getFullYear()} ANAQIO. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
