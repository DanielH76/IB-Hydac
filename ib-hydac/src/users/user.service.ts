// src/users/user.service.ts

import { BaseEntity, Employee, Guest } from './user.interface';
import { Employees } from './users.interface';
import * as txtService from './txt.service';
import { arrayBuffer } from 'stream/consumers';
import { userRouter } from './user.router';

const employees: Employee[] = loadEmployees();

export function loadEmployees(): Employee[] {
  let empStrings: string[] = txtService
    .syncReadFile('userStore.txt')
    .split('\n');

  const employeesToReturn: Employee[] = new Array();

  // Runs through all the employee strings in the array, and adds a new
  // employee to the EmployeeArray for each string

  for (let i = 0; i < empStrings.length; i++) {
    let idtmp: number = parseInt(empStrings[i].split(',')[0]);
    employeesToReturn[idtmp] = {
      id: idtmp,
      name: empStrings[i].split(',')[1],
    };
  }

  return employeesToReturn;
}

export function createNew(newEmployee: Employee): string {
  let idToCreate: string = '\n' + newEmployee.id.toString() + ',';
  let nameToCreate: string = ' ' + newEmployee.name;

  let stringsJoined: string = idToCreate.concat(nameToCreate);

  let test: string = txtService.appendFile('userStore.txt', stringsJoined);
  loadEmployees();

  return test;
}

export const findAll = (): Employee[] => {
  return employees;
};

export const find = (id: number): Employee => {
  return employees[id];
};
