import { 
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn 
} from 'typeorm';
import { Trainee } from '../../trainee/entities/trainee.entity';
import { Package } from '../../package/entities/package.entity';
import { PaymentMethod } from '../../payment-method/entities/payment-method.entity';

@Entity('package_subscriptions')
export class PackageSubscription {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'trainee_id' })
  traineeId: number;

  @Column({ name: 'package_id' })
  packageId: number;

  @Column({ 
    type: 'enum', 
    enum: ['Monthly', 'Quarterly', 'Semi_Annually', 'Annually'] 
  })
  duration: 'Monthly' | 'Quarterly' | 'Semi_Annually' | 'Annually';

  @Column({ default: 0 })
  price: number;

  @Column({ name: 'payment_method_id' })
  paymentMethodId: number;

  @Column({ name: 'start_date', type: 'date' })
  startDate: Date;

  @Column({ name: 'end_date', type: 'date' })
  endDate: Date;

  @Column({ name: 'remaining_entrance', default: 0 })
  remainingEntrance: number;

  @ManyToOne(() => Trainee)
  @JoinColumn({ name: 'trainee_id' })
  trainee: Trainee;

  @ManyToOne(() => Package)
  @JoinColumn({ name: 'package_id' })
  package: Package;

  @ManyToOne(() => PaymentMethod)
  @JoinColumn({ name: 'payment_method_id' })
  paymentMethod: PaymentMethod;
}