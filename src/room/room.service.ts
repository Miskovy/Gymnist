import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './entities/room.entity';
import { RoomGallery } from './entities/room-gallery.entity';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { GalleryImageDto } from './dto/create-gallery.dto';
import { saveBase64Image } from '../utils/saveBase64Image';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
    @InjectRepository(RoomGallery)
    private readonly roomGalleryRepository: Repository<RoomGallery>,
  ) {}

  async create(createRoomDto: CreateRoomDto): Promise<Room> {
    try {
      let thumbnailUrl: string | undefined;

      if (createRoomDto.thumbnail) {
        const thumbnailFilename = `room-thumbnail-${Date.now()}.png`;
        thumbnailUrl = await saveBase64Image(createRoomDto.thumbnail, thumbnailFilename, 'uploads/rooms/thumbnails');
      }

      const room = this.roomRepository.create({
        name: createRoomDto.name,
        capacity: createRoomDto.capacity,
        description: createRoomDto.description,
        thumbnail: thumbnailUrl,
      });

      const savedRoom = await this.roomRepository.save(room);

      if (createRoomDto.gallery && createRoomDto.gallery.length > 0) {
        const galleryPromises = createRoomDto.gallery.map(async (galleryItem, index) => {
          const filename = galleryItem.filename || `room-${savedRoom.id}-gallery-${Date.now()}-${index}.png`;
          const imageUrl = await saveBase64Image(galleryItem.image, filename, 'uploads/rooms/gallery');
          
          return this.roomGalleryRepository.save({
            roomId: savedRoom.id,
            image: imageUrl,
          });
        });

        const galleryImages = await Promise.all(galleryPromises);
        savedRoom.gallery = galleryImages;
      } else {
        savedRoom.gallery = [];
      }

      return savedRoom;
    } catch (error) {
      console.error('Error creating room with thumbnail and gallery:', error);
      throw new InternalServerErrorException('Failed to create room with thumbnail and gallery');
    }
  }

  async findAll(): Promise<Room[]> {
    return await this.roomRepository.find({
      relations: ['gallery'],
    });
  }

  async findOne(id: number): Promise<Room> {
    const room = await this.roomRepository.findOne({
      where: { id },
      relations: ['gallery'],
    });

    if (!room) {
      throw new NotFoundException(`Room with ID ${id} not found`);
    }

    return room;
  }

  async update(id: number, updateRoomDto: UpdateRoomDto): Promise<Room> {
    const room = await this.findOne(id);
    
    Object.assign(room, updateRoomDto);
    return await this.roomRepository.save(room);
  }

  async remove(id: number): Promise<void> {
    const room = await this.findOne(id);
    
    await this.roomGalleryRepository.delete({ roomId: id });
    
    await this.roomRepository.remove(room);
  }

 /* async addGalleryImage(roomId: number, base64Image: string, filename?: string): Promise<RoomGallery> {
    const room = await this.findOne(roomId);
    
    const finalFilename = filename || `room-${roomId}-gallery-${Date.now()}.png`;
    const imageUrl = await saveBase64Image(base64Image, finalFilename, 'uploads/rooms/gallery');
    
    const galleryImage = this.roomGalleryRepository.create({
      roomId,
      image: imageUrl,
    });

    return await this.roomGalleryRepository.save(galleryImage);
  }*/
}