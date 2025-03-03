import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { GlobalExceptionFilter } from './infrastructure/http/filters/global-exception.filter';

/**
 * The bootstrap function is the entry point for the NestJS application.
 * It is responsible for initializing the application and setting up all necessary configurations,
 * including global filters, Swagger API documentation, and loading environment variables.
 *
 * @function bootstrap
 * @returns {Promise<void>} A promise that resolves when the application has started successfully.
 */
async function bootstrap() {
  // Create an instance of the application using the AppModule
  const app = await NestFactory.create(AppModule);

  // Access the ConfigService to load configuration values
  const configService = app.get(ConfigService);

  // Retrieve the port number from the configuration or use the default (3000)
  const portApp = configService.get<number>('APP_PORT') || 3000;

  // Apply global exception filter for centralized error handling
  app.useGlobalFilters(new GlobalExceptionFilter());

  // Configure Swagger for API documentation
  const config = new DocumentBuilder()
    .setTitle('API-MQ')
    .setDescription('API-MQ - Message Queue Management for Message Servers')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  // Generate Swagger document and setup Swagger UI endpoint
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Start the application server and listen on the specified port
  await app.listen(portApp);
}

bootstrap();
