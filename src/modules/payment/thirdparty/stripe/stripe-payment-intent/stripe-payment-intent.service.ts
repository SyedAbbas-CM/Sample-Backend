import { Injectable } from '@nestjs/common';
import { StripeService } from '../stripe.service';
import { ConfirmPaymentData, CreatePaymentIntentData, AttachMethodCustomerData } from '../types';
import { Constants } from 'src/common/constants';
import { ResourceLockedException } from 'src/common/exceptions';
import Stripe from 'stripe';
import { PaymentMethodTypes } from 'src/modules/payment/enums';
import { capitalize } from 'src/utilities';
import { RegisterPaymentMethodDto } from 'src/modules/payment/dto/register-payment-method.dto';

@Injectable()
export class StripePaymentIntentService extends StripeService {

    async createPaymentMethod(
        data: RegisterPaymentMethodDto
    ): Promise<Stripe.Response<Stripe.PaymentMethod>> {
        const {
            paymentMethodType: type,
            paymentMethod: {
                ...cardDetails
            },
        } = data;

        const paymentMethodKey = capitalize(type);

        const method = await this.instance.paymentMethods.create({
            card: cardDetails,
            type: PaymentMethodTypes[paymentMethodKey],
        });

        return method;
    }

    async attachMethodToCustomer(
        data: AttachMethodCustomerData
    ): Promise<Stripe.Response<Stripe.PaymentMethod>> {
        const {
            customerId: customer,
            paymentMethodData: { id: paymentMethodId }
        } = data;

        const paymentMethodAttached = await this.instance.paymentMethods
            .attach(
                paymentMethodId,
                {
                    customer,
                });

        return paymentMethodAttached;
    }

    async getPaymentMethodsList(
        data: Partial<RegisterPaymentMethodDto>
    ): Promise<Array<Stripe.PaymentMethod>> {
        const { customerId: customer } = data;

        const { data: methodsListArray } = await this.instance.paymentMethods.list({ customer });

        return methodsListArray;
    }

    async createPaymentIntent(
        data: CreatePaymentIntentData,
    ): Promise<Stripe.Response<Stripe.PaymentIntent>> {
        const {
            user,
            payment,
        } = data;

        const getIntent = await this.cache.get(user._id);

        if (getIntent)
            throw new ResourceLockedException(Constants.ErrorMessages.PAYMENT_ALREADY_INPROGRESS);

        const {
            customerId: customer,
            paymentMethodId: payment_method,
            confirmation_method,
            ...rest
        } = payment;

        const paymentObject = {
            ...rest,
            customer,
            // payment_method,
        };

        const paymentIntent = await this.instance.paymentIntents.create(
            {
                ...paymentObject,
                automatic_payment_methods: {
                    enabled: true,
                }
            }
        );

        const cacheKey = [
            user._id,
            payment_method,
            confirmation_method,
        ]
            .join('-');

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const cached = await this.cache.set(
            cacheKey,
            paymentIntent,
            // setting 1 hour expiry
            (1000 * 60 * 60)
        )

        return paymentIntent;
    }

    async confirmPayment(
        data: ConfirmPaymentData,
    ): Promise<Stripe.Response<Stripe.PaymentIntent>> {
        const {
            paymentIntentId,
            paymentMethod
        } = data;

        const intent = await this.instance.paymentIntents
            .confirm(
                paymentIntentId, {
                payment_method: paymentMethod,
            });

        return intent;
    }
}
