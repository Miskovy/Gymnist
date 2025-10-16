import { IsEmail, IsString, MinLength, IsEnum, IsDateString} from 'class-validator';
export class CreateTrainerDto {
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @IsString()
  name: string;

  @IsString()
  @MinLength(10, { message: 'Phone number must be at least 10 characters long' })
  phone: string;

  @IsEnum(['male', 'female'])
  gender: 'male' | 'female';

  @IsDateString()
  birthDate: string;

  @IsString()
  country: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  nationality: string;

  @IsString()
  imageUrl: string;

}

