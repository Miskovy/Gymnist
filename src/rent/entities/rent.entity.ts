import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Room } from '../../room/entities/room.entity';
import { Trainer } from '../../trainer/entities/trainer.entity';

@Entity('rent')
export class Rent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'room_id' })
  roomId: number;

  @Column({ default: 0 })
  price: number;

  @Column({ name: 'trainer_id' })
  trainerId: number;

  @Column({ type: 'timestamp', nullable: true })
  startDate?: Date;

  @Column({ type: 'timestamp', nullable: true })
  endDate?: Date;

  @Column({ type: 'enum', enum: ['Upcoming', 'Completed', 'Cancelled'] })
  status: 'Upcoming' | 'Completed' | 'Cancelled';

  @ManyToOne(() => Room)
  room: Room;

  @ManyToOne(() => Trainer)
  trainer: Trainer;
}