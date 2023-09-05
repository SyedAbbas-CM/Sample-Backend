import { Test, TestingModule } from '@nestjs/testing';
import { StripePaymentIntentService } from './stripe-payment-intent.service';

describe('StripePaymentIntentService', () => {
  let service: StripePaymentIntentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StripePaymentIntentService],
    }).compile();

    service = module.get<StripePaymentIntentService>(StripePaymentIntentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
