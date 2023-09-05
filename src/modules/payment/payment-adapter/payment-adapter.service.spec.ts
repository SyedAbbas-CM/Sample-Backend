import { Test, TestingModule } from '@nestjs/testing';
import { PaymentAdapterService } from './payment-adapter.service';

describe('PaymentAdapterService', () => {
  let service: PaymentAdapterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentAdapterService],
    }).compile();

    service = module.get<PaymentAdapterService>(PaymentAdapterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
