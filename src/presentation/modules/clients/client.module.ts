import { Module } from '@nestjs/common';
import { ClientController } from 'src/presentation/controllers/clients/client.controller';
import { CreateClientUseCase } from 'src/application/use-cases/clients/create-client.use-case';
import { UpdateClientUseCase } from 'src/application/use-cases/clients/update-client.use-case';
import { DeleteClientUseCase } from 'src/application/use-cases/clients/delete-client.use-case';
import { ClientPersistenceModule } from '../../../infrastructure/persistence/modules/clients/client-persistence.module';
import { LoggerModule } from 'src/infrastructure/externals/logger/modules/logger.module';

/**
 * The ClientModule encapsulates the logic for client management, including
 * creating, updating, and deleting clients. It consists of the following:
 * - Controllers for HTTP requests.
 * - Use Cases for handling the business logic.
 * - Persistence module for managing client data storage.
 * - Logger module for logging operations.
 *
 * The module is responsible for exposing the necessary methods to interact
 * with client data and organizing the use case logic.
 */
@Module({
  imports: [ClientPersistenceModule, LoggerModule],
  controllers: [ClientController],
  providers: [CreateClientUseCase, UpdateClientUseCase, DeleteClientUseCase],
  exports: [CreateClientUseCase, UpdateClientUseCase, DeleteClientUseCase],
})
export class ClientModule {}
