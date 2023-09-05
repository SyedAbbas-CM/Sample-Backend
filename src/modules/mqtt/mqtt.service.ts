/** Core dependencies */
import { Injectable } from '@nestjs/common';

/** Local dependencies and libraries */
import { MqttClientService } from 'src/common/services';

@Injectable()
export class MqttService {
  constructor(private readonly mqtt: MqttClientService) { }

  testService = async (): Promise<void> => {
    const connection = await this.mqtt.getClient();

    connection.on('message', (topic, message) => {
      console.log(topic, ': ', message.toString());
    });

    connection.subscribe('test');

    connection.publish('test', 'test/1');

    connection.unsubscribe('test');
  };
}
