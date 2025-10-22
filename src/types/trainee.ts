export interface Trainee {
  id: number;
  name: string;
  phone: string;
  email?: string;
  gender?: string;
  birthDate?: Date;
  age?: number;
  countryId?: number;
  cityId?: number;
  stateId?: number;
  nationality?: string;
  createdAt: Date;
  updatedAt: Date;
}