import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { HealthModule } from '../health.module';

/**
 * Test suite for the HealthController.
 * This test suite ensures that the HealthController is properly handling requests and returning the expected responses.
 *
 * @describe - A test suite for the `HealthController`, testing the health check endpoint.
 */
describe('HealthController', () => {
  let app: INestApplication;

  /**
   * Before all tests, set up the NestJS application and initialize the HealthController.
   * This method creates a testing module, compiles it, and initializes the application.
   *
   * @beforeAll - Runs before any test in the suite to set up the application context.
   */
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [HealthModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  /**
   * Test case to verify the `/health` endpoint.
   * This test sends a GET request to the `/health` route and expects:
   * - A 200 HTTP status code.
   * - The response body to be 'OK', indicating that the API is running properly.
   *
   * @it - Describes the behavior of the `/health` GET endpoint.
   */
  it('/health (GET)', () => {
    return request(app.getHttpServer())
      .get('/health')
      .expect(200)
      .expect('API - apl-back-mq is running!');
  });

  /**
   * After all tests, close the application to clean up.
   * This ensures that any resources used by the app during testing are properly released.
   *
   * @afterAll - Runs after all tests to close the app and clean up resources.
   */
  afterAll(async () => {
    if (app) {
      await app.close();
    }
  });
});
