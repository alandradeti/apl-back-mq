import { Module } from '@nestjs/common';
import { HealthService } from './services/health.service';
import { HealthController } from './controllers/health.controller';

/**
 * Health Module.
 * This module is responsible for providing the health check functionality.
 * It includes the HealthService for the logic and HealthController for handling HTTP requests.
 *
 * @Module - Declares the dependencies for the health check feature, including services and controllers.
 */
@Module({
  imports: [],
  controllers: [HealthController],
  providers: [HealthService],
})
export class HealthModule {}
