import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { ApiBody, ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/infrastructure/auth/guards/jwt-auth.guard';
import { SendMessageDto } from 'src/application/dtos/mq/send-message.dto';
import { ReceiveMessageDto } from 'src/application/dtos/mq/receive-message.dto';
import { MqService } from 'src/infrastructure/externals/mq/services/mq.service';

/**
 * Controller for managing message queue operations such as sending and receiving messages.
 * The routes are protected by JWT authentication.
 * @@ApiTags('mq') used to group the endpoints in the Swagger documentation
 */
@ApiBearerAuth()
@ApiTags('mq')
@Controller('mq')
@UseGuards(JwtAuthGuard)
export class MqController {
  constructor(private readonly mqService: MqService) {}

  /**
   * Sends a message to a specified queue.
   *
   * This endpoint requires authentication (JWT) and allows sending messages to the message queue
   * by providing connection details and message content.
   *
   * @param sendMessageDto - DTO containing the connection details and the message to send.
   * @returns {Promise<{ success: boolean }>} - A promise that resolves to an object indicating the success of the operation.
   */
  @Post('send')
  @ApiBody({ type: SendMessageDto })
  async sendMessage(
    @Body() sendMessageDto: SendMessageDto,
  ): Promise<{ success: boolean }> {
    await this.mqService.connectToServer(
      sendMessageDto.server,
      sendMessageDto.port,
      sendMessageDto.user,
      sendMessageDto.password,
      sendMessageDto.vhost,
    );
    await this.mqService.sendToQueue(
      sendMessageDto.queue,
      sendMessageDto.message,
    );
    await this.mqService.disconnect();
    return { success: true };
  }

  /**
   * Receives a message from a specified queue.
   *
   * This endpoint requires authentication (JWT) and allows receiving messages from the message queue
   * based on provided connection details and the queue name.
   *
   * @param receiveMessageDto - DTO containing the connection details and the queue to receive the message from.
   * @returns {Promise<{ message: string }>} - A promise that resolves to an object containing the received message.
   */
  @Post('receive')
  @ApiBody({ type: ReceiveMessageDto })
  async receiveMessage(
    @Body() receiveMessageDto: ReceiveMessageDto,
  ): Promise<{ message: string }> {
    await this.mqService.connectToServer(
      receiveMessageDto.server,
      receiveMessageDto.port,
      receiveMessageDto.user,
      receiveMessageDto.password,
      receiveMessageDto.vhost,
    );
    const message = await this.mqService.receiveFromQueue(
      receiveMessageDto.queue,
    );
    await this.mqService.disconnect();

    if (!message) {
      throw new Error('No message received from the queue');
    }

    return { message };
  }
}
