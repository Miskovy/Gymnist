import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { RoomGallery } from './room-gallery.entity';

@Entity('room')
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  image?: string;

  @Column({ name: 'gallery_id' })
  galleryId: number;

  @Column({ default: 0 })
  capacity: number;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @OneToMany(() => RoomGallery, gallery => gallery.room)
  gallery: RoomGallery[];
}