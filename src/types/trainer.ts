import { Major } from './major';

export interface Trainer {
  id: number;
  name: string;
  phone: string;
  email?: string;
  password: string;
  gender?: string;
  birthDate?: Date;
  age?: number;
  qrCode?: string;
  barCode?: string;
  image?: string;
  countryId?: number;
  cityId?: number;
  stateId?: number;
  nationality?: string;
  lastAttendance?: Date;
  createdAt: Date;
  updatedAt: Date;

  // Many-to-many
  majors?: Major[];
}