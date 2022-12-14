/**
 * Required External Modules
 */

import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";

import * as userService from "./users/user.service";
import { userRouter } from "./users/user.router";
import { guestRouter } from "./users/guest.router";
import { meetingRouter } from "./users/meeting.router";

dotenv.config();

/**
 * App Variables
 */

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

/**
 *  App Configuration
 */

app.use(helmet());

app.use(cors());

app.use(express.json());

app.use("/api/users", userRouter);

app.use("/api/guests", guestRouter);

app.use("/api/meetings", meetingRouter);

/**
 * Server Activation
 */

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
