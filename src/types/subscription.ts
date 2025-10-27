export interface Subscription {
  id: number;
  traineeId: number;
  packageId: number;
  duration: 'Monthly' | 'Quarterly' | 'Semi-Annually' | 'Annually';
  price: number;
  paymentMethodId: number;
  startDate: Date;
  endDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
}