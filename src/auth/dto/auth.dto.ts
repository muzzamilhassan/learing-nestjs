import {
  IsEmail,
  IsNotEmpty,
  MinLength,
  IsString,
  IsOptional,
  IsEnum,
} from 'class-validator';
import { UserRole } from 'src/user/types/user.types';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @MinLength(6)
  password: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsEnum(UserRole)
  Role?: string;
}

export class LoginDto {
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
}
