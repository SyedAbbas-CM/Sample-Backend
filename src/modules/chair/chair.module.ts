import { Module } from '@nestjs/common';
import { ChairService } from './chair.service';
import { ChairController } from './chair.controller';
import { ModelsModule } from 'src/database/mongoose';
import { MqttModule } from '../mqtt/mqtt.module';

@Module({
  controllers: [ChairController],
  providers: [ChairService],
  imports: [ModelsModule, MqttModule],
})
export class ChairModule {}
