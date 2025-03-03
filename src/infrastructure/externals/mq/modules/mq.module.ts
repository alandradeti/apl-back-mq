import { Module } from '@nestjs/common';
import { MqService } from '../services/mq.service';
import { MqController } from 'src/presentation/controllers/mq/mq.controller';
import { LoggerModule } from '../../logger/modules/logger.module';

@Module({
  imports: [LoggerModule],
  providers: [MqService],
  controllers: [MqController],
})
export class MqModule {}
