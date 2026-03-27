type LogMetadata = Record<string, unknown>;

/**
 * Structured logger utility to replace direct console calls.
 * This ensures logs are consistent and can be easily redirected to
 * external logging services in the future.
 */
export const logger = {
  /**
   * Log a warning message with optional metadata.
   */
  warn: (message: string, metadata?: LogMetadata) => {
    console.warn(
      JSON.stringify({
        level: 'warn',
        message,
        timestamp: new Date().toISOString(),
        ...metadata,
      })
    );
  },

  /**
   * Log an error message with error details and optional metadata.
   */
  error: (message: string, error?: unknown, metadata?: LogMetadata) => {
    const errorDetails =
      error instanceof Error
        ? {
            name: error.name,
            message: error.message,
            stack: error.stack,
          }
        : error;

    console.error(
      JSON.stringify({
        level: 'error',
        message,
        timestamp: new Date().toISOString(),
        error: errorDetails,
        ...metadata,
      })
    );
  },
};
