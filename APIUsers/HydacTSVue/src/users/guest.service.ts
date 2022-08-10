// src/users/guest.service.ts

import { Guest } from "./user.interface";
import * as txtService from "./txt.service";

const guests: Guest[] = loadGuests();

export function loadGuests(): Guest[] {
  let guestStrings: string[] = txtService
    .syncReadFile("guestStore.txt")
    .split("\n");

  let guestsToReturn: Guest[] = new Array();

  for (let i = 0; i < guestStrings.length; i++) {
    let values: string[] = guestStrings[i].split(",");

    guestsToReturn[i] = {
      id: parseInt(values[0]),
      name: values[1],
      isOnsite: /true/i.test(values[2]),
      employeeId: parseInt(values[3]),
    };
  }

  return guestsToReturn;
}

export function findAll(): Guest[] {
  return guests;
}

export function find(id: number): Guest {
  let guestToReturn: Guest = guests.find((x) => x.id == id) as Guest;
  return guestToReturn;
}

export function getGuestsForEmployee(id: number): Guest[] {
  let guestsToReturn: Guest[] = loadGuests();

  for (let i = 0; i < guestsToReturn.length; i++) {
    if (guestsToReturn[i].id == id) {
      guestsToReturn.push(guests[i]);
    }
  }
  return guestsToReturn;
}
