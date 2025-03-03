import { AuthenticateClientDTO } from 'src/application/dtos/authenticate-client/authenticate-client.dto';

/**
 * Interface for the AuthenticateClient Use Case.
 *
 * This interface defines the method to authenticate a client.
 */
export interface IAuthenticateClientUseCase {
  /**
   * Executes the authentication of a client.
   *
   * @param dto - The authentication data transfer object containing the client's API key.
   * @returns {Promise<string | null>} - A promise that resolves with the authentication token if the client is authenticated, or null if not.
   */
  execute(dto: AuthenticateClientDTO): Promise<string | null>;
}
