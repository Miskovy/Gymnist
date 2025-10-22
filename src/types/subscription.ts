export interface Subscription {
  id: number;
  traineeId: number;
  packageId: number;
  duration: 'Monthly' | 'Quarterly' | 'Semi_Annually' | 'Annually';
  price: number;
  paymentMethodId: number;
  startDate: Date;
  endDate: Date;
  remainingEntrance: number;
  createdAt?: Date;
  updatedAt?: Date;
}