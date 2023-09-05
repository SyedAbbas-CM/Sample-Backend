import { Test, TestingModule } from '@nestjs/testing';
import { StripeCheckoutService } from './stripe-checkout.service';

describe('StripeCheckoutService', () => {
  let service: StripeCheckoutService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StripeCheckoutService],
    }).compile();

    service = module.get<StripeCheckoutService>(StripeCheckoutService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
