// src/users/user.interface.ts

export interface Employee {
  id: number;
  guests?: Guest[];
  name: string;
  isOnsite: boolean;
}

export interface Guest {
  id: number;
  name: string;
  employeeId: number;
}
