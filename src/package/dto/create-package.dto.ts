import { IsString, IsInt, IsDateString, IsNotEmpty, IsOptional, Min } from 'class-validator';

export class CreatePackageDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @Min(0)
  numOfMembers?: number;

  @IsInt()
  @Min(1)
  maxEntranceCount: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsInt()
  paymentMethodId: number;

  @IsInt()
  @Min(0)
  priceMonthly: number;

  @IsInt()
  @Min(0)
  priceQuarterly: number;

  @IsInt()
  @Min(0)
  priceSemiAnnually: number;

  @IsInt()
  @Min(0)
  priceAnnually: number;
}