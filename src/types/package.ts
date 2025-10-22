export interface Package {
  id: number;
  name: string;
  numOfMembers: number;
  maxEntranceCount: number;
  description: string;
  image?: string;
  startDate: Date;
  endDate: Date;
  paymentMethodId: number;
  priceMonthly: number;
  priceQuarterly: number;
  priceSemiAnnually: number;
  priceAnnually: number;
  createdAt?: Date;
  updatedAt?: Date;
}