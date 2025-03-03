import { Inject } from '@nestjs/common';
import { IClientRepository } from 'src/domain/interfaces/repositories/clients/client.repository.interface';
import { Client } from 'src/domain/entities/clients/client.entity';
import { UpdateClientDTO } from '../../dtos/client/update-client.dto';
import { IUpdateClientUseCase } from '../../../domain/interfaces/use-cases/client/update-client.use-case.interface';
import { ILoggerService } from 'src/domain/interfaces/services/logger/logger.service.interface';
import { generateApiKey } from 'src/infrastructure/utils/api-key.util';

/**
 * Use case for updating a client's information in the system.
 *
 * This use case handles the process of updating an existing client's information.
 * It generates a new API key, updates the client in the repository, and logs all actions.
 */
export class UpdateClientUseCase implements IUpdateClientUseCase {
  constructor(
    @Inject('IClientRepository')
    private readonly clientRepository: IClientRepository,
    @Inject('ILoggerService')
    private readonly logger: ILoggerService,
  ) {}

  /**
   * Executes the process of updating a client's information.
   * Generates a new API key, updates the client in the repository,
   * and logs the relevant actions.
   *
   * @param id - The ID of the client to be updated.
   * @param updateClientDto - The DTO containing the updated client information.
   * @returns {Promise<Client | null>} - The updated client entity, or null if the client doesn't exist.
   */
  async execute(
    id: string,
    updateClientDto: UpdateClientDTO,
  ): Promise<Client | null> {
    // Log the start of API key generation
    this.logger.log('Generating a new API key');
    const apiKey = generateApiKey();
    this.logger.log('API key generated');

    // Create a new client entity with the provided data and new API key
    const client = new Client(id, updateClientDto.name, apiKey);

    // Log the update process
    this.logger.log('Updating client information');
    const updatedClient = await this.clientRepository.update(client);
    this.logger.log('Client updated successfully');

    return updatedClient;
  }
}
