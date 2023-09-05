import { Injectable } from '@nestjs/common';
import { StripeService } from '../stripe.service';
import { CreatePaymentIntentData } from '../types';

@Injectable()
export class StripeCheckoutService extends StripeService {

    /**
     * @todo Complete implementation for Payment Links if required
     */
    async createPaymentLink(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        data: CreatePaymentIntentData,
    ): Promise<boolean> {
        /**
         * @todo Look into Links if required, is a bit costlier but more simple
         */
        return false;
    }
}
