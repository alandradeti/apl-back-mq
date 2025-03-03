// src/application/dtos/mq/send-message.dto.ts
import { ApiProperty } from '@nestjs/swagger';

/**
 * Data Transfer Object (DTO) for sending a message to a message queue.
 *
 * This class defines the structure of the data required to send a message to
 * a message queue system. It includes connection details like server address,
 * port, username, password, virtual host, queue name, and the message content itself.
 *
 * @example
 * {
 *   "server": "localhost",
 *   "port": 5672,
 *   "user": "guest",
 *   "password": "password123",
 *   "vhost": "vhost_mq",
 *   "queue": "my_queue",
 *   "message": "Hello, world!"
 * }
 */
export class SendMessageDto {
  /**
   * The address of the server to connect to.
   *
   * This is the IP address or hostname of the server where the message queue system is hosted.
   * The application will use this to establish a connection with the server.
   *
   * @example 'localhost'
   */
  @ApiProperty({ description: 'Server address' })
  server: string;

  /**
   * The port number for connecting to the server.
   *
   * This is the port number used by the server to listen for incoming connections.
   * The default port can vary depending on the message queue system, but typically it is 5672 for many systems.
   *
   * @example 5672
   */
  @ApiProperty({ description: 'Server port', example: 5672 })
  port: number;

  /**
   * The username for authenticating with the server.
   *
   * This is the credential used to authenticate the client to the server.
   *
   * @example 'guest'
   */
  @ApiProperty({ description: 'Username' })
  user: string;

  /**
   * The password for accessing the server.
   *
   * This is the password associated with the username to authenticate the client.
   *
   * @example 'password123'
   */
  @ApiProperty({ description: 'Access password' })
  password: string;

  /**
   * The virtual host of the message queue system.
   *
   * A virtual host is an isolated environment within the message queue system used to organize
   * queues and exchanges. The virtual host must be specified to correctly route the message.
   *
   * @example 'vhost_mq'
   */
  @ApiProperty({
    description: 'Message queue virtual host',
    example: 'vhost_mq',
  })
  vhost: string;

  /**
   * The name of the message queue to send the message to.
   *
   * This is the queue to which the message will be sent. The application will publish the message
   * to the specified queue for processing by the consumer.
   *
   * @example 'my_queue'
   */
  @ApiProperty({ description: 'Queue name' })
  queue: string;

  /**
   * The message content to be sent.
   *
   * This is the actual message that will be placed in the message queue for further processing.
   * It can be any string value that needs to be communicated.
   *
   * @example 'Hello, world!'
   */
  @ApiProperty({ description: 'Message to be sent' })
  message: string;
}
