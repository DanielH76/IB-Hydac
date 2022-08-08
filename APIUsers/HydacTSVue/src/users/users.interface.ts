// src/users/users.interface.ts

import { Employee } from "./user.interface";

export interface Employees {
  [key: number]: Employee;
}
