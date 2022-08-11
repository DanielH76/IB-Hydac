/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from "express";

import * as UserService from "./user.service";

import { Employee } from "./user.interface";

import * as crypto from "crypto";

/**
 * Router Definition
 */

export const userRouter = express.Router();

/**
 * Controller Definitions
 */

// GET EMPLOYEES

userRouter.get("/", async (req: Request, res: Response) => {
  try {
    const employees: Employee[] = UserService.findAll();
    res.status(200).send(employees);
  } catch (e) {
    res.status(500).send("Error 500");
  }
});

// GET EMPLOYEE
userRouter.get("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    const employeeToReturn: Employee = UserService.find(id);

    if (employeeToReturn) {
      return res.status(200).send(employeeToReturn);
    }

    res.status(404).send("Employee not found");
  } catch (e) {
    res.status(500).send(e);
  }
});

// CREATE EMPLOYEE

userRouter.post("/", async (req: Request, res: Response) => {
  const id: number = parseInt(crypto.randomUUID());
  try {
    const emp: Employee = req.body;
    emp.id = id;

    const newEmp = UserService.createNew(emp);

    res.status(201).json(newEmp);
  } catch {
    res.status(500).send("Error 500");
  }
});

// DELETE EMPLOYEE

userRouter.delete("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  try {
    let isDeleted: boolean = UserService.removeEmployee(id);

    if (isDeleted) {
      return res.status(200).send("User is now deleted");
    }
  } catch {
    res.status(500).send("Error 500");
  }
});

// UPDATE EMPLOYEE

userRouter.put("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  let updatedEmployee = req.body;

  try {
    let isUpdated: boolean = UserService.updateEmployee(updatedEmployee, id);

    if (isUpdated) {
      return res.status(200).send("User has been updated");
    } else {
      return res.status(404).send("Employee not found");
    }
  } catch {
    res.status(500).send("Error 500");
  }
});
