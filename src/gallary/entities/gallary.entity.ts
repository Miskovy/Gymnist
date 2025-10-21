import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('gym_gallery')
export class GymGallery {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'img' })
  img: string;

  @Column({ name: 'type_img', type: 'enum', enum: ['logo', 'cover', 'thumbnail', 'gallery'] })
  typeImg: 'logo' | 'cover' | 'thumbnail' | 'gallery';
}