import { Document } from 'mongoose';
import { CurrencyCode } from 'src/modules/payment/enums';
import { StripeResponse } from 'src/modules/payment/thirdparty/stripe/enums';
import {
    InvoiceCreationRenderingOptionsType,
    InvoiceCreationShipping,
} from 'src/modules/payment/thirdparty/stripe/types';

export interface InvoiceSettingsType {
    custom_fields: (string | null)[] | null;
    default_payment_method: CurrencyCode | null;
    footer: string | null;
    rendering_options: InvoiceCreationRenderingOptionsType | null;
}

export interface StripeCustomerType extends Document {
    id: string;
    userId: string;
    object: StripeResponse;
    address: string;
    balance: number;
    created: number;
    currency: CurrencyCode | null;
    default_source: null | string;
    delinquent: string;
    description: string | null;
    discount: number | null;
    email: string | null;
    invoice_prefix: string;
    invoice_settings: InvoiceSettingsType;
    livemode: boolean;
    metadata: any;
    name: string | null;
    phone: string | null;
    preferred_locales: string[];
    shipping: InvoiceCreationShipping | null;
    tax_exempt: string | null;
    test_clock: null | string;
}
