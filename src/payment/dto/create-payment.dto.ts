import { IsInt, Min, IsEnum, IsString, IsNotEmpty } from 'class-validator';

export class CreatePaymentDto {
  @IsInt()
  @Min(1)
  traineeId: number;

  @IsInt()
  @Min(1)
  subscriptionId: number;

  @IsInt()
  @Min(1)
  amount: number;

  @IsEnum(['pending', 'completed', 'failed'])
  status: 'pending' | 'completed' | 'failed';

  @IsString()
  @IsNotEmpty()
  transactionId: string;
}