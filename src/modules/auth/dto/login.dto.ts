import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  // pseudoname for guest or chosen username
  @IsNotEmpty()
  @IsString()
  username: string;

  // password
  @IsNotEmpty()
  @IsString()
  password: string;
}
