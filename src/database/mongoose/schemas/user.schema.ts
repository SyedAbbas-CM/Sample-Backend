import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ required: true })
  username: string;

  @Prop()
  password: string;

  @Prop()
  email: string;

  @Prop({ default: '' })
  last_name?: string;

  @Prop({ default: false })
  is_guest?: boolean;

  @Prop({ default: '' })
  first_name?: string;

  @Prop()
  phone_number?: string;

  @Prop({ default: false })
  is_verified?: boolean;

  @Prop({ default: false })
  deleted?: boolean;

  @Prop([String])
  roles?: string[];

  @Prop()
  hashed_refreshtoken?: string;

  @Prop()
  deleted_at?: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index({ username: 1 }, { name: 'IDX-User-username', unique: true, sparse: true });

UserSchema.index({ email: 1 }, { name: 'IDX-User-email', unique: true, sparse: true });

UserSchema.index(
  { phone_number: 1 },
  { name: 'IDX-User-phone_number', unique: true, sparse: true },
);
