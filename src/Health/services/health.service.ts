import { Injectable } from '@nestjs/common';
import { HEALTH_CHECK_MESSAGE } from '../constants/health.constant';

/**
 * Health check service for the API.
 * This service is responsible for providing a status message that indicates
 * whether the API is running properly.
 * It is typically used in the health check endpoint to monitor the system's health.
 */
@Injectable()
export class HealthService {
  /**
   * Returns a health check message indicating the system's status.
   * This method is called by the health controller to respond to health check requests.
   *
   * @returns {string} A status message indicating that the API is running,
   * which is defined in the constant `HEALTH_CHECK_MESSAGE`.
   */
  getHealthCheck(): string {
    return HEALTH_CHECK_MESSAGE;
  }
}
