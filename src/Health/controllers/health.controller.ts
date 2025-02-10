import { Controller, Get } from '@nestjs/common';
import { HealthService } from '../services/health.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

/**
 * @Controller - Defines the controller responsible for system health check.
 * This controller exposes a `GET /health` endpoint that verifies the system's health.
 * It checks if the system is working correctly and responds accordingly.
 *
 * @ApiTags('Health') - Adds a Swagger tag to group routes related to system health.
 */
@ApiTags('Health')
@Controller('health') // Defines the base route for health checks
export class HealthController {
  /**
   * @constructor - Injects the HealthService, which contains the logic to determine the system's health.
   * @param healthService - The service responsible for determining the health status of the system.
   */
  constructor(private readonly healthService: HealthService) {}

  /**
   * @Get() - Defines the HTTP GET endpoint for `/health`.
   * This method calls the HealthService to retrieve the health status of the system.
   * It responds with the current system health, typically used for monitoring purposes.
   *
   * @ApiOperation - Describes the operation of this endpoint for Swagger, giving details about its purpose.
   * @ApiResponse - Specifies the status code and description in Swagger to represent the health check result.
   *
   * @returns {string} The system health status, indicating if the system is running as expected.
   */
  @Get()
  @ApiOperation({ summary: 'Checks the system health status.' })
  @ApiResponse({ status: 200, description: 'Healthy system', type: String })
  getHealthCheck(): string {
    return this.healthService.getHealthCheck();
  }
}
