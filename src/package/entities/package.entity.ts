import { 
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn 
} from 'typeorm';
import { PaymentMethod } from '../../payment-method/entities/payment-method.entity';

@Entity('package')
export class Package {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'num_of_members', default: 0 })
  numOfMembers: number;

  @Column({ name: 'MaxEntranceCount' })
  maxEntranceCount: number;

  @Column({ type: 'text' })
  description: string;

  @Column()
  image?: string;

  @Column({ name: 'start_date', type: 'date' })
  startDate: Date;

  @Column({ name: 'end_date', type: 'date' })
  endDate: Date;

  @Column({ name: 'payment_method_id' })
  paymentMethodId: number;

  @Column({ name: 'price_Monthly' })
  priceMonthly: number;

  @Column({ name: 'price_Quarterly' })
  priceQuarterly: number;

  @Column({ name: 'price_semi_annually' })
  priceSemiAnnually: number;

  @Column({ name: 'price_annually' })
  priceAnnually: number;

  // Relation
  @ManyToOne(() => PaymentMethod)
  @JoinColumn({ name: 'payment_method_id' })
  paymentMethod: PaymentMethod;
}