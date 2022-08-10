// src/users/user.service.ts

import { BaseEntity, Employee, Guest } from "./user.interface";
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
    let boolValue = /true/i.test(stringValue);

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
  console.log(empToFind);
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

  let stringToWrite: string = "";

  for (let i = 0; i < tempEmployee.length - 1; i++) {
    let idToCreate: string = "";
    idToCreate =
      i == 0
        ? tempEmployee[i].id.toString() + ","
        : "\n" + tempEmployee[i].id.toString() + ",";
    let nameToCreate: string = tempEmployee[i].name + ",";
    let boolToCreate: string = String(tempEmployee[i].isOnsite);

    let stringsCombined: string = idToCreate.concat(nameToCreate, boolToCreate);

    stringToWrite += stringsCombined;
  }

  txtService.syncWriteFile("userStore.txt", stringToWrite);
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

  employeeToUpdate.id = newEmployeeValues.id;
  employeeToUpdate.name = newEmployeeValues.name;
  employeeToUpdate.isOnsite = newEmployeeValues.isOnsite;

  // replace employee in array

  let index: number = tempEmployee.indexOf(employeeToUpdate);

  tempEmployee.splice(index, 1, employeeToUpdate);

  let stringToWrite: string = "";

  for (let i = 0; i < tempEmployee.length; i++) {
    let idToCreate: string = "";
    idToCreate =
      i == 0
        ? tempEmployee[i].id.toString() + ","
        : "\n" + tempEmployee[i].id.toString() + ",";
    let nameToCreate: string = tempEmployee[i].name + ",";
    let boolToCreate: string = String(tempEmployee[i].isOnsite);

    let stringsCombined: string = idToCreate.concat(nameToCreate, boolToCreate);

    stringToWrite += stringsCombined;
  }

  /* for (let i = 0; i < tempEmployee.length; i++) {
    if (tempEmployee[i].name.startsWith(" ")) {
      let newName: string = tempEmployee[i].name.substring(1);
      tempEmployee[i].name = newName;
    }
  } */

  txtService.syncWriteFile("userStore.txt", stringToWrite);
  loadEmployees();

  return true;

  // loadEmployees()
}
