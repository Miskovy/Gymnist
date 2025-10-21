import { IsString, IsInt, Min, IsEnum, IsOptional, IsBoolean } from 'class-validator';

export class CreateClassDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  image?: string;

  @IsInt()
  @Min(0)
  price: number;

  @IsInt()
  @Min(1)
  trainerId: number;

  @IsEnum(['Male', 'Female', 'Mix'])
  classGender: 'Male' | 'Female' | 'Mix';

  @IsInt()
  @Min(1)
  roomId: number;

  @IsOptional()
  @IsInt()
  discountId?: number;

  @IsOptional()
  @IsBoolean()
  isPrivate?: boolean;
}