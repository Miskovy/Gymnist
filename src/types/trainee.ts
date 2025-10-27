export interface Trainee {
  id: number;
  name: string;
  phone: string;
  email?: string;
  password?: string;
  qrCode?: string;
  image?: string;
  barCode?: string;
  gender?: string;
  birthDate?: Date;
  age?: number;
  countryId?: number;
  cityId?: number;
  stateId?: number;
  nationality?: string;
  lastAttendance?: Date;
  createdAt: Date;
  updatedAt: Date;
}