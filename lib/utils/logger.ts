import { maskPII } from '@/lib/analytics';

/**
 * Structured logger utility.
 * Outputs JSON strings with automated PII masking.
 * Uses console.warn for 'info' and 'warn' levels to comply with ESLint.
 */

type LogLevel = 'info' | 'warn' | 'error';
type LogContext = Record<string, unknown>;

const PII_FIELDS = ['email', 'full_name', 'name', 'phone', 'whatsapp', 'phoneNumber'];

/**
 * Masks PII in the context object recursively.
 * Uses optimized for loop as per project performance guidelines.
 */
function sanitize(ctx: LogContext): LogContext {
  const res: LogContext = {};
  const keys = Object.keys(ctx);

  for (let i = 0; i < keys.length; i++) {
    const k = keys[i];
    const v = ctx[k];

    if (PII_FIELDS.includes(k) && typeof v === 'string') {
      res[k] = maskPII(v);
    } else if (v !== null && typeof v === 'object' && !Array.isArray(v)) {
      res[k] = sanitize(v as LogContext);
    } else {
      res[k] = v;
    }
  }

  return res;
}

function log(level: LogLevel, message: string, context?: LogContext) {
  const entry: Record<string, unknown> = {
    timestamp: new Date().toISOString(),
    level,
    message,
  };

  if (context) {
    entry.context = sanitize(context);
  }

  const output = JSON.stringify(entry);

  if (level === 'error') {
    console.error(output);
  } else {
    // console.warn is used for info/warn levels to satisfy repository ESLint rules
    console.warn(output);
  }
}

export const logger = {
  info: (message: string, context?: LogContext) => log('info', message, context),
  warn: (message: string, context?: LogContext) => log('warn', message, context),
  error: (message: string, context?: LogContext) => log('error', message, context),
};
