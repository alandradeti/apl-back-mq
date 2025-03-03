import { Inject, Injectable } from '@nestjs/common';
import { Connection, Channel, connect, MQException } from 'amqplib';
import { IMqService } from 'src/domain/interfaces/services/mq/mq.service.interface';
import { ILoggerService } from 'src/domain/interfaces/services/logger/logger.service.interface'; // Import ILoggerService

@Injectable()
export class MqService implements IMqService {
  private connection: Connection;
  private channel: Channel;

  constructor(
    @Inject('ILoggerService') private readonly logger: ILoggerService,
  ) {}

  async connectToServer(
    server: string,
    port: number,
    user: string,
    password: string,
    vhost: string,
  ): Promise<void> {
    const uri = `amqp://${user}:${password}@${server}:${port}/${vhost}`;
    this.logger.log(`Connecting to RabbitMQ server at ${server}`);
    try {
      this.connection = await connect(uri);
      this.channel = await this.connection.createChannel();
      this.logger.log(`Successfully connected to RabbitMQ server at ${server}`);
    } catch (error) {
      this.logger.error(
        `Failed to connect to RabbitMQ server at ${server}: ${error.message}`,
      );
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    try {
      this.logger.log('Disconnecting channel from MQ server');
      await this.channel.close();
      this.logger.log('Successfully disconnected channel from MQ server');
      this.logger.log('Disconnecting from MQ server');
      await this.connection.close();
      this.logger.log('Successfully disconnected from MQ server');
    } catch (error) {
      this.logger.error(
        `Failed to disconnect from RabbitMQ server: ${error.message}`,
      );
      throw new MQException(error.message);
    }
  }

  async queueExists(queue: string): Promise<void> {
    try {
      this.logger.log(`Checking if queue "${queue}" exists`);
      await this.channel.checkQueue(queue);
      this.logger.log(`Queue "${queue}" exists`);
    } catch (error) {
      this.logger.error(`Queue "${queue}" does not exist: ${error.message}`);
      throw new MQException(`The queue "${queue}" does not exist.`);
    }
  }

  async sendToQueue(queue: string, message: string): Promise<void> {
    try {
      await this.queueExists(queue);
      this.logger.log(`Sending message to queue "${queue}"`);
      this.channel.sendToQueue(queue, Buffer.from(message));
      this.logger.log(`Message sent to queue "${queue}" successfully`);
    } catch (error) {
      this.logger.error(
        `Failed to send message to queue "${queue}": ${error.message}`,
      );
      throw new MQException(
        `Failed to send message to queue "${queue}": ${error.message}`,
      );
    }
  }

  async receiveFromQueue(queue: string): Promise<string | null> {
    try {
      await this.queueExists(queue);
      this.logger.log(`Receiving message from queue "${queue}"`);
      const msg = await this.channel.get(queue, { noAck: true });
      if (msg) {
        this.logger.log(`Message received from queue "${queue}"`);
        return msg.content.toString();
      }
      this.logger.log(`No message in queue "${queue}"`);
      return null;
    } catch (error) {
      this.logger.error(
        `Failed to receive message from queue "${queue}": ${error.message}`,
      );
      throw new MQException(
        `Failed to receive message from queue "${queue}": ${error.message}`,
      );
    }
  }
}
