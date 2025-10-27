import { PaymentMethod } from "./payment-method";

export interface Package {
  id: number;
  name: string;
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

  paymentMethod?: PaymentMethod;

  createdAt?: Date;
  updatedAt?: Date;
}