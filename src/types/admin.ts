export interface Admin {
  id: number;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Privilege {
  id: number;
  name: string;
  action: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AdminPrivilege {
  id: number;
  adminId: number;
  privilegeId: number;
  createdAt: Date;
  updatedAt: Date;
}