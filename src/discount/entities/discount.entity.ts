import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('discount')
export class Discount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: ['percentage', 'value'] })
  type: 'percentage' | 'value';

  @Column()
  value: number;

  @Column({ name: 'is_active', nullable: true })
  isActive?: boolean;
}