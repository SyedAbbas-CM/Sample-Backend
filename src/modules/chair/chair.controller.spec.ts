import { Test, TestingModule } from '@nestjs/testing';
import { ChairController } from './chair.controller';
import { ChairService } from './chair.service';

describe('ChairController', () => {
  let controller: ChairController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChairController],
      providers: [ChairService],
    }).compile();

    controller = module.get<ChairController>(ChairController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
