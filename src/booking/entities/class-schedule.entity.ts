import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Class } from './class.entity';
import { Room } from '../../room/entities/room.entity';

@Entity('class_schedules')
export class ClassSchedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'class_id' })
  classId: number;

  @Column({ name: 'room_id' })
  roomId: number;

  @Column({ type: 'timestamp' })
  startDate: Date;

  @Column({ type: 'timestamp' })
  endDate: Date;

  @Column({ type: 'enum', enum: ['Upcoming', 'Completed', 'Cancelled'] })
  status: 'Upcoming' | 'Completed' | 'Cancelled';

  @ManyToOne(() => Class)
  class: Class;

  @ManyToOne(() => Room)
  room: Room;
}