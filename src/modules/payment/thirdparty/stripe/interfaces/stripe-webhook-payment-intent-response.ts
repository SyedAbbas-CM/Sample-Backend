import { ConfirmationMethod, CurrencyCode, PaymentMethodTypes } from "src/modules/payment/enums";
import { PaymentStatuses, Request3DSecure } from "../../enums";
import { WebhookMessageObjectType } from "../enums";

type stripeCaputreMethod = ConfirmationMethod;


export interface StripePaymentIntentWebhook {
    id: string;
    object: WebhookMessageObjectType;
    amount: number;
    amount_capturable?: number;
    amount_details?: {
        tip: unknown & object;
    };
    amount_received: number;
    application: null;
    application_fee_amount: number | null;
    automatic_payment_methods: {
        enabled: boolean;
    };
    canceled_at: null;
    cancellation_reason: null;
    capture_method: stripeCaputreMethod;
    client_secret: string;
    confirmation_method: ConfirmationMethod;
    created: number;
    currency: CurrencyCode;
    customer: string;
    description: null;
    invoice: null;
    last_payment_error: null;
    latest_charge: null;
    livemode: boolean;
    metadata: unknown & object;
    next_action: null;
    on_behalf_of: null;
    payment_method: null;
    payment_method_options: {
        card: {
            request_three_d_secure?: Request3DSecure;
        }
    };
    payment_method_types: PaymentMethodTypes[];
    processing: null;
    receipt_email: string | null;
    review: null;
    setup_future_usage: null;
    shipping: null;
    source: null;
    statement_descriptor: null;
    statement_descriptor_suffix: null;
    status: PaymentStatuses;
    transfer_data: null;
    transfer_group: null;
}