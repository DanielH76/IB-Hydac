/**
 * Required External Modules and Interfaces
 */

import express, { Request, Response } from "express";

import * as GuestService from "./guest.service";

import { Guest } from "./user.interface";

import * as crypto from "crypto";

/**
 * Router Definition
 */

export const guestRouter = express.Router();

/**
 * Controller Definitions
 */

// GET ALL GUESTS
guestRouter.get("/", async (req: Request, res: Response) => {
  try {
    const guests: Guest[] = GuestService.findAll();
    if (guests) {
      res.status(200).send(guests);
    } else {
      res.status(404).send("Something went wrong");
    }
  } catch {
    res.status(500).send("Error 500");
  }
});

//GET SPECIFIC GUEST

guestRouter.get("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    const guestToReturn: Guest = GuestService.find(id);

    if (guestToReturn) {
      return res.status(200).send(guestToReturn);
    }

    res.status(404).send("Guest not found");
  } catch {
    res.status(500).send("Internal server error");
  }
});

// CREATE GUEST

guestRouter.post("/", async (req: Request, res: Response) => {
  const id: number = parseInt(crypto.randomUUID());

  try {
    const guest: Guest = req.body;
    guest.id = id;

    const newGuest = GuestService.create(guest);

    res.status(200).send(newGuest);
  } catch {
    res.status(500).send("Internal server error");
  }
});

// UPDATE GUEST

guestRouter.put("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  let updatedGuest = req.body;

  try {
    let isUpdated: boolean = GuestService.updateGuest(updatedGuest, id);

    if (isUpdated) {
      return res.status(200).send("Guest has been updated");
    } else {
      return res.status(404).send("Guest not found");
    }
  } catch {
    res.status(500).send("Internal server error");
  }
});

// DELETE GUEST
guestRouter.delete("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  try {
    let isDeleted: boolean = GuestService.remove(id);

    if (isDeleted) {
      return res.status(200).send("Guest has been removed");
    } else {
      return res.status(500).send("Something went wrong");
    }
  } catch {
    return res.status(500).send("Internal server error");
  }
});

guestRouter.get("/employee/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    let guestsToReturn: Guest[] = GuestService.getGuestsForEmployee(id);
    if (guestsToReturn) {
      return res.status(200).send(guestsToReturn);
    } else {
      return res.status(404).send("Guests not found. Perhaps ID is wrong?");
    }
  } catch {
    return res.status(500).send("Internal server error");
  }
});
