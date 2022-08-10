// src/users/user.interface.ts

export interface BaseEntity {
  // id: number;
}

export interface Employee extends BaseEntity {
  id: number;
  name: string;
  isOnsite: boolean;

  guests?: Guest[];
}

export interface Guest extends BaseEntity {
  name: string;
  employeeId: number;
}
