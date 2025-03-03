import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MqModule } from './infrastructure/externals/mq/modules/mq.module';
import { DatabaseModule } from './infrastructure/externals/database/modules/database.module';
import { AuthenticateClientModule } from './infrastructure/modules/authenticate-client/authenticate-client.module';
import { ClientModule } from './presentation/modules/clients/client.module';
import { LoggerModule } from './infrastructure/externals/logger/modules/logger.module';
import { ClientPersistenceModule } from './infrastructure/persistence/modules/clients/client-persistence.module';

/**
 * The root module of the application.
 *
 * This module serves as the entry point for bootstrapping the entire application.
 * It imports and organizes other feature modules to provide a cohesive structure for the application.
 *
 * The AppModule includes various imported modules, such as:
 * - ConfigModule: for global configuration.
 * - LoggerModule: for logging infrastructure.
 * - DatabaseModule: for database connectivity and interactions.
 * - ClientModule: for handling client-related business logic.
 * - ClientPersistenceModule: for managing client data persistence.
 * - AuthenticateClientModule: for authentication functionality.
 * - MqModule: for managing message queues.
 *
 * By organizing the application into these feature modules, AppModule serves as a central hub for initializing the application and its dependencies.
 *
 * @Module - Defines the root module of the application.
 */
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    LoggerModule,
    DatabaseModule,
    ClientModule,
    ClientPersistenceModule,
    AuthenticateClientModule,
    MqModule,
  ],
})
export class AppModule {}
