'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronDown,
  Compass,
  Mail,
  Phone,
  TrendingUp,
  User,
} from 'lucide-react';
import { useRef, useState, useTransition, useCallback, useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { requestAtelierInvitation } from '@/lib/actions/atelier-invitation';
import { cn } from '@/lib/utils';
import { sanitizeEmail, validateEmail } from '@/lib/utils/form-validation';

// ─── Step definitions ──────────────────────────────────────────────────────────

interface AtelierStep {
  id: string;
  question: string;
  hint?: string;
  icon: React.ReactNode;
  type: 'email' | 'tel' | 'text' | 'select';
  placeholder?: string;
  required: boolean;
  options?: { value: string; label: string }[];
  validate?: (value: string) => string | null;
}

const STEPS: AtelierStep[] = [
  {
    id: 'email',
    question: 'What is your email address?',
    hint: 'We will send your invitation here.',
    icon: <Mail className="h-6 w-6" />,
    type: 'email',
    placeholder: 'you@brand.com',
    required: true,
    validate: (v) =>
      v && !validateEmail(v) ? 'Please enter a valid email address.' : null,
  },
  {
    id: 'entity_name',
    question: 'What is the name of your brand or studio?',
    hint: 'Your label, atelier, or creative entity.',
    icon: <Building2 className="h-6 w-6" />,
    type: 'text',
    placeholder: 'Maison Leila, Studio Nour…',
    required: true,
    validate: (v) =>
      v && v.trim().length < 2 ? 'Name must be at least 2 characters.' : null,
  },
  {
    id: 'whatsapp',
    question: 'Your WhatsApp number?',
    hint: 'Optional — for a faster personal welcome.',
    icon: <Phone className="h-6 w-6" />,
    type: 'tel',
    placeholder: '+212 6XX XXX XXX',
    required: false,
  },
  {
    id: 'role',
    question: 'How would you describe yourself?',
    icon: <User className="h-6 w-6" />,
    type: 'select',
    required: true,
    options: [
      { value: 'Brand', label: 'Fashion Brand / Retailer' },
      { value: 'Designer', label: 'Independent Designer' },
      { value: 'Stylist', label: 'Stylist / Creative Director' },
      { value: 'Ecommerce', label: 'E-Commerce Seller' },
      { value: 'Photographer', label: 'Fashion Photographer' },
      { value: 'Other', label: 'Other' },
    ],
  },
  {
    id: 'revenue_range',
    question: 'What is your monthly revenue range?',
    hint: 'Optional — helps us tailor your onboarding.',
    icon: <TrendingUp className="h-6 w-6" />,
    type: 'select',
    required: false,
    options: [
      { value: 'pre-revenue', label: 'Pre-revenue / Starting out' },
      { value: '0-10k', label: 'Under 10 000 DH' },
      { value: '10k-50k', label: '10 000 – 50 000 DH' },
      { value: '50k-250k', label: '50 000 – 250 000 DH' },
      { value: '250k+', label: '250 000 DH +' },
    ],
  },
  {
    id: 'referral_source',
    question: 'How did you hear about ANAQIO?',
    hint: 'Optional.',
    icon: <Compass className="h-6 w-6" />,
    type: 'select',
    required: false,
    options: [
      { value: 'Instagram', label: 'Instagram' },
      { value: 'LinkedIn', label: 'LinkedIn' },
      { value: 'Word of mouth', label: 'Word of mouth' },
      { value: 'Press / Media', label: 'Press / Media' },
      { value: 'Search', label: 'Google / Search' },
      { value: 'Other', label: 'Other' },
    ],
  },
];

// ─── Animation variants ────────────────────────────────────────────────────────

const slideVariants = {
  enter: (dir: number) => ({
    y: dir > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: { y: 0, opacity: 1 },
  exit: (dir: number) => ({
    y: dir > 0 ? -60 : 60,
    opacity: 0,
  }),
};

const transition = { duration: 0.35, ease: [0.32, 0, 0.18, 1] as const };

// ─── Component ────────────────────────────────────────────────────────────────

export function AtelierInvitationForm() {
  const [stepIndex, setStepIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [values, setValues] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);

  const step = STEPS[stepIndex];
  const totalSteps = STEPS.length;
  const progress = (stepIndex / totalSteps) * 100;

  // Auto-focus input when step changes
  useEffect(() => {
    const timeout = setTimeout(() => {
      inputRef.current?.focus();
      selectRef.current?.focus();
    }, 380);
    return () => clearTimeout(timeout);
  }, [stepIndex]);

  const currentValue = values[step.id] ?? '';

  const validateCurrent = useCallback((): string | null => {
    if (step.required && !currentValue.trim()) {
      return `This field is required.`;
    }
    return step.validate?.(currentValue) ?? null;
  }, [step, currentValue]);

  const advance = useCallback(() => {
    const err = validateCurrent();
    if (err) {
      setError(err);
      return;
    }
    setError(null);
    if (stepIndex < totalSteps - 1) {
      setDirection(1);
      setStepIndex((i) => i + 1);
    }
  }, [validateCurrent, stepIndex, totalSteps]);

  const goBack = useCallback(() => {
    if (stepIndex > 0) {
      setError(null);
      setDirection(-1);
      setStepIndex((i) => i - 1);
    }
  }, [stepIndex]);

  const handleChange = (value: string) => {
    setValues((prev) => ({ ...prev, [step.id]: value }));
    setError(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && step.type !== 'select') {
      e.preventDefault();
      if (stepIndex === totalSteps - 1) {
        handleSubmit();
      } else {
        advance();
      }
    }
  };

  const handleSubmit = () => {
    const err = validateCurrent();
    if (err) {
      setError(err);
      return;
    }
    setError(null);

    const formData = new FormData();
    formData.append('source', 'early-access');
    Object.entries(values).forEach(([key, value]) => {
      if (key === 'email') {
        formData.append(key, sanitizeEmail(value));
      } else {
        formData.append(key, value);
      }
    });

    startTransition(async () => {
      const result = await requestAtelierInvitation(formData);
      if (result.success) {
        setSubmitted(true);
      } else {
        setError(result.message);
      }
    });
  };

  const isLastStep = stepIndex === totalSteps - 1;

  // ── Success state ────────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.32, 0, 0.18, 1] }}
        className="flex flex-col items-center gap-6 py-12 text-center"
      >
        <div className="flex h-20 w-20 items-center justify-center rounded-full border border-aq-blue/20 bg-aq-blue/10">
          <CheckCircle2 className="h-10 w-10 text-aq-blue" />
        </div>
        <div className="max-w-sm space-y-3">
          <h2 className="font-cormorant text-3xl font-semibold text-foreground">
            Your request is received
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            We review each application personally. You will hear from us soon.
          </p>
        </div>
      </motion.div>
    );
  }

  // ── Form ─────────────────────────────────────────────────────────────────────
  return (
    <div className="flex w-full flex-col gap-0">
      {/* Progress bar */}
      <div className="relative h-[2px] w-full overflow-hidden rounded-full bg-border/30">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-aq-blue to-aq-purple"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>

      {/* Step counter */}
      <div className="mt-4 flex items-center justify-between px-1">
        <span className="text-xs font-medium tabular-nums text-muted-foreground/60">
          {stepIndex + 1} / {totalSteps}
        </span>
        {!step.required && (
          <button
            type="button"
            onClick={advance}
            className="text-xs text-muted-foreground/50 transition-colors hover:text-muted-foreground"
          >
            Skip →
          </button>
        )}
      </div>

      {/* Slide area */}
      <div className="relative mt-8 min-h-[260px] overflow-hidden sm:min-h-[240px]">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={step.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={transition}
            className="flex flex-col gap-6"
          >
            {/* Question */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 text-aq-blue/70">
                {step.icon}
                {step.hint && (
                  <span className="text-xs text-muted-foreground/60">
                    {step.hint}
                  </span>
                )}
              </div>
              <h2 className="font-cormorant text-3xl font-medium leading-snug text-foreground sm:text-4xl">
                {step.question}
              </h2>
            </div>

            {/* Input */}
            <div className="flex flex-col gap-2" onKeyDown={handleKeyDown}>
              {step.type === 'select' ? (
                <div className="relative">
                  <select
                    ref={selectRef}
                    value={currentValue}
                    onChange={(e) => {
                      handleChange(e.target.value);
                      // Auto-advance on select
                      if (e.target.value) {
                        setError(null);
                        setTimeout(() => {
                          if (isLastStep) {
                            handleSubmit();
                          } else {
                            setDirection(1);
                            setStepIndex((i) => i + 1);
                          }
                        }, 320);
                      }
                    }}
                    disabled={isPending}
                    className={cn(
                      'h-14 w-full appearance-none rounded-xl border bg-background/40 px-5 pr-10',
                      'text-base text-foreground shadow-sm transition-colors',
                      'focus:border-aq-blue/50 focus:outline-none',
                      'disabled:cursor-not-allowed disabled:opacity-50',
                      currentValue ? 'border-aq-blue/30' : 'border-border/40',
                      error && 'border-destructive/50'
                    )}
                  >
                    <option value="" disabled>
                      Select an option…
                    </option>
                    {step.options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground/50" />
                </div>
              ) : (
                <Input
                  ref={inputRef}
                  type={step.type}
                  value={currentValue}
                  onChange={(e) => handleChange(e.target.value)}
                  placeholder={step.placeholder}
                  disabled={isPending}
                  autoComplete={
                    step.type === 'email'
                      ? 'email'
                      : step.type === 'tel'
                        ? 'tel'
                        : 'off'
                  }
                  className={cn(
                    'h-14 rounded-xl border-border/40 bg-background/40 px-5 text-base',
                    'placeholder:text-muted-foreground/30',
                    'transition-all focus:border-aq-blue/50',
                    currentValue && 'border-aq-blue/30',
                    error && 'border-destructive/50'
                  )}
                />
              )}

              {/* Error */}
              <AnimatePresence>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="ml-1 text-xs font-medium text-destructive"
                    role="alert"
                  >
                    {error}
                  </motion.p>
                )}
              </AnimatePresence>

              {/* Enter hint — only for text/email/tel */}
              {step.type !== 'select' && (
                <p className="ml-1 text-xs text-muted-foreground/40">
                  Press{' '}
                  <kbd className="rounded border border-border/40 px-1 py-px font-mono text-[10px]">
                    Enter ↵
                  </kbd>{' '}
                  to continue
                </p>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="mt-8 flex items-center justify-between gap-3">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={goBack}
          disabled={stepIndex === 0 || isPending}
          className="h-12 w-12 rounded-xl text-muted-foreground disabled:opacity-0"
          aria-label="Previous question"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>

        {step.type !== 'select' && (
          <Button
            type="button"
            variant="brand"
            onClick={isLastStep ? handleSubmit : advance}
            disabled={isPending}
            className="h-12 flex-1 rounded-xl text-base font-semibold shadow-lg shadow-aq-blue/20 sm:flex-none sm:px-10"
          >
            {isPending ? (
              'Sending…'
            ) : isLastStep ? (
              'Request Invitation'
            ) : (
              <span className="flex items-center gap-2">
                Continue
                <ArrowRight className="h-4 w-4" />
              </span>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
