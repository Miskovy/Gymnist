import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Trainee } from '../../trainee/entities/trainee.entity';
import { Trainer } from '../../trainer/entities/trainer.entity';
import { ClassSchedule } from '../../booking/entities/class-schedule.entity';

@Entity('attendance')
export class Attendance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'trainee_id' })
  traineeId: number;

  @Column({ name: 'trainer_id' })
  trainerId: number;

  @Column({ type: 'enum', enum: ['Package', 'Class', 'Private', 'Rent'] })
  serviceType: 'Package' | 'Class' | 'Private' | 'Rent';

  @Column({ name: 'service_id' })
  serviceId: number;

  @Column({ name: 'class_schedule_id', nullable: true })
  classScheduleId?: number;

  @ManyToOne(() => Trainee)
  trainee: Trainee;

  @ManyToOne(() => Trainer)
  trainer: Trainer;

  @ManyToOne(() => ClassSchedule)
  classSchedule?: ClassSchedule;
}