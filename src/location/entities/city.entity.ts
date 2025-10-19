import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Country } from './country.entity';

@Entity('city')
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ name: 'country_id' })
  countryId: number;

  @ManyToOne(() => Country)
  country: Country;
}