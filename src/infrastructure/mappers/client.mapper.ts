import { ClientDocument } from 'src/infrastructure/persistence/schemas/clients/client.schema';
import { Client } from '../../domain/entities/clients/client.entity';

/**
 * Maps a ClientDocument (from the database) to a Client entity.
 *
 * This function takes a `ClientDocument` object, which is a representation of a client in the database,
 * and maps it to a `Client` entity used within the business logic layer of the application.
 *
 * @param clientDoc - The document retrieved from the database, representing a client.
 * @returns {Promise<Client>} - A new instance of the `Client` entity, created from the provided document.
 */
export function mapClient(clientDoc: ClientDocument): Client {
  return new Client(clientDoc._id.toString(), clientDoc.name, clientDoc.apiKey);
}
