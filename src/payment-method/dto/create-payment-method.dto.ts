import { IsString, IsOptional, IsEnum, IsBoolean } from 'class-validator';

export class CreatePaymentMethodDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsEnum(['Auto', 'Manual'])
  type: 'Auto' | 'Manual';
}