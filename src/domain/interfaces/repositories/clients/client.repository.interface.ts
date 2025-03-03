import { Client } from 'src/domain/entities/clients/client.entity';

/**
 * Interface that defines repository operations for the Client entity.
 *
 * This interface is responsible for abstracting CRUD operations (Create, Read, Update, Delete)
 * related to clients in the database.
 */
export interface IClientRepository {
  /**
   * Finds a client based on the provided API key.
   *
   * @param apiKey - The API key of the client to be found.
   * @returns {Promise<Client | null>} A promise that resolves to the client corresponding to the API key or null if not found.
   */
  findByApiKey(apiKey: string): Promise<Client | null>;

  /**
   * Finds a client based on the provided ID.
   *
   * @param id - The ID of the client to be found.
   * @returns {Promise<Client | null>} A promise that resolves to the client corresponding to the ID or null if not found.
   */
  findById(id: string): Promise<Client | null>;

  /**
   * Creates a new client in the system.
   *
   * @param client - The client to be created.
   * @returns {Promise<Client>} A promise that resolves to the created client.
   */
  create(client: Client): Promise<Client>;

  /**
   * Updates an existing client in the system.
   *
   * @param client - The client with updated data.
   * @returns {Promise<Client>} A promise that resolves to the updated client.
   */
  update(client: Client): Promise<Client>;

  /**
   * Deletes a client based on the provided ID.
   *
   * @param id - The ID of the client to be deleted.
   * @returns {Promise<void>} A promise that resolves when the client is deleted.
   */
  delete(id: string): Promise<void>;
}
