/**
 * Interface for the Logger service.
 *
 * This interface defines the methods for logging various types of messages such as
 * info, error, and warnings. Implementations of this interface can be used for logging
 * in a centralized manner throughout the application.
 */
export interface ILoggerService {
  /**
   * Logs an informational message asynchronously.
   *
   * @param message - The message to log.
   * @param context - (Optional) The context in which the log message was generated, such as the name of the service or module.
   * @returns {Promise<void>} A promise that resolves when the log is written.
   */
  log(message: string, context?: string): Promise<void>;

  /**
   * Logs an error message asynchronously.
   *
   * @param message - The error message to log.
   * @param trace - (Optional) The stack trace of the error, useful for debugging.
   * @param context - (Optional) The context in which the error occurred.
   * @returns {Promise<void>} A promise that resolves when the error log is written.
   */
  error(message: string, trace?: string, context?: string): Promise<void>;

  /**
   * Logs a warning message asynchronously.
   *
   * @param message - The warning message to log.
   * @param context - (Optional) The context in which the warning was triggered.
   * @returns {Promise<void>} A promise that resolves when the warning log is written.
   */
  warn(message: string, context?: string): Promise<void>;
}
