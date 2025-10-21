import { IsInt, Min, IsEnum, IsDateString } from 'class-validator';

export class CreateScheduleDto {
  @IsInt()
  @Min(1)
  classId: number;

  @IsInt()
  @Min(1)
  roomId: number;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsEnum(['Upcoming', 'Completed', 'Cancelled'])
  status: 'Upcoming' | 'Completed' | 'Cancelled';
}