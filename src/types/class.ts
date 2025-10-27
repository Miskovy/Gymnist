export interface Class {
  id: number;
  name: string;
  description?: string;
  image?: string;
  price: number;
  gender: 'mix' | 'male' | 'female';
  createdAt: Date;
  updatedAt: Date;
}

export interface ClassSchedule {
  id: number;
  classId: number;
  date: Date;
  timeSlot: string;
  roomId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface TrainerClass {
  trainerId: number;
  classId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Booking {
  id: number;
  traineeId: number;
  classScheduleId: number;
  price: number;
  paymentMethod: string;
  createdAt: Date;
  updatedAt: Date;
}