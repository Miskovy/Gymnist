import { IsEmail, IsString, IsEnum, IsOptional, MinLength, MaxLength } from 'class-validator';
import { Role } from './../utils/user.enum';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(32)
  password: string;

  @IsEnum(Role)
  @IsOptional()
  role?: 'admin'
}
