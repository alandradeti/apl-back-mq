import { ApiProperty } from '@nestjs/swagger';

/**
 * Data Transfer Object (DTO) for client authentication.
 *
 * This class is used to define the structure of the data expected from the client
 * during the authentication process. The API key provided will be used to retrieve
 * the authentication token for the client.
 *
 * @example
 * {
 *   "apiKey": "15048f9e-0b12-4661-8d53-22e06871eeba"
 * }
 */
export class AuthenticateClientDTO {
  /**
   * The API key for retrieving the authentication token.
   *
   * This value is used to identify and authenticate the client. It is typically
   * a unique string that ensures the client has the necessary permissions to request
   * a token.
   *
   * @example '15048f9e-0b12-4661-8d53-22e06871eeba'
   */
  @ApiProperty({
    description: 'API key for retrieving the authentication token',
    example: '15048f9e-0b12-4661-8d53-22e06871eeba',
  })
  apiKey: string;
}
