import { PaymentMethodTypes } from "src/modules/payment/enums"

export type ConfirmPaymentData = {
    paymentIntentId: string,
    paymentMethod: PaymentMethodTypes
}