import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentAdapterService } from './payment-adapter/payment-adapter.service';
import { AttachMethodCustomerData, CreateCustomerUserData, CreateStripeCustomer } from './thirdparty/stripe/types';
import { RegisterPaymentMethodDto } from './dto/register-payment-method.dto';
import { Constants } from 'src/common/constants';
import Stripe from 'stripe';
import { Document } from 'mongoose';
import { StripeCustomerType } from './thirdparty/stripe/types/stripe-customer-schema.type';
import { UserType } from '../users/types';
import { ConfirmPaymentQueryDto } from './dto/confirm-payment-query.dto';


@Injectable()
export class PaymentService {

  constructor(
    private readonly payments: PaymentAdapterService,
  ) {
  }

  async getUserByEmail(
    email: string,
  ): Promise<Stripe.Customer> {
    return await this.payments.getCustomerByEmail(email);
  }

  async addUser(
    userData: CreateCustomerUserData,
    options: CreateStripeCustomer,
  ): Promise<StripeCustomerType & Document> {
    return await this.payments.addUser(userData, options);
  }

  async createPaymentMethodForCustomer(
    userData: CreateCustomerUserData,
    attachPaymentMethodPayload: RegisterPaymentMethodDto
  ): Promise<Stripe.Response<Stripe.PaymentMethod>> {
    const { email } = userData;

    const stripeCustomer = await this.payments.getCustomerByEmail(email);

    if (!stripeCustomer)
      throw new NotFoundException(Constants.ErrorMessages.STRIPE_CUSTOMER_NOT_REGISTERED);

    const methodCreated = await this.payments.createPaymentMethodForCustomer(attachPaymentMethodPayload);

    const {
      customerId,
    } = attachPaymentMethodPayload;

    const attached = this
      .attachPaymentPethod({
        customerId,
        paymentMethodData: methodCreated,
      });

    return attached;
  }

  async attachPaymentPethod(
    paymentMethodData: AttachMethodCustomerData
  ): Promise<Stripe.Response<Stripe.PaymentMethod>> {
    return await this.payments.attachPaymentMethodToCustomer(paymentMethodData);
  }

  async getPaymentMethods(
    userData: UserType
  ): Promise<Array<Stripe.PaymentMethod>> {

    const { email } = userData;

    const stripeCustomer = await this.payments.getCustomerByEmail(email);

    if (!stripeCustomer)
      throw new NotFoundException(Constants.ErrorMessages.STRIPE_CUSTOMER_NOT_REGISTERED);

    const { id: customerId } = stripeCustomer;

    return await this.payments.getPaymentMethodsList({ customerId });
  }

  async createPayment(
    userData: UserType,
    createPaymentPayload: CreatePaymentDto,
  ): Promise<Stripe.Response<Stripe.PaymentIntent>> {
    const { _id: userId, } = userData;

    const { customerId, } = createPaymentPayload;

    const foundCustomer = await this.payments
      .getCustomerByIds({ customerId, _id: userId })

    if (!foundCustomer)
      throw new UnprocessableEntityException(Constants.ErrorMessages.STRIPE_ID_CUSTOMER_ID_MISMATCH);

    const newPaymentIntent = await this.payments.startPaymentProcess({
      user: userData,
      payment: createPaymentPayload,
    });

    return newPaymentIntent;
  }

  async autoConfirmedPaymentResponse(
    createPaymentQueryParams: ConfirmPaymentQueryDto
  ): Promise<ConfirmPaymentQueryDto> {
    /**
     * @note auto-succeed backend side flows are not planned yet, better yet we'd be using webhooks for this
     */
    return createPaymentQueryParams;
  }
}
