import { IsString, IsNumber, IsOptional, IsArray, ValidateNested, IsBase64 } from 'class-validator';
import { Type } from 'class-transformer';
import { GalleryImageDto } from './create-gallery.dto';

export class CreateRoomDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  thumbnail?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GalleryImageDto)
  gallery: GalleryImageDto[];

  @IsNumber()
  capacity: number;

  @IsOptional()
  @IsString()
  description?: string;
}