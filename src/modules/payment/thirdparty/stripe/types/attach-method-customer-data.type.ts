import { PartialType } from "@nestjs/mapped-types";
import { RegisterPaymentMethodDto } from "src/modules/payment/dto/register-payment-method.dto";
import Stripe from "stripe";

class PartialRegisterPaymentMethod extends PartialType(RegisterPaymentMethodDto) {
    public paymentMethodData: Stripe.PaymentMethod;
}

export type AttachMethodCustomerData = PartialRegisterPaymentMethod;
