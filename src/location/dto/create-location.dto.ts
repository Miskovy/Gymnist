import { IsString, IsNotEmpty, IsInt, Min } from 'class-validator';
export class CreateLocationDto {}


export class CreateCountryDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}


export class CreateCityDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @Min(1)
  countryId: number;
}


export class CreateStateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @Min(1)
  cityId: number;
}