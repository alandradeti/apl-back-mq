import { CreateClientDTO } from 'src/application/dtos/client/create-client.dto';
import { Client } from 'src/domain/entities/clients/client.entity';

/**
 * Interface for the CreateClient Use Case.
 *
 * This interface defines the method to create a new client.
 */
export interface ICreateClientUseCase {
  /**
   * Executes the creation of a new client.
   *
   * @param dto - The data transfer object containing the details of the client to be created.
   * @returns {Promise<Client>} - A promise that resolves with the created client.
   */
  execute(dto: CreateClientDTO): Promise<Client>;
}
