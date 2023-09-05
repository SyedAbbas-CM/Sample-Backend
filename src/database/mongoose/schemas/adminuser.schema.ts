import { Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './user.schema';

@Schema({
  timestamps: true,
})
export class AdminUser extends User {}

export const AdminUserSchema = SchemaFactory.createForClass(AdminUser);

AdminUserSchema.index(
  { username: 1 },
  { name: 'IDX_AdminUser_username', unique: true, sparse: true },
);

AdminUserSchema.index(
  { email: 1 },
  { name: 'IDX_AdminUser_email', unique: true, sparse: true },
);

AdminUserSchema.index(
  { phone_number: 1 },
  { name: 'IDX_AdminUser_phone_number', unique: true, sparse: true },
);
