import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { City } from './city.entity';

@Entity('state')
export class State {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'city_id' })
  cityId: number;

  @ManyToOne(() => City)
  city: City;
}