import { IsNotEmpty, IsObject, IsString } from "class-validator";
import Stripe from "stripe";


type PaymentMethodObject = Stripe.PaymentMethodCreateParams.Card1;

export class RegisterPaymentMethodDto {

    @IsNotEmpty()
    @IsString()
    customerId: string;

    @IsNotEmpty()
    @IsString()
    paymentMethodType: string;


    @IsNotEmpty()
    @IsObject()
    paymentMethod: PaymentMethodObject;
}