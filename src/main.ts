import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

/**
 * Function to bootstrap the application by creating a NestJS instance and setting the port.
 */
async function bootstrap() {
  const portApp = Number(process.env.PORT_APP) || 3000;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('API-MQ')
    .setDescription('API-MQ - Message Queue Management for Messaging Servers')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(portApp);
}
bootstrap();
