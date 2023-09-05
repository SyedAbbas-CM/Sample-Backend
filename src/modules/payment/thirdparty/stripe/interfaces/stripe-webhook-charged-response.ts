import Stripe from "stripe";
import { StripePaymentIntentWebhook } from "./stripe-webhook-payment-intent-response";


enum StripeNetworkStatus {
    approved_by_network = "approved_by_network",
    declined_by_network = "declined_by_network",
    not_sent_to_network = "not_sent_to_network",
    reversed_after_approval = "reversed_after_approval"
}

enum StripeOutcomeType {
    authorized = "authorized",
    issuer_declined = "issuer_declined",
    blocked = "blocked",
    fraudulent = "fraudulent"
}

interface StripeOutcome {
    network_status: StripeNetworkStatus;
    reason: string | null;
    risk_level: string;
    risk_score: number;
    seller_message: string;
    type: StripeOutcomeType;
}

export interface StripeWebhookChargedResponse extends StripePaymentIntentWebhook {
    amount_captured: number;
    amount_refunded: number;
    application: null;
    application_fee: null;
    application_fee_amount: null;
    balance_transaction: string;
    billing_details: {
        address: Stripe.Address;
        email: string;
        name: null;
        phone: null;
    };
    calculated_statement_descriptor: string;
    captured: boolean;
    created: number;
    destination: null;
    dispute: null;
    disputed: boolean;
    failure_balance_transaction: null;
    failure_code: null;
    failure_message: null;
    fraud_details: unknown & object;
    order: null;
    outcome: StripeOutcome;
    paid: boolean;
    payment_intent: string;
    payment_method_details: Stripe.PaymentMethod;
    receipt_url: string;
    refunded: boolean;
    source_transfer: null;
}