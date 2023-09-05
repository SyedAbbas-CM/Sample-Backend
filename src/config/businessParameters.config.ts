import { CurrencyCode } from "src/modules/payment/enums";

export const businessParameters = {
    payments: {
        defaultCurrency: CurrencyCode.EUR,
        caps: {
            customer: {
                /** Amount is in cents */
                minimumAccepted: 50,
                maximumAccepted: 100000,
            }
        }
    }
}