import { ConfigService } from '@nestjs/config';
import { BadRequestException } from '@nestjs/common';

/**
 * Gets the MongoDB connection configuration using the environment variables.
 * @param configService The ConfigService instance to access configuration values.
 * @returns {Promise<{ uri: string }>} The MongoDB URI used to connect to the database.
 */
export const getDatabaseConfig = (configService: ConfigService) => {
  const dbHost = configService.get<string>('DATABASE_HOST');
  const dbPort = configService.get<string>('DATABASE_PORT');
  const dbName = configService.get<string>('DATABASE_NAME');
  const dbUser = configService.get<string>('DATABASE_USER');
  const dbPass = configService.get<string>('DATABASE_PASS');

  // Security checks to ensure all required environment variables are present
  if (!dbHost || !dbPort || !dbName || !dbUser || !dbPass) {
    throw new BadRequestException(
      'Database configuration is missing required environment variables',
    );
  }

  return {
    uri: `mongodb://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}?authSource=admin`,
  };
};
