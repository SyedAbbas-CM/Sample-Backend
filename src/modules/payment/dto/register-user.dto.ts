import { IsArray, IsIn, IsNotEmpty, IsString } from "class-validator";
import { Role } from "src/common/enums";
import { JwtPayloadType } from "src/modules/auth/types";

export class RegisterUserDto implements JwtPayloadType {
    @IsNotEmpty()
    @IsString()
    _id: string;

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsArray()
    /** Closest implementation of enum values within an array */
    @IsIn(Object.values(Role))
    roles: Array<Role>;
}
