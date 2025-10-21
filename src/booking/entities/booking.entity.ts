import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Trainer } from '../../trainer/entities/trainer.entity';
import { Room } from '../../room/entities/room.entity';
import { Discount } from '../../discount/entities/discount.entity';

@Entity('class')
export class Class {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column()
  image?: string;

  @Column({ default: 0 })
  price: number;

  @Column({ name: 'trainer_id' })
  trainerId: number;

  @Column({ type: 'enum', enum: ['Male', 'Female', 'Mix'] })
  classGender: 'Male' | 'Female' | 'Mix';

  @Column({ name: 'room_id' })
  roomId: number;

  @Column({ name: 'discount_id', nullable: true })
  discountId?: number;

  @Column({ name: 'is_Private', default: false })
  isPrivate: boolean;

  @ManyToOne(() => Trainer)
  trainer: Trainer;

  @ManyToOne(() => Room)
  room: Room;

  @ManyToOne(() => Discount)
  discount?: Discount;
}