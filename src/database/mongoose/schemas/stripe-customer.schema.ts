import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaTypes, Types } from 'mongoose';
import { CurrencyCode } from 'src/modules/payment/enums';
import { StripeResponse } from 'src/modules/payment/thirdparty/stripe/enums';
import { InvoiceCreationRenderingOptionsType, InvoiceCreationShipping } from 'src/modules/payment/thirdparty/stripe/types';


@Schema({
  timestamps: true,
})
class InvoiceSettings {
  @Prop()
  custom_fields: Array<string> | null;

  @Prop()
  default_payment_method: CurrencyCode | null;

  @Prop()
  footer: string | null;

  @Prop(InvoiceCreationRenderingOptionsType)
  rendering_options: InvoiceCreationRenderingOptionsType | null;
}


@Schema({
  timestamps: true,
})
export class StripeCustomer {
  @Prop()
  id: string;

  @Prop({ required: true, type: SchemaTypes.ObjectId })
  userId: Types.ObjectId;

  @Prop()
  object: StripeResponse;

  @Prop()
  address: string;

  @Prop({ min: 0 })
  balance: number;

  @Prop()
  created: number;

  @Prop()
  currency: CurrencyCode | null;

  @Prop()
  default_source: null | string;

  @Prop()
  delinquent: string;

  @Prop()
  description: string | null;

  @Prop()
  discount: number | null;

  @Prop()
  email: string | null;

  @Prop()
  invoice_prefix: string;

  @Prop()
  invoice_settings: InvoiceSettings;

  @Prop()
  livemode: boolean;

  @Prop({ type: Object, default: {} })
  metadata: any;

  @Prop()
  name: string | null;

  @Prop()
  phone: string | null;

  @Prop({ default: [] })
  preferred_locales: Array<string>

  @Prop(InvoiceCreationShipping)
  shipping: InvoiceCreationShipping | null;

  @Prop()
  tax_exempt: string | null;

  @Prop()
  test_clock: null | string;
}

export const StripeCustomerSchema = SchemaFactory.createForClass(StripeCustomer);


StripeCustomerSchema.index(
  { id: 1 },
  { name: 'IDX-StripeCustomer-id', unique: true, sparse: true }
);

StripeCustomerSchema.index(
  { name: 1 },
  { name: 'IDX-StripeCustomer-name', sparse: true, unique: true }
);

StripeCustomerSchema.index(
  { email: 1 },
  { name: 'IDX-StripeCustomer-email', sparse: true, unique: true }
);

StripeCustomerSchema.index(
  { email: 1 },
  { name: 'IDX-StripeCustomer-userId', sparse: true, unique: true }
);
