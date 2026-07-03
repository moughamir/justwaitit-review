import { maskPII } from '@/lib/analytics';

type LogLevel = 'info' | 'warn' | 'error';

const SENSITIVE_FIELDS = [
  'email',
  'full_name',
  'name',
  'phone',
  'whatsapp',
  'phoneNumber'
];

/**
 * Recursively masks sensitive PII fields in a context object.
 */
function maskContext(context: any): any {
  if (!context || typeof context !== 'object') {
    return context;
  }

  if (Array.isArray(context)) {
    return context.map(item => maskContext(item));
  }

  const maskedObj: Record<string, any> = {};

  for (const key in context) {
    if (Object.prototype.hasOwnProperty.call(context, key)) {
      const value = context[key];

      if (SENSITIVE_FIELDS.includes(key) && typeof value === 'string') {
        maskedObj[key] = maskPII(value);
      } else if (typeof value === 'object' && value !== null) {
        maskedObj[key] = maskContext(value);
      } else {
        maskedObj[key] = value;
      }
    }
  }

  return maskedObj;
}

function formatLogMessage(level: LogLevel, message: string, context?: Record<string, any>) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...(context ? { context: maskContext(context) } : {})
  };
  return JSON.stringify(logEntry);
}

export const logger = {
  info: (message: string, context?: Record<string, any>) => {
    console.warn(formatLogMessage('info', message, context));
  },
  warn: (message: string, context?: Record<string, any>) => {
    console.warn(formatLogMessage('warn', message, context));
  },
  error: (message: string, context?: Record<string, any>) => {
    console.error(formatLogMessage('error', message, context));
  }
};
