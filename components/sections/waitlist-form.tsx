"use client";

import { useState, useTransition } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { joinWaitlist } from "@/lib/actions/waitlist";
import { cn } from "@/lib/utils";

interface WaitlistFormProps {
  source: string;
  variant?: "simple" | "full";
  className?: string;
}

export function WaitlistForm({ source, variant = "full", className }: WaitlistFormProps) {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      try {
        const result = await joinWaitlist(formData);
        if (result.success) {
          setStatus("success");
          setMessage(result.message);
          (e.target as HTMLFormElement).reset();
        } else {
          setStatus("error");
          setMessage(result.message);
        }
      } catch {
        setStatus("error");
        setMessage("Something went wrong. Please try again.");
      }
    });
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="py-8 text-center space-y-4"
      >
        <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto">
          <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div className="space-y-2">
          <p className="text-xl font-bold text-foreground">You&apos;re on the list!</p>
          <p className="text-muted-foreground text-sm">{message}</p>
        </div>
      </motion.div>
    );
  }

  if (variant === "simple") {
    return (
      <form onSubmit={handleSubmit} className={cn("flex gap-2", className)}>
        <input type="hidden" name="source" value={source} />
        {/* Simple variant still needs role for validation, but we can default it or hide it if needed. 
            Actually the schema REQUIRES role. So simple variant might need to be more clever or we update schema.
            For now, let's keep simple variant minimal but compliant. */}
        <input type="hidden" name="full_name" value="Early Access User" />
        <input type="hidden" name="role" value="Other" />
        <Input
          type="email"
          name="email"
          placeholder="professional@email.com"
          required
          disabled={isPending}
          className="h-14 bg-background/50 border-white/10 rounded-xl px-6"
        />
        <Button variant="brand" className="h-14 px-8 rounded-xl shrink-0" disabled={isPending}>
          {isPending ? "Joining..." : "Get Access"}
        </Button>
        {status === "error" && (
          <p className="absolute -bottom-6 left-0 text-xs text-destructive">{message}</p>
        )}
      </form>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-5 relative z-10", className)}>
      <input type="hidden" name="source" value={source} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="full_name" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Name</label>
          <Input
            id="full_name"
            type="text"
            name="full_name"
            placeholder="Your name"
            required
            disabled={isPending}
            className="h-12 rounded-xl bg-background/40 border-white/10 placeholder:text-muted-foreground/30 focus:border-aq-blue/50 transition-all px-4"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Email</label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="professional@email.com"
            required
            disabled={isPending}
            className="h-12 rounded-xl bg-background/40 border-white/10 placeholder:text-muted-foreground/30 focus:border-aq-blue/50 transition-all px-4"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="role" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">What Best Describes You?</label>
        <select
          id="role"
          name="role"
          required
          defaultValue=""
          disabled={isPending}
          className="flex h-12 w-full rounded-xl border border-white/10 bg-background/40 px-4 py-2 text-sm shadow-sm transition-colors focus:border-aq-blue/50 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 appearance-none text-foreground"
        >
          <option value="" disabled>Select your role</option>
          <option value="Brand">Fashion Brand / Retailer</option>
          <option value="Stylist">Stylist / Creative</option>
          <option value="Seller">E-Commerce Seller</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="company" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Company (Optional)</label>
          <Input
            id="company"
            type="text"
            name="company"
            placeholder="Brand or Studio name"
            disabled={isPending}
            className="h-12 rounded-xl bg-background/40 border-white/10 placeholder:text-muted-foreground/30 focus:border-aq-blue/50 transition-all px-4"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="revenue_range" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Revenue (Optional)</label>
          <select
            id="revenue_range"
            name="revenue_range"
            defaultValue=""
            disabled={isPending}
            className="flex h-12 w-full rounded-xl border border-white/10 bg-background/40 px-4 py-2 text-sm shadow-sm transition-colors focus:border-aq-blue/50 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 appearance-none text-foreground"
          >
            <option value="">Monthly Revenue Range</option>
            <option value="0-10k">0 - 10k DH</option>
            <option value="10k-50k">10k - 50k DH</option>
            <option value="50k-250k">50k - 250k DH</option>
            <option value="250k+">250k DH+</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="aesthetic" className="text-xs font-bold uppercase tracking-widest text-muted-foreground ml-1">Desired Aesthetic (Optional)</label>
        <select
          id="aesthetic"
          name="aesthetic"
          defaultValue=""
          disabled={isPending}
          className="flex h-12 w-full rounded-xl border border-white/10 bg-background/40 px-4 py-2 text-sm shadow-sm transition-colors focus:border-aq-blue/50 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 appearance-none text-foreground"
        >
          <option value="">Select Aesthetic Preference</option>
          <option value="Modern Minimalist">Modern Minimalist</option>
          <option value="Traditional Moroccan">Traditional Moroccan</option>
          <option value="Luxury Editorial">Luxury Editorial</option>
          <option value="Streetwear">Streetwear</option>
          <option value="Avant-Garde">Avant-Garde</option>
        </select>
      </div>

      <Button
        type="submit"
        variant="brand"
        disabled={isPending}
        className="w-full h-14 rounded-xl text-base font-bold shadow-lg shadow-aq-blue/20"
      >
        {isPending ? "Securing your spot..." : "Secure Beta Access →"}
      </Button>

      {status === "error" && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-destructive font-medium text-center"
        >
          {message}
        </motion.p>
      )}
    </form>
  );
}
