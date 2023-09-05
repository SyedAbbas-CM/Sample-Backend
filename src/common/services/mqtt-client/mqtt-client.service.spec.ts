import { Test, TestingModule } from '@nestjs/testing';
import { MqttClientService } from './mqtt-client.service';

describe('MqttClientService', () => {
  let service: MqttClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MqttClientService],
    }).compile();

    service = module.get<MqttClientService>(MqttClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
