import { 
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn 
} from 'typeorm';

@Entity('trainees')
export class Trainee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true, message: 'Phone number must be unique' })
  phone: string;

  @Column({ unique: true, message: 'Email must be unique' })
  email: string;

  @Column({ type: 'enum', enum: ['male', 'female'] })
  gender: 'male' | 'female';

  @Column({ name: 'birth_date', type: 'date' })
  birthDate: Date;

  @Column({ name: 'age' })
  age: number;

  @Column()
  country: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  nationality: string;

  @Column({ name: 'bar_code', unique: true })
  barCode: string;

  @Column({ name: 'qr_code', unique: true })
  qrCode: string;

  @Column({ name: 'image_url', nullable: true })
  imageUrl?: string;

  @Column({ name: 'last_attendance', type: 'timestamp', nullable: true })
  lastAttendance?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}