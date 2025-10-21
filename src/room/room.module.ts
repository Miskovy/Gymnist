import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { RoomGallery } from './entities/room-gallery.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Room, RoomGallery])],
  controllers: [RoomController],
  providers: [RoomService],
})
export class RoomModule {}
