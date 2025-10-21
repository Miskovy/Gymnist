import { IsString, IsEnum, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreateDiscountDto {
  @IsString()
  name: string;

  @IsEnum(['percentage', 'value'])
  type: 'percentage' | 'value';

  @IsNumber()
  value: number;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}