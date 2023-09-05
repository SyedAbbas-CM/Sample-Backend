import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ExpiredTokenDocument = HydratedDocument<ExpiredToken>;

@Schema({
  timestamps: true,
})
export class ExpiredToken {
  @Prop()
  expired_token: string;
}

export const ExpiredTokenSchema = SchemaFactory.createForClass(ExpiredToken);
