import { IsEnum, IsString } from "class-validator";
import { PaymentStatuses } from "../thirdparty/enums"


export class ConfirmPaymentQueryDto {
    @IsString()
    payment_intent: string;

    @IsString()
    payment_intent_client_secret: string;

    @IsEnum(PaymentStatuses)
    @IsString()
    redirect_status: PaymentStatuses
}