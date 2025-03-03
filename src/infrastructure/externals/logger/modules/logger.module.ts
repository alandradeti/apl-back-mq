import { Module } from '@nestjs/common';
import { LoggerService } from '../services/logger.service';

/**
 * LoggerModule is responsible for providing logging services throughout the application.
 *
 * This module provides the `ILoggerService`, which is implemented by the `LoggerService` class.
 * The `ILoggerService` can be injected into other parts of the application where logging is required.
 *
 * **Exports**:
 * - Exports the `ILoggerService` so it can be used in other modules.
 */
@Module({
  providers: [
    {
      provide: 'ILoggerService',
      useClass: LoggerService,
    },
  ],
  exports: ['ILoggerService'],
})
export class LoggerModule {}
