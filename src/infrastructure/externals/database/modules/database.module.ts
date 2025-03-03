import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getDatabaseConfig } from 'src/infrastructure/externals/database/config/database.config';
import { MongoRepository } from 'src/infrastructure/persistence/repositories/mongo/mongo.repository';

/**
 * DatabaseModule is responsible for configuring the MongoDB connection
 * and providing the database repository as a service.
 *
 * This module imports the `ConfigModule` for reading environment
 * variables and the `MongooseModule` for connecting to MongoDB.
 *
 * It also provides a custom repository (`MongoRepository`) that is
 * used for database operations.
 */
@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        getDatabaseConfig(configService), // Fetches the database config using ConfigService
    }),
  ],
  providers: [
    {
      provide: 'IDatabaseRepository',
      useClass: MongoRepository,
    },
  ],
  exports: [MongooseModule, 'IDatabaseRepository'],
})
export class DatabaseModule {}
