import { Inject, NotFoundException } from '@nestjs/common';
import { IClientRepository } from 'src/domain/interfaces/repositories/clients/client.repository.interface';
import { IDeleteClientUseCase } from '../../../domain/interfaces/use-cases/client/delete-client.use-case.interface';
import { ILoggerService } from 'src/domain/interfaces/services/logger/logger.service.interface';

/**
 * Use case for deleting a client from the system.
 *
 * This use case performs the deletion of a client by their ID.
 * It logs the actions related to finding and deleting the client.
 */
export class DeleteClientUseCase implements IDeleteClientUseCase {
  constructor(
    @Inject('IClientRepository')
    private readonly clientRepository: IClientRepository,
    @Inject('ILoggerService')
    private readonly logger: ILoggerService,
  ) {}

  /**
   * Executes the process of deleting a client by their ID.
   * Logs the actions and throws a `NotFoundException` if the client is not found.
   *
   * @param id - The ID of the client to be deleted.
   * @returns {Promise<void>} - A promise indicating the completion of the deletion process.
   */
  async execute(id: string): Promise<void> {
    // Log the attempt to find the client by their ID
    this.logger.log(`Finding client with ID: ${id}`);

    const client = await this.clientRepository.findById(id);

    // If the client is not found, log and throw NotFoundException
    if (!client) {
      this.logger.log(`Client with ID: ${id} not found`);
      throw new NotFoundException('Client');
    }

    // Log successful client retrieval
    this.logger.log(`Client with ID: ${id} found`);

    // Log the deletion process
    this.logger.log(`Deleting client with ID: ${id}`);
    await this.clientRepository.delete(id);
    this.logger.log(`Client with ID: ${id} deleted successfully`);
  }
}
