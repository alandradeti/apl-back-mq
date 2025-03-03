import { UpdateClientDTO } from 'src/application/dtos/client/update-client.dto';
import { Client } from 'src/domain/entities/clients/client.entity';

/**
 * Interface for the UpdateClient Use Case.
 *
 * This interface defines the method to update a client by its ID.
 */
export interface IUpdateClientUseCase {
  /**
   * Executes the update of a client by its ID.
   *
   * @param id - The ID of the client to be updated.
   * @param dto - The data transfer object containing the updated client details.
   * @returns {Promise<Client | null>} - A promise that resolves with the updated client or null if the client was not found.
   */
  execute(id: string, dto: UpdateClientDTO): Promise<Client | null>;
}
