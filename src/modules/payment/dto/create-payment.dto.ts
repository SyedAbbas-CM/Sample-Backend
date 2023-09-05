import { IsEnum, IsInt, IsNotEmpty, IsString, Max, Min } from "class-validator";
import { businessParameters } from "src/config";
import { ConfirmationMethod, CurrencyCode } from "../enums";

export class CreatePaymentDto {

    @IsNotEmpty()
    @IsString()
    paymentMethodId: string;

    /* Query database for getting the payment amount and customer id of the current logged in user */

    @IsNotEmpty()
    @IsInt()
    @Min(businessParameters.payments.caps.customer.minimumAccepted)
    @Max(businessParameters.payments.caps.customer.maximumAccepted)
    amount: number;

    @IsEnum(CurrencyCode)
    @IsString()
    currency: CurrencyCode = businessParameters.payments.defaultCurrency;


    @IsNotEmpty()
    @IsString()
    customerId: string;

    @IsEnum(ConfirmationMethod)
    @IsString()
    confirmation_method?: ConfirmationMethod = ConfirmationMethod.Automatic;

    @IsString()
    description?: string = '';
}
