/**
 * A structured logging utility for server-side actions and utilities.
 * Complies with project rules by using console.warn and console.error,
 * but provides a more structured and consistent output format.
 */

type LogContext = Record<string, unknown>;

class Logger {
  private format(level: string, message: string, context?: LogContext) {
    const timestamp = new Date().toISOString();
    const logObject = {
      timestamp,
      level,
      message,
      ...context,
    };

    if (process.env.NODE_ENV === 'production') {
      return JSON.stringify(logObject);
    }

    // In development, return a slightly more readable format while still being structured
    return `[${timestamp}] ${level.toUpperCase()}: ${message} ${
      context ? JSON.stringify(context, null, 2) : ''
    }`;
  }

  /**
   * Log an error message with optional error object or context
   */
  error(message: string, context?: LogContext) {
    console.error(this.format('error', message, context));
  }

  /**
   * Log a warning message with optional context
   */
  warn(message: string, context?: LogContext) {
    console.warn(this.format('warn', message, context));
  }

  /**
   * Log an info message with optional context
   */
  info(message: string, context?: LogContext) {
    // We use console.warn for info as well to comply with CLAUDE.md/AGENTS.md
    // which only allow console.warn and console.error
    console.warn(this.format('info', message, context));
  }
}

export const logger = new Logger();
