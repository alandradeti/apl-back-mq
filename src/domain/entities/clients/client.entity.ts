/**
 * Represents a client entity.
 *
 * This class is used to define a client in the system, containing
 * essential information such as the client's name, API key, and optional ID.
 */
export class Client {
  /**
   * Creates an instance of the Client class.
   *
   * @param name - The name of the client.
   * @param apiKey - The API key associated with the client.
   * @param id - (Optional) The unique identifier of the client. This is typically generated when the client is created.
   */
  constructor(
    public readonly name: string, // The name of the client
    public readonly apiKey: string, // The API key associated with the client
    public readonly id?: string, // The unique identifier of the client (optional)
  ) {}
}
