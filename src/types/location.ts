// Location related interfaces
export interface Country {
  id: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface City {
  id: number;
  name: string;
  countryId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface State {
  id: number;
  name: string;
  cityId: number;
  createdAt?: Date;
  updatedAt?: Date;
}