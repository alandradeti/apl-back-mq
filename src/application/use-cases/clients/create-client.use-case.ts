import { Inject } from '@nestjs/common';
import { IClientRepository } from 'src/domain/interfaces/repositories/clients/client.repository.interface';
import { Client } from 'src/domain/entities/clients/client.entity';
import { CreateClientDTO } from '../../dtos/client/create-client.dto';
import { ICreateClientUseCase } from '../../../domain/interfaces/use-cases/client/create-client.use-case.interface';
import { ILoggerService } from 'src/domain/interfaces/services/logger/logger.service.interface';
import { generateApiKey } from 'src/infrastructure/utils/api-key.util';

/**
 * Use case for creating a new client in the system.
 *
 * This use case generates a new API key for the client, creates a client entity,
 * and then saves it to the repository.
 */
export class CreateClientUseCase implements ICreateClientUseCase {
  constructor(
    @Inject('IClientRepository')
    private readonly clientRepository: IClientRepository,
    @Inject('ILoggerService')
    private readonly logger: ILoggerService,
  ) {}

  /**
   * Executes the process of creating a new client.
   * Logs essential actions, including generating the API key and saving the client.
   *
   * @param createClientDto - DTO containing the client's information for creation.
   * @returns {Promise<Client>} The created client entity.
   */
  async execute(createClientDto: CreateClientDTO): Promise<Client> {
    // Log the generation of a new API key
    this.logger.log('Generating a new API key for the client.');
    const apiKey = generateApiKey();
    this.logger.log('API key generated successfully.');

    // Create a new client instance
    const client = new Client(createClientDto.name, apiKey);

    // Log client creation process
    this.logger.log('Creating a new client with the provided information.');

    // Save the new client to the repository
    const createdClient = await this.clientRepository.create(client);
    this.logger.log(
      'New client created and saved to the repository successfully.',
    );

    // Return the created client
    return createdClient;
  }
}
