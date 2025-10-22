export interface PaymentMethod {
  id: number;
  name: string;
  image?: string;
  description?: string;
  isActive: boolean;
  type: 'Auto' | 'Manual';
  createdAt?: Date;
  updatedAt?: Date;
}