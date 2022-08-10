// src/users/user.interface.ts

export interface BaseEntity {
  id: number;
  name: string;
  isOnsite: boolean;
}

export interface Employee extends BaseEntity {
  guests?: Guest[];
}

export interface Guest extends BaseEntity {
  employeeId: number;
}
