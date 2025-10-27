import { Request } from 'express';

export interface AuthRequest extends Request {
  user?: {
    id: number;
    role: string;
  };
}

export interface BaseModel {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
}


export interface User extends BaseModel {
  name: string;
  email: string;
  password: string;
  role: string;
  isActive: boolean;
}


export interface Trainee extends BaseModel {
  name: string;
  phone: string;
  email?: string;
  password?: string;
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
}

// Trainer related interfaces
export interface Trainer extends BaseModel {
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
  majorId?: number;
  lastAttendance?: Date;
}