/** Core dependencies */
import { Injectable } from '@nestjs/common';



/** Third party dependencies */
import stripe from 'stripe';



/** Local dependencies, configuration & Declarations */
import { STRIPE_API_VERSION } from 'src/modules/payment/thirdparty/stripe/config';
import EnvironmentVariables from 'src/common/interfaces/environmentVariables';
import { CacheService } from 'src/modules/cache/cache.service';
import { UserType } from 'src/modules/users/types';
import { CreateStripeCustomer } from './types';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { StripeCustomerType } from './types/stripe-customer-schema.type';
import { StripeCustomer } from 'src/database/mongoose/schemas';
import { CreatePaymentDto } from '../../dto/create-payment.dto';



/** Application configuration & declarations */
const {
    STRIPE_SECRET_KEY,
} = process.env as EnvironmentVariables;


/**
 * @note GRX-55 | test - jira/github integration
 * New test
 */
@Injectable()
export class StripeService implements IStripeSerice {

    instance: stripe | undefined;

    constructor(
        public readonly cache: CacheService,
        @InjectModel(StripeCustomer.name) private readonly stripeCustomerModel: Model<StripeCustomerType>
    ) {
        if (!this.instance) {

            this.instance = new stripe(
                STRIPE_SECRET_KEY,
                {
                    apiVersion: STRIPE_API_VERSION
                });
        }

        /**
         * @note REMOVE after development of GRX-55
         * @note Test flow for automicatically removing customers after changes made
         * [GRX-55]{@link https://cloudprimero.atlassian.net/browse/GRX-55?atlOrigin=eyJpIjoiYzRlZmI0ZjI0N2MwNGQ5MTg0NmZmMjg4NWQzNzk5MjUiLCJwIjoiaiJ9}
         */
        // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
        // (async () => {
        //     const list = await this.instance.customers.list({ limit: 100 });
        //     console.log('Deleting Stripe data: ', list.data.length);
        //     for await (const data of list.data) {
        //         if (!data)
        //             continue;
        //         try {
        //             const deleted = await this.instance.customers.del(data.id);
        //             console.log(deleted);
        //         } catch (exc) {
        //             break;
        //         }
        //     }

        //     const deleted = await this.stripeCustomerModel.deleteMany({});

        //     console.log(deleted);
        // })()
    }

    async createStripeCustomer(
        data: UserType,
        options: CreateStripeCustomer,
    ): Promise<StripeCustomerType & Document> {
        const {
            _id,
            username,
            email,
            phone_number: phone,
        } = data;

        const {
            isGuest,
        } = options;

        const Customer = await this.instance.customers.create({
            name: username,
            email,
            phone,
        });

        if (!isGuest) {
            const key = ['stripe', username, Customer.id]
                .join('-');

            await this.cache.set(key, Customer, 0);
        }


        const newStripeCustomer = new this.stripeCustomerModel({
            ...Customer,
            userId: _id,
        });

        const saved = await newStripeCustomer.save();

        return saved;
    }

    async getCustomerByEmail(
        email: string
    ): Promise<stripe.Customer | null> {
        const customersList = await this.instance.customers.list({ email });

        const [customer] = customersList.data;

        return customer || null;
    }

    async getCustomerByUserAndCustomerId(
        data: UserType & CreatePaymentDto
    ): Promise<StripeCustomerType & Partial<Document> | null> {

        const {
            _id: userId,
            customerId: id,
        } = data;

        const customerFound = await this.stripeCustomerModel.findOne({
            // Object Id for actual user
            userId,
            // Stripe Customer Id in stripe customers collection
            id,
        });

        return customerFound;
    }
}

export interface IStripeSerice {
    instance: stripe | undefined;
    cache: CacheService;
    createStripeCustomer(data: UserType, options: CreateStripeCustomer): Promise<StripeCustomerType & Document>;
    getCustomerByEmail(email: string): Promise<stripe.Customer | null>;
    getCustomerByUserAndCustomerId(data: UserType & CreatePaymentDto): Promise<StripeCustomerType & Partial<Document> | null>;
}
