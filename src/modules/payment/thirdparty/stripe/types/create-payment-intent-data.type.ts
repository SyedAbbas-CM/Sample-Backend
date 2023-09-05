import { UserType } from "src/modules/users/types";
import { CreatePaymentDto } from "src/modules/payment/dto/create-payment.dto";

/** 
 * @note We dropped our internal camel case naming convention to
 * resort to the conventions and keys stripe payment intent accepts
 * */
export class PaymentData extends CreatePaymentDto {
}

export type CreatePaymentIntentData = {
    user: UserType,
    payment: PaymentData,
}