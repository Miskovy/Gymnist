import { IsBase64, IsOptional, IsString } from "class-validator";

export class GalleryImageDto {
  @IsString()
  image: string;

  @IsOptional()
  @IsString()
  filename?: string;
}