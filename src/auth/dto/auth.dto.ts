import { IsEmail, IsNotEmpty, MinLength, IsString } from 'class-validator';
export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  username: string;
  @MinLength(6)
  password: string;
  @IsEmail()
  email: string;
}

export class LoginDto {
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
}
