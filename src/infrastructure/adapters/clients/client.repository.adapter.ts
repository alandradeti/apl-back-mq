import { IDatabaseRepository } from 'src/domain/interfaces/repositories/database/database.repository.interface';
import { Client } from 'src/domain/entities/clients/client.entity';
import { IClientRepository } from 'src/domain/interfaces/repositories/clients/client.repository.interface';
import { Inject } from '@nestjs/common';

/**
 * Adapter class for the Client repository.
 *
 * This class adapts the IDatabaseRepository interface to the IClientRepository interface,
 * implementing CRUD operations for the Client entity using the database repository.
 */
export class ClientRepositoryAdapter implements IClientRepository {
  constructor(
    @Inject('IDatabaseRepository')
    protected readonly databaseRepository: IDatabaseRepository<Client>,
  ) {}

  /**
   * Finds a client by its API key.
   *
   * @param apiKey - The API key of the client to find.
   * @returns {Promise<Client | null>} - A promise that resolves with the client or null if not found.
   */
  async findByApiKey(apiKey: string): Promise<Client | null> {
    return this.databaseRepository.findOne({ apiKey });
  }

  /**
   * Finds a client by its ID.
   *
   * @param id - The ID of the client to find.
   * @returns {Promise<Client | null>} - A promise that resolves with the client or null if not found.
   */
  async findById(id: string): Promise<Client | null> {
    return this.databaseRepository.findById(id);
  }

  /**
   * Creates a new client.
   *
   * @param client - The client entity to create.
   * @returns {Promise<Client>} - A promise that resolves with the created client.
   */
  async create(client: Client): Promise<Client> {
    return this.databaseRepository.insert(client);
  }

  /**
   * Updates an existing client.
   *
   * @param client - The client entity to update.
   * @returns {Promise<Client>} - A promise that resolves with the updated client.
   */
  async update(client: Client): Promise<Client> {
    return this.databaseRepository.update(client.id, client);
  }

  /**
   * Deletes a client by its ID.
   *
   * @param id - The ID of the client to delete.
   * @returns {Promise<void>} - A promise that resolves once the client is deleted.
   */
  async delete(id: string): Promise<void> {
    return this.databaseRepository.delete(id);
  }
}
