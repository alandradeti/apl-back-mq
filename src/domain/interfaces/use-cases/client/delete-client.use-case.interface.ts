/**
 * Interface for the DeleteClient Use Case.
 *
 * This interface defines the method to delete a client.
 */
export interface IDeleteClientUseCase {
  /**
   * Executes the deletion of a client by its ID.
   *
   * @param id - The ID of the client to be deleted.
   * @returns {Promise<void>} - A promise that resolves when the client is deleted.
   */
  execute(id: string): Promise<void>;
}
