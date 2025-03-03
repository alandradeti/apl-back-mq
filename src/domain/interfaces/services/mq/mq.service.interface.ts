/**
 * Interface for the Message Queue (MQ) service.
 *
 * This interface defines methods to establish a connection with the MQ server,
 * send and receive messages from queues, and check if a queue exists.
 */
export interface IMqService {
  /**
   * Establishes a connection to the MQ server.
   *
   * @param server - The server address.
   * @param port - The server port.
   * @param user - The user for authentication.
   * @param password - The password for authentication.
   * @param vhost - The virtual host of the RabbitMQ.
   * @returns {Promise<void>} - A promise that resolves when the connection is successfully established.
   */
  connectToServer(
    server: string,
    port: number,
    user: string,
    password: string,
    vhost: string,
  ): Promise<void>;

  /**
   * Disconnects from the MQ server.
   *
   * @returns {Promise<void>} - A promise that resolves when the disconnection is successful.
   */
  disconnect(): Promise<void>;

  /**
   * Checks if a queue exists on the MQ server.
   *
   * @param queue - The name of the queue to check.
   * @returns {Promise<void>} - A promise that resolves when the check is completed.
   */
  queueExists(queue: string): Promise<void>;

  /**
   * Sends a message to a queue on the MQ server.
   *
   * @param queue - The name of the queue.
   * @param message - The message to be sent.
   * @returns {Promise<void>} - A promise that resolves when the message is successfully sent.
   */
  sendToQueue(queue: string, message: string): Promise<void>;

  /**
   * Receives a message from a queue.
   *
   * @param queue - The name of the queue.
   * @returns {Promise<string | null>} - A promise that resolves with the received message or null if no message is available.
   */
  receiveFromQueue(queue: string): Promise<string | null>;
}
