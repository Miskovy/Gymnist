import { Request } from 'express';

export interface AuthRequest extends Request {
  user?: {
    id: number;
    role: string;
  };
}

// Common model interfaces
export interface BaseModel {
  id: number;
  createdAt?: Date;
  updatedAt?: Date;
}

// User related interfaces
export interface User extends BaseModel {
  name: string;
  email: string;
  password: string;
  role: string;
  isActive: boolean;
}

// Trainee related interfaces
export interface Trainee extends BaseModel {
  name: string;
  phone: string;
  email?: string;
  gender?: string;
  birthDate?: Date;
  age?: number;
  qrCode?: string;
  image?: string;
  countryId?: number;
  cityId?: number;
  stateId?: number;
  nationality?: string;
  isActive: boolean;
}

// Trainer related interfaces
export interface Trainer extends BaseModel {
  name: string;
  phone: string;
  email?: string;
  gender?: string;
  birthDate?: Date;
  age?: number;
  qrCode?: string;
  image?: string;
  countryId?: number;
  cityId?: number;
  stateId?: number;
  nationality?: string;
  isActive: boolean;
  majorId?: number;
}