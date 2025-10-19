import { IsInt, Min, IsEnum, IsDateString, IsNotEmpty } from 'class-validator';

export class CreateSubscriptionDto {
  @IsInt()
  @Min(1)
  traineeId: number;

  @IsInt()
  @Min(1)
  packageId: number;

  @IsEnum(['Monthly', 'Quarterly', 'Semi_Annually', 'Annually'])
  duration: 'Monthly' | 'Quarterly' | 'Semi_Annually' | 'Annually';

  @IsInt()
  @Min(0)
  price: number;

  @IsInt()
  @Min(1)
  paymentMethodId: number;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsInt()
  @Min(0)
  remainingEntrance: number;
}