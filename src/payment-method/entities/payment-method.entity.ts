import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('payment_method')
export class PaymentMethod {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  image?: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @Column({ type: 'enum', enum: ['Auto', 'Manual'] })
  type: 'Auto' | 'Manual';
}