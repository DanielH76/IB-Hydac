/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from "express";

import * as UserService from "./user.service";

import { Employee } from "./user.interface";

/**
 * Router Definition
 */

export const userRouter = express.Router();

/**
 * Controller Definitions
 */

// GET items

userRouter.get("/", async (req: Request, res: Response) => {
  try {
    const employees: Employee[] = UserService.findAll();
    res.status(200).send(employees);
  } catch (e) {
    res.status(500).send("Error 500");
  }
});

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

userRouter.post("/", async (req: Request, res: Response) => {
  try {
    const emp: Employee = req.body;

    const newEmp = UserService.createNew(emp);

    res.status(201).json(newEmp);
  } catch {
    res.status(500).send("Error 500");
  }
});
