import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GenerateOtpDto {
  // pseudoname for guest or chosen username
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}

export class VerifyOtpDto extends GenerateOtpDto {
  @IsNotEmpty()
  @IsNumber()
  otp: number;
}
