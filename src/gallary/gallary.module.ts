import { Module } from '@nestjs/common';
import { GallaryService } from './gallary.service';
import { GallaryController } from './gallary.controller';

@Module({
  controllers: [GallaryController],
  providers: [GallaryService],
})
export class GallaryModule {}
