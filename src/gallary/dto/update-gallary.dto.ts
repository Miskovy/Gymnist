import { PartialType } from '@nestjs/mapped-types';
import { CreateGallaryDto } from './create-gallary.dto';

export class UpdateGallaryDto extends PartialType(CreateGallaryDto) {}
