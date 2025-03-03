import { Inject, NotFoundException } from '@nestjs/common';
import { IClientRepository } from 'src/domain/interfaces/repositories/clients/client.repository.interface';
import { JwtService } from '@nestjs/jwt';
import { AuthenticateClientDTO } from 'src/application/dtos/authenticate-client/authenticate-client.dto';
import { IAuthenticateClientUseCase } from 'src/domain/interfaces/use-cases/authenticate-client/authenticate-client.use-case.interface';
import { ILoggerService } from 'src/domain/interfaces/services/logger/logger.service.interface';

/**
 * Use case for authenticating a client based on the provided API key.
 *
 * This use case verifies if the client exists based on the provided API key.
 * If the client is found, it generates a JWT token containing the client's ID and name.
 */
export class AuthenticateClientUseCase implements IAuthenticateClientUseCase {
  constructor(
    @Inject('IClientRepository')
    private readonly clientRepository: IClientRepository,
    private readonly jwtService: JwtService,
    @Inject('ILoggerService')
    private readonly logger: ILoggerService,
  ) {}

  /**
   * Executes the authentication process for the client using the provided API key.
   * Logs essential actions, including verifying the client and generating the token.
   *
   * @param authenticateClientDto - DTO containing the API key for client authentication.
   * @returns {Promise<string | null> } The generated JWT token if authentication is successful.
   */
  async execute(
    authenticateClientDto: AuthenticateClientDTO,
  ): Promise<string | null> {
    // Log the start of the authentication process
    this.logger.log('Authenticating client with the provided API key.');

    // Attempt to retrieve the client by their API key
    const client = await this.clientRepository.findByApiKey(
      authenticateClientDto.apiKey,
    );

    // If the client is not found, log the event and throw an exception
    if (!client) {
      this.logger.error(
        'Client not authenticated: API key is invalid or missing.',
      );
      throw new NotFoundException('Client not found');
    }

    // Log successful authentication
    this.logger.log('Client authenticated successfully.');

    // Prepare JWT payload
    const payload = {
      id: client.id,
      name: client.name,
    };

    // Generate the JWT token
    this.logger.log('Generating JWT token for the authenticated client.');
    const token = this.jwtService.sign(payload);
    this.logger.log('JWT token generated successfully.');

    // Return the generated token
    return token;
  }
}
