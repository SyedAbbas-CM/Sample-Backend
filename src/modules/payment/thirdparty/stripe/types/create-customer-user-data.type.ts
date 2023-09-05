import { RegisterUserDto } from "src/modules/payment/dto/register-user.dto";
import { UserType } from "src/modules/users/types";

export type CreateCustomerUserData = RegisterUserDto & UserType;