// src/users/user.service.ts

import { BaseEntity, Employee } from "./user.interface";
import * as txtService from "./txt.service";

const employees: Employee[] = loadEmployees();

export function loadEmployees(): Employee[] {
  let empStrings: string[] = txtService
    .syncReadFile("userStore.txt")
    .split("\n");

  const employeesToReturn: Employee[] = new Array();

  // Runs through all the employee strings in the array, and adds a new
  // employee to the EmployeeArray for each string

  for (let i = 0; i < empStrings.length; i++) {
    let values: string[] = empStrings[i].split(",");

    let stringValue: string = values[2];
    let boolValue: boolean = /true/i.test(stringValue);

    employeesToReturn[i] = {
      id: parseInt(values[0]),
      name: values[1],
      isOnsite: boolValue,
    };
  }

  return employeesToReturn;
}

export function createNew(newEmployee: Employee): string {
  let idToCreate: string = "\n" + newEmployee.id.toString() + ",";
  let nameToCreate: string = newEmployee.name + ",";
  let boolToCreate: string = String(newEmployee.isOnsite);

  let stringsJoined: string = idToCreate.concat(nameToCreate, boolToCreate);

  let test: string = txtService.appendFile("userStore.txt", stringsJoined);
  loadEmployees();

  return test;
}

export const findAll = (): Employee[] => {
  return employees;
};

export const find = (id: number): Employee => {
  let empToFind: Employee = employees.find((x) => x.id == id) as Employee;
  return empToFind;
};

export function removeEmployee(id: number): boolean {
  let tempEmployee: Employee[] = findAll();

  let employeeToFind: Employee = find(id);

  if (!employeeToFind) {
    return false;
  }

  let index: number = tempEmployee.indexOf(employeeToFind);

  tempEmployee.splice(index, 1);

  txtService.updateEmployeeFile("userStore.txt", tempEmployee);

  loadEmployees();

  return true;
}

export function updateEmployee(
  newEmployeeValues: Employee,
  id: number
): boolean {
  // find employee with id
  let tempEmployee: Employee[] = findAll();

  let employeeToUpdate: Employee = find(id);

  if (!employeeToUpdate) {
    return false;
  }
  // update employee with new values

  employeeToUpdate.name = newEmployeeValues.name;
  employeeToUpdate.isOnsite = newEmployeeValues.isOnsite;

  // replace employee in array

  let index: number = tempEmployee.indexOf(employeeToUpdate);
  console.log(employeeToUpdate);
  tempEmployee.splice(index, 1, employeeToUpdate);

  txtService.updateEmployeeFile("userStore.txt", tempEmployee);

  loadEmployees();

  return true;
}
