import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { AuthenticateClientController } from 'src/presentation/controllers/authenticate-client/authenticate-client.controller';
import { AuthenticateClientUseCase } from 'src/application/use-cases/authenticate-client/authenticate-client.use-case';
import { ClientPersistenceModule } from 'src/infrastructure/persistence/modules/clients/client-persistence.module';
import { LoggerModule } from 'src/infrastructure/externals/logger/modules/logger.module';

/**
 * Module for authenticating clients.
 *
 * This module handles the authentication process for clients by providing
 * the necessary use cases, controllers, and configuration related to JWT tokens.
 * It includes dependencies such as the client persistence module and logger module,
 * and it is responsible for generating and validating JWT tokens for clients.
 *
 * @module AuthenticateClientModule
 */
@Module({
  imports: [
    ConfigModule,
    ClientPersistenceModule,
    LoggerModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('TOKEN_EXPIRATION_TIME') || '1h',
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthenticateClientController],
  providers: [AuthenticateClientUseCase],
  exports: [JwtModule, AuthenticateClientUseCase],
})
export class AuthenticateClientModule {}
