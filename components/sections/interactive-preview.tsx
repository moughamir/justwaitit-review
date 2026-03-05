'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Camera, MapPin, Zap } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

import { cn } from '@/lib/utils';

const vibes = [
  {
    id: 'sahara',
    name: 'Sahara Sunset',
    location: 'Merzouga, Morocco',
    image:
      'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=1200&q=80',
    color: '#ea580c',
  },
  {
    id: 'marrakech',
    name: 'Marrakech Riad',
    location: 'Medina, Marrakech',
    image:
      'https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=1200&q=80',
    color: '#c9a96e',
  },
  {
    id: 'atlas',
    name: 'Atlas Morning',
    location: 'High Atlas Mountains',
    image:
      'https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=1200&q=80',
    color: '#3b82f6',
  },
];

const garmentImage =
  'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=1000&q=80';

export function InteractivePreview() {
  const [selectedVibe, setSelectedVibe] = useState(vibes[0]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleVibeChange = (vibe: (typeof vibes)[0]) => {
    if (vibe.id === selectedVibe.id) return;

    setIsProcessing(true);
    setShowResult(false);
    setSelectedVibe(vibe);

    // Simulate AI Processing
    setTimeout(() => {
      setIsProcessing(false);
      setShowResult(true);
    }, 1500);
  };

  return (
    <div className="flex h-full w-full flex-col gap-6">
      {/* Preview Area */}
      <div className="glass-strong group relative flex-1 overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
        {/* Background Layer */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedVibe.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <Image
              src={selectedVibe.image}
              alt={selectedVibe.name}
              fill
              className="h-full w-full object-cover brightness-[0.8] grayscale-[0.2]"
            />
            <div className="absolute inset-0 bg-black/20" />
          </motion.div>
        </AnimatePresence>

        {/* Garment Layer */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative h-[80%] w-[80%]"
          >
            <Image
              src={garmentImage}
              alt="Fashion Garment"
              fill
              className={cn(
                'h-full w-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-1000',
                showResult ? 'contrast-110 brightness-110' : 'brightness-90'
              )}
            />

            {/* AI Lighting Effect */}
            <AnimatePresence>
              {showResult && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.4 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 mix-blend-overlay"
                  style={{ backgroundColor: selectedVibe.color }}
                />
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Processing Overlay */}
        <AnimatePresence>
          {isProcessing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-aq-ink/60 backdrop-blur-sm"
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="h-20 w-20 rounded-full border-2 border-aq-blue/20 border-t-aq-blue"
                />
                <Sparkles className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 animate-pulse text-aq-blue" />
              </div>
              <motion.p
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="mt-6 text-sm font-bold uppercase tracking-[0.3em] text-aq-blue"
              >
                AI Relighting...
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Info Label */}
        <div className="absolute bottom-6 left-6 z-10">
          <motion.div
            key={selectedVibe.id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="glass-card rounded-xl border-white/10 px-4 py-2"
          >
            <div className="flex items-center gap-2">
              <MapPin className="h-3 w-3 text-aq-blue" />
              <span className="text-[10px] font-bold uppercase tracking-widest">
                {selectedVibe.location}
              </span>
            </div>
          </motion.div>
        </div>

        {/* Studio Badge */}
        <div className="absolute right-6 top-6 z-10">
          <div className="glass-strong flex items-center gap-2 rounded-full border-white/10 px-3 py-1.5">
            <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
            <span className="text-[8px] font-bold uppercase tracking-tighter">
              Visual Engine v1.0
            </span>
          </div>
        </div>
      </div>

      {/* Controls Area */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
            <Camera className="h-3 w-3" /> Select Environment
          </h4>
          <span className="text-[10px] font-bold uppercase text-aq-blue">
            Real-time Preview
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {vibes.map((vibe) => (
            <button
              key={vibe.id}
              onClick={() => handleVibeChange(vibe)}
              disabled={isProcessing}
              aria-label={`Switch to ${vibe.name} environment`}
              className={cn(
                'group relative h-24 overflow-hidden rounded-2xl border-2 transition-all disabled:opacity-50',
                selectedVibe.id === vibe.id
                  ? 'scale-[0.98] border-aq-blue ring-4 ring-aq-blue/10'
                  : 'border-transparent opacity-60 hover:scale-[1.02] hover:opacity-100'
              )}
            >
              <Image
                src={vibe.image}
                className="h-full w-full object-cover"
                alt={vibe.name}
                fill
              />
              <div className="absolute inset-0 bg-black/40 transition-colors group-hover:bg-black/20" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-center">
                <span className="text-[10px] font-bold uppercase tracking-tight text-white">
                  {vibe.name}
                </span>
              </div>

              {selectedVibe.id === vibe.id && (
                <div className="absolute right-2 top-2">
                  <div className="flex h-4 w-4 items-center justify-center rounded-full bg-aq-blue shadow-lg">
                    <Zap className="h-2 w-2 fill-current text-white" />
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
