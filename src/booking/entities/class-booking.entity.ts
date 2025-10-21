import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Trainee } from '../../trainee/entities/trainee.entity';
import { ClassSchedule } from './class-schedule.entity';
import { PaymentMethod } from '../../payment-method/entities/payment-method.entity';

@Entity('class_booking')
export class ClassBooking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'trainee_id' })
  traineeId: number;

  @Column({ name: 'class_schedule_id' })
  classScheduleId: number;

  @Column({ default: 0 })
  price: number;

  @Column({ name: 'payment_method_id', nullable: true })
  paymentMethodId?: number;

  @Column({ type: 'enum', enum: ['Booked', 'Cancelled', 'Attended'] })
  status: 'Booked' | 'Cancelled' | 'Attended';

  @ManyToOne(() => Trainee)
  trainee: Trainee;

  @ManyToOne(() => ClassSchedule)
  classSchedule: ClassSchedule;

  @ManyToOne(() => PaymentMethod)
  paymentMethod?: PaymentMethod;
}