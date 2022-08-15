// src/users/user.interface.ts

export interface Employee {
  id: number;
  guests?: Guest[];
  name: string;
  isOnsite: boolean;
  mood: Mood;
}

export interface Guest {
  id: number;
  name: string;
  employeeId: number;
}

export type Mood = "Happy" | "Sad" | "Neutral" | "ANGRY";
