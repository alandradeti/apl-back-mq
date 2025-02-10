import { Module } from '@nestjs/common';
import { HealthModule } from './Health/health.module';

/**
 * Main module of the application that imports and organizes other modules.
 * This module is responsible for bootstrapping the application by bringing together different feature modules.
 *
 * @Module - Defines the root module of the application.
 * It imports the `HealthModule`, which is responsible for providing health check functionality.
 */
@Module({
  imports: [HealthModule],
})
export class AppModule {}
