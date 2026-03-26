'use client';

import { AnimatePresence, motion } from 'framer-motion';
import {
  Building2,
  Compass,
  Mail,
  Phone,
  TrendingUp,
  User,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import {
  useRef,
  useState,
  useTransition,
  useCallback,
  useEffect,
  useMemo,
} from 'react';

import { AtelierNav } from './atoms/atelier-nav';
import { AtelierProgressBar } from './atoms/atelier-progress-bar';
import { AtelierQuestion } from './atoms/atelier-question';
import { AtelierSelectInput } from './atoms/atelier-select-input';
import { AtelierStepCounter } from './atoms/atelier-step-counter';
import { AtelierSuccess } from './atoms/atelier-success';
import { AtelierTextInput } from './atoms/atelier-text-input';

import { requestAtelierInvitation } from '@/lib/actions/atelier-invitation';
import { ATELIER_STEP_CONFIGS } from '@/lib/content/atelier-invitation';
import { sanitizeEmail, validateEmail } from '@/lib/utils/form-validation';

const ICONS = {
  Mail: <Mail className="h-6 w-6" />,
  Building2: <Building2 className="h-6 w-6" />,
  Phone: <Phone className="h-6 w-6" />,
  User: <User className="h-6 w-6" />,
  TrendingUp: <TrendingUp className="h-6 w-6" />,
  Compass: <Compass className="h-6 w-6" />,
} as const;

const SLIDE_VARIANTS = {
  enter: (dir: number) => ({ y: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { y: 0, opacity: 1 },
  exit: (dir: number) => ({ y: dir > 0 ? -60 : 60, opacity: 0 }),
};

const SLIDE_TRANSITION = { duration: 0.35, ease: [0.32, 0, 0.18, 1] as const };

// ─── Component ────────────────────────────────────────────────────────────────

export function AtelierInvitationForm() {
  const t = useTranslations('atelierInvitation');

  // Pre-build per-step translated content once (avoids dynamic key access)
  const stepContent = useMemo(
    () => [
      {
        question: t('steps.email.question'),
        hint: t('steps.email.hint'),
        placeholder: t('steps.email.placeholder'),
        errorRequired: t('steps.email.errors.required'),
        errorInvalid: t('steps.email.errors.invalid'),
        options: [] as { value: string; label: string }[],
      },
      {
        question: t('steps.entity_name.question'),
        hint: t('steps.entity_name.hint'),
        placeholder: t('steps.entity_name.placeholder'),
        errorRequired: t('steps.entity_name.errors.required'),
        errorTooShort: t('steps.entity_name.errors.tooShort'),
        options: [] as { value: string; label: string }[],
      },
      {
        question: t('steps.whatsapp.question'),
        hint: t('steps.whatsapp.hint'),
        placeholder: t('steps.whatsapp.placeholder'),
        errorRequired: '',
        options: [] as { value: string; label: string }[],
      },
      {
        question: t('steps.role.question'),
        hint: '',
        placeholder: '',
        errorRequired: t('steps.role.errors.required'),
        options: [
          { value: 'Brand', label: t('steps.role.options.Brand') },
          { value: 'Designer', label: t('steps.role.options.Designer') },
          { value: 'Stylist', label: t('steps.role.options.Stylist') },
          { value: 'Ecommerce', label: t('steps.role.options.Ecommerce') },
          {
            value: 'Photographer',
            label: t('steps.role.options.Photographer'),
          },
          { value: 'Other', label: t('steps.role.options.Other') },
        ],
      },
      {
        question: t('steps.revenue_range.question'),
        hint: t('steps.revenue_range.hint'),
        placeholder: '',
        errorRequired: '',
        options: [
          {
            value: 'pre-revenue',
            label: t('steps.revenue_range.options.pre-revenue'),
          },
          { value: '0-10k', label: t('steps.revenue_range.options.0-10k') },
          { value: '10k-50k', label: t('steps.revenue_range.options.10k-50k') },
          {
            value: '50k-250k',
            label: t('steps.revenue_range.options.50k-250k'),
          },
          { value: '250k+', label: t('steps.revenue_range.options.250k+') },
        ],
      },
      {
        question: t('steps.referral_source.question'),
        hint: t('steps.referral_source.hint'),
        placeholder: '',
        errorRequired: '',
        options: [
          {
            value: 'Instagram',
            label: t('steps.referral_source.options.Instagram'),
          },
          {
            value: 'LinkedIn',
            label: t('steps.referral_source.options.LinkedIn'),
          },
          {
            value: 'Word of mouth',
            label: t('steps.referral_source.options.Word of mouth'),
          },
          {
            value: 'Press / Media',
            label: t('steps.referral_source.options.Press / Media'),
          },
          { value: 'Search', label: t('steps.referral_source.options.Search') },
          { value: 'Other', label: t('steps.referral_source.options.Other') },
        ],
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [] // t is stable; memoize once on mount
  );

  const [stepIndex, setStepIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [values, setValues] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();

  const inputRef = useRef<HTMLInputElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);

  const config = ATELIER_STEP_CONFIGS[stepIndex];
  const content = stepContent[stepIndex];
  const totalSteps = ATELIER_STEP_CONFIGS.length;
  const progress = (stepIndex / totalSteps) * 100;
  const isLastStep = stepIndex === totalSteps - 1;
  const currentValue = values[config.id] ?? '';

  // Auto-focus when step changes
  useEffect(() => {
    const timer = setTimeout(() => {
      inputRef.current?.focus();
      selectRef.current?.focus();
    }, 380);
    return () => clearTimeout(timer);
  }, [stepIndex]);

  const validateCurrent = useCallback((): string | null => {
    if (config.required && !currentValue.trim()) {
      return content.errorRequired || t('ui.fieldRequired');
    }
    if (
      config.type === 'email' &&
      currentValue &&
      !validateEmail(currentValue)
    ) {
      return (
        (content as (typeof stepContent)[0]).errorInvalid ??
        t('ui.fieldRequired')
      );
    }
    if (
      config.type === 'text' &&
      currentValue &&
      currentValue.trim().length < 2
    ) {
      return (
        (content as (typeof stepContent)[1]).errorTooShort ??
        t('ui.fieldRequired')
      );
    }
    return null;
  }, [config, content, currentValue, t]);

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

  const handleChange = useCallback(
    (value: string) => {
      setValues((prev) => ({ ...prev, [config.id]: value }));
      setError(null);
    },
    [config.id]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && config.type !== 'select') {
      e.preventDefault();
      if (isLastStep) {
        handleSubmit();
      } else {
        advance();
      }
    }
  };

  const handleSubmit = useCallback(() => {
    const err = validateCurrent();
    if (err) {
      setError(err);
      return;
    }
    setError(null);

    const formData = new FormData();
    formData.append('source', 'early-access');
    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, key === 'email' ? sanitizeEmail(value) : value);
    });

    startTransition(async () => {
      const result = await requestAtelierInvitation(formData);
      if (result.success) {
        setSubmitted(true);
      } else {
        setError(result.message);
      }
    });
  }, [validateCurrent, values, startTransition]);

  const handleSelectChange = useCallback(
    (value: string) => {
      handleChange(value);
      if (!value) return;
      setError(null);
      setTimeout(() => {
        if (isLastStep) {
          handleSubmit();
        } else {
          setDirection(1);
          setStepIndex((i) => i + 1);
        }
      }, 320);
    },
    [handleChange, handleSubmit, isLastStep]
  );

  if (submitted) {
    return (
      <AtelierSuccess
        title={t('success.title')}
        description={t('success.desc')}
      />
    );
  }

  return (
    <div className="flex w-full flex-col gap-0">
      <AtelierProgressBar progress={progress} />

      <AtelierStepCounter
        current={stepIndex + 1}
        total={totalSteps}
        isOptional={!config.required}
        skipLabel={t('ui.skip')}
        onSkip={isLastStep ? handleSubmit : advance}
      />

      {/* Slide area */}
      <div className="relative mt-8 min-h-[260px] overflow-hidden sm:min-h-[240px]">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={config.id}
            custom={direction}
            variants={SLIDE_VARIANTS}
            initial="enter"
            animate="center"
            exit="exit"
            transition={SLIDE_TRANSITION}
            className="flex flex-col gap-6"
          >
            <AtelierQuestion
              icon={ICONS[config.iconName]}
              hint={content.hint || undefined}
              question={content.question}
            />

            {config.type === 'select' ? (
              <AtelierSelectInput
                ref={selectRef}
                value={currentValue}
                options={content.options}
                placeholder={t('ui.selectPlaceholder')}
                disabled={isPending}
                hasError={!!error}
                error={error}
                onChange={handleSelectChange}
              />
            ) : (
              <AtelierTextInput
                ref={inputRef}
                type={config.type}
                value={currentValue}
                placeholder={content.placeholder || undefined}
                disabled={isPending}
                hasError={!!error}
                error={error}
                enterHint={t('ui.enterHint')}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <AtelierNav
        isFirstStep={stepIndex === 0}
        isLastStep={isLastStep}
        isSelectStep={config.type === 'select'}
        isPending={isPending}
        prevAriaLabel={t('ui.prevAriaLabel')}
        continueLabel={t('ui.continue')}
        submitLabel={t('ui.requestInvitation')}
        sendingLabel={t('ui.sending')}
        onBack={goBack}
        onContinue={isLastStep ? handleSubmit : advance}
      />
    </div>
  );
}
