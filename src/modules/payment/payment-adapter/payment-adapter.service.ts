import { Injectable } from '@nestjs/common';
import { ConflictException, NotImplementedException } from '@nestjs/common/exceptions';
import { ThirdPartyPaymentServices } from '../enums';
import { Constants } from 'src/common/constants';
import { ConfirmPaymentData, CreateCustomerUserData, CreatePaymentIntentData, CreateStripeCustomer } from '../thirdparty/stripe/types';
import { AttachMethodCustomerData } from '../thirdparty/stripe/types/attach-method-customer-data.type';
import { StripePaymentIntentService } from '../thirdparty';
import { RegisterPaymentMethodDto } from '../dto/register-payment-method.dto';
import Stripe from 'stripe';
import { StripeCustomerType } from '../thirdparty/stripe/types/stripe-customer-schema.type';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import { UserType } from 'src/modules/users/types';



/** DRY-KISS Payment adaptee method */
const paymentAdapteeMethod = {
    addUser: {
        stripe: 'createStripeCustomer',
    },
    startPaymentProcess: {
        stripe: 'createPaymentIntent'
    },
    ConfirmPaymentData: {
        stripe: 'confirmPayment',
    },
    attachPaymentMethodToCustomer: {
        stripe: 'attachMethodToCustomer',
    },
    createPaymentMethodForCustomer: {
        stripe: 'createPaymentMethod'
    },
    getCustomerByIds: {
        stripe: 'getCustomerByUserAndCustomerId',
    },
    getPaymentMethodsList: {
        stripe: 'getPaymentMethodsList',
    }
}

/**
 * The Payment adapter is the path to hexagonal architecture implementation for utilizing third party payment services and
 * gateways.
 */
@Injectable()
export class PaymentAdapterService {

    method: ThirdPartyPaymentServices = ThirdPartyPaymentServices.Stripe;

    /**
     * Inject services with names mapped 1:1 with the {ThirdPartyPaymentServices} values.
     */
    constructor(
        private readonly stripe: StripePaymentIntentService,
    ) { }

    /**
     * Changes payment method
     */
    async setMethod(
        method: ThirdPartyPaymentServices
    ): Promise<void> {
        this.method = method;
    }

    async getCustomerByEmail(
        email: string
    ): Promise<Stripe.Customer> {
        return await this.stripe.getCustomerByEmail(email);
    }

    async addUser(
        data: CreateCustomerUserData,
        options: CreateStripeCustomer,
    ): Promise<StripeCustomerType & Document> {
        const isUserAlreadyCustomer = await this.getCustomerByEmail(data.email);

        if (isUserAlreadyCustomer)
            throw new ConflictException(Constants.ErrorMessages.STRIPE_CUSTOMER_ALREADY_EXISTS);

        /**
         * @note For help, In VS-Code, "CTRL+P" or "CMD+P" will let you open a file by path or name
         * @see {@link src\modules\payment\thirdparty\stripe\stripe.service.ts}
         */
        const added = await this.methodResolver(
            this.addUser.name,
            data,
            options,
        ) as StripeCustomerType & Document;

        return added;
    }

    async startPaymentProcess(
        data: CreatePaymentIntentData
    ): Promise<Stripe.Response<Stripe.PaymentIntent>> {
        /**
         * @note For help, In VS-Code, "CTRL+P" or "CMD+P" will let you open a file by path or name
         * @see {@link src\modules\payment\thirdparty\stripe\stripe.service.ts}
         */
        const startedPaymentObject = await this.methodResolver(
            this.startPaymentProcess.name,
            data,
        ) as Stripe.Response<Stripe.PaymentIntent>;

        return startedPaymentObject;
    }

    async createPaymentMethodForCustomer(
        data: RegisterPaymentMethodDto
    ): Promise<Stripe.Response<Stripe.PaymentMethod>> {
        /**
         * @note For help, In VS-Code, "CTRL+P" or "CMD+P" will let you open a file by path or name
         * @see {@link src\modules\payment\thirdparty\stripe\stripe-payment-intent.service.ts}
         */
        const paymentCreatedObject = await this.methodResolver(
            this.createPaymentMethodForCustomer.name,
            data,
        ) as Stripe.Response<Stripe.PaymentMethod>;

        return paymentCreatedObject;
    }

    async attachPaymentMethodToCustomer(
        data: AttachMethodCustomerData
    ): Promise<Stripe.Response<Stripe.PaymentMethod>> {
        /**
        * @note For help, In VS-Code, "CTRL+P" or "CMD+P" will let you open a file by path or name
        * @see {@link src\modules\payment\thirdparty\stripe\stripe-payment-intent.service.ts}
        */
        const attachedPaymentMethodObject = await this.methodResolver(
            this.attachPaymentMethodToCustomer.name,
            data,
        ) as Stripe.Response<Stripe.PaymentMethod>;

        return attachedPaymentMethodObject;
    }

    async getPaymentMethodsList(
        data: Partial<RegisterPaymentMethodDto>,
    ): Promise<Array<Stripe.PaymentMethod>> {
        /**
        * @note For help, In VS-Code, "CTRL+P" or "CMD+P" will let you open a file by path or name
        * @see {@link src\modules\payment\thirdparty\stripe\stripe-payment-intent.service.ts}
        */
        const attachedPaymentMethodObject = await this.methodResolver(
            this.getPaymentMethodsList.name,
            data,
        ) as Array<Stripe.PaymentMethod>;

        return attachedPaymentMethodObject;
    }


    async confirmPaymentProcess(
        data: ConfirmPaymentData
    ): Promise<Stripe.Response<Stripe.PaymentIntent>> {
        const confirmedPaymentObject = await this.methodResolver(
            this.confirmPaymentProcess.name,
            data,
        ) as Stripe.Response<Stripe.PaymentIntent>;

        return confirmedPaymentObject;
    }

    async getCustomerByIds(
        data: Partial<UserType> & Partial<CreatePaymentDto>
    ): Promise<StripeCustomerType & Partial<Document> | null> {
        const existingCustomer = await this.methodResolver(
            this.getCustomerByIds.name,
            data,
        ) as (StripeCustomerType & Partial<Document> | null);

        return existingCustomer;
    }

    async methodResolver(
        methodKeyInAdapteeMap: string,
        data: CreateCustomerUserData
            | CreatePaymentIntentData
            | AttachMethodCustomerData
            | ConfirmPaymentData
            | RegisterPaymentMethodDto
            | AttachMethodCustomerData
            | (Partial<UserType> & Partial<CreatePaymentDto>),
        options?: CreateStripeCustomer
    ): Promise<
        (StripeCustomerType & Document | null)
        | (StripeCustomerType & Partial<Document> | null)
        | Stripe.Response<
            Stripe.PaymentIntent
            | Stripe.PaymentIntent
            | Stripe.PaymentMethod
        >
        | Array<Stripe.PaymentMethod>
    > {
        const methodToUse = paymentAdapteeMethod
        [methodKeyInAdapteeMap]
        [this.method];

        if (!methodToUse)
            throw new NotImplementedException(Constants.ErrorMessages.PAYMENT_METHOD_NOT_SETUP);

        if (!options)
            return await this
            [this.method] // takes in the current method eg, stripe etc, services are imported 1:1 with the same name
            [methodToUse]( // Method of the service to use
                data
            );

        return await this
        [this.method] // takes in the current method eg, stripe etc, services are imported 1:1 with the same name
        [methodToUse]( // Method of the service to use
            data,
            options,
        );
    }
}
