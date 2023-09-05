import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { StripeService } from './thirdparty/stripe/stripe.service';
import { RedisCacheModule } from '../cache/cache.module';
import { PaymentAdapterService } from './payment-adapter/payment-adapter.service';
import { StripePaymentIntentService } from './thirdparty/stripe/stripe-payment-intent/stripe-payment-intent.service';
import { StripeCheckoutService } from './thirdparty/stripe/stripe-checkout/stripe-checkout.service';
import { ModelsModule } from 'src/database/mongoose';

@Module({
  controllers: [PaymentController],
  providers: [
    PaymentService,
    StripeService,
    PaymentAdapterService,
    StripePaymentIntentService,
    StripeCheckoutService,
  ],
  exports: [
    StripeService,
  ],
  imports: [
    RedisCacheModule,
    ModelsModule,
  ],
})
export class PaymentModule { }
