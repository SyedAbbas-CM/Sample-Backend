/** Core dependencies */
import { Module } from '@nestjs/common';

/** Local dependencies */
import { MqttService } from './mqtt.service';

import { MqttController } from './mqtt.controller';

import { MqttClientService } from 'src/common/services';

@Module({
  controllers: [MqttController],
  providers: [MqttService, MqttClientService],
  exports: [MqttService],
})
export class MqttModule {}
