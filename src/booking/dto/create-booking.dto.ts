import { IsInt, Min, IsEnum, IsOptional } from 'class-validator';

export class CreateBookingDto {
  @IsInt()
  @Min(1)
  traineeId: number;

  @IsInt()
  @Min(1)
  classScheduleId: number;

  @IsInt()
  @Min(0)
  price: number;

  @IsOptional()
  @IsInt()
  paymentMethodId?: number;

  @IsEnum(['Booked', 'Cancelled', 'Attended'])
  status: 'Booked' | 'Cancelled' | 'Attended';
}