import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('major')
export class Major {
  @PrimaryGeneratedColumn({ name: 'major_id' })
  majorId: number;

  @Column()
  name: string;
}