export interface Trainer {
  id: number;
  name: string;
  phone: string;
  email?: string;
  specialization?: string;
  experience?: number;
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
}