import { Test, TestingModule } from '@nestjs/testing';
import { ChairService } from './chair.service';

describe('ChairService', () => {
  let service: ChairService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChairService],
    }).compile();

    service = module.get<ChairService>(ChairService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
