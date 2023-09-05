import { Transform, TransformFnParams } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { Constants } from 'src/common/constants';
import { Role } from 'src/common/enums';

export class UserDto {
  @IsOptional()
  _id?: string;

  @ValidateIf(dto => !dto.is_guest)
  @Transform(({ value }: TransformFnParams) => value?.trim())
  @IsString()
  @IsNotEmpty()
  username: string;

  @ValidateIf(dto => !dto.is_guest)
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @ValidateIf(dto => !dto.is_guest)
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsBoolean()
  is_guest?: boolean;

  @IsBoolean()
  is_verified?: boolean;

  @IsOptional()
  last_name?: string;

  @IsOptional()
  first_name?: string;

  @IsOptional()
  deleted: boolean;

  @ValidateIf(dto => !dto.isGuest)
  @IsEnum(Role, { each: true, message: Constants.ErrorMessages.ROLE_ERROR })
  @IsArray()
  @ArrayMinSize(1, { message: Constants.ErrorMessages.MIN_ROLE_ERROR })
  roles: Role[];

  @IsOptional()
  deleted_at: Date;
}
