import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ILoggerService } from 'src/domain/interfaces/services/logger/logger.service.interface';
import { createLogger, transports, format, Logger } from 'winston';
import * as ElasticsearchTransport from 'winston-elasticsearch';
import * as apm from 'elastic-apm-node';

/**
 * LoggerService is a custom implementation of ILoggerService that handles logging operations.
 * It uses Winston for logging and integrates with Elasticsearch for centralized log storage.
 *
 * **Features**:
 * - Logs messages with different severity levels (info, error, warn).
 * - Sends logs to the console and Elasticsearch.
 * - Supports integration with Elastic APM for performance monitoring.
 *
 * @constructor
 * @param configService - Provides application configuration values such as Elasticsearch host and port.
 */
@Injectable()
export class LoggerService implements ILoggerService {
  private readonly logger: Logger;

  constructor(private readonly configService: ConfigService) {
    const esTransport = new ElasticsearchTransport.ElasticsearchTransport({
      level: 'info',
      clientOpts: {
        node: `http://${this.configService.get('ELASTICSEARCH_HOST')}:${this.configService.get('ELASTICSEARCH_PORT')}`,
      },
      indexPrefix: 'app-logs',
      apm,
    });

    this.logger = createLogger({
      format: format.combine(format.timestamp(), format.json()),
      transports: [new transports.Console(), esTransport],
    });
  }

  /**
   * Logs an informational message.
   *
   * @param message - The message to log.
   * @param context - Optional context for the log message.
   * @returns {Promise<void>} - A promise that resolves when the log is completed.
   */
  async log(message: string, context?: string): Promise<void> {
    this.logger.info({ message, context });
  }

  /**
   * Logs an error message.
   *
   * @param message - The error message to log.
   * @param trace - Optional stack trace to include with the error.
   * @param context - Optional context for the error.
   * @returns {Promise<void>} - A promise that resolves when the error is logged.
   */
  async error(
    message: string,
    trace?: string,
    context?: string,
  ): Promise<void> {
    this.logger.error({ message, trace, context });
  }

  /**
   * Logs a warning message.
   *
   * @param message - The warning message to log.
   * @param context - Optional context for the warning.
   * @returns {Promise<void>} - A promise that resolves when the warning is logged.
   */
  async warn(message: string, context?: string): Promise<void> {
    this.logger.warn({ message, context });
  }
}
