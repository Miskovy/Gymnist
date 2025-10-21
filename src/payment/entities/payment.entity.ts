import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Trainee } from '../../trainee/entities/trainee.entity';
import { PackageSubscription } from '../../subscription/entities/subscription.entity';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'trainee_id' })
  traineeId: number;

  @Column({ name: 'subscription_id' })
  subscriptionId: number;

  @Column()
  amount: number;

  @Column()
  status: 'pending' | 'completed' | 'failed';

  @Column()
  transactionId: string;

  @ManyToOne(() => Trainee)
  trainee: Trainee;

  @ManyToOne(() => PackageSubscription)
  subscription: PackageSubscription;
}