import { Module } from '@nestjs/common';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';
import { ClientSchema } from '../../schemas/clients/client.schema';
import { ClientRepositoryAdapter } from 'src/infrastructure/adapters/clients/client.repository.adapter';
import { MongoRepository } from '../../repositories/mongo/mongo.repository';

/**
 * Module for client persistence.
 *
 * This module is responsible for managing the persistence of client data in MongoDB.
 * It registers the necessary schemas, provides repository classes for handling client
 * data operations, and exports the client repository for use in other parts of the application.
 *
 * @module ClientPersistenceModule
 */
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Client', schema: ClientSchema }]), // Registers the Client schema with Mongoose
  ],
  providers: [
    {
      provide: 'IDatabaseRepository',
      useFactory: (clientModel) => new MongoRepository(clientModel), // Factory for creating an instance of MongoRepository
      inject: [getModelToken('Client')],
    },
    {
      provide: 'IClientRepository',
      useClass: ClientRepositoryAdapter,
    },
  ],
  exports: ['IClientRepository'],
})
export class ClientPersistenceModule {}
