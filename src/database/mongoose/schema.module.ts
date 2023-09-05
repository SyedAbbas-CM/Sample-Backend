import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  AdminUser,
  AdminUserSchema,
  Chair,
  ChairSchema,
  User,
  UserSchema,
  StripeCustomer,
  StripeCustomerSchema,
  ExpiredToken,
  ExpiredTokenSchema,
} from './schemas';


const mongooseModuleToExport = MongooseModule
  .forFeature([
    { name: User.name, schema: UserSchema },
    { name: AdminUser.name, schema: AdminUserSchema },
    { name: Chair.name, schema: ChairSchema },
    { name: ExpiredToken.name, schema: ExpiredTokenSchema },
    { name: StripeCustomer.name, schema: StripeCustomerSchema },
    // add more models here
  ])

@Module({
  imports: [
    mongooseModuleToExport,
  ],
  exports: [
    mongooseModuleToExport,
  ],
})
export class ModelsModule { }
