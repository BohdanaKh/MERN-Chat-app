import "./configs/passport-config";

import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import passport from "passport";

import { connectToDB } from "./db/connectToMongoDB";
import { ApiError } from "./errors/api.error";
import { authRouter } from "./routes/auth.router";
import { messageRouter } from "./routes/message.router";
import { userRouter } from "./routes/users.router";
import { app, server } from "./socket/socket";

// const app = express();
const PORT = process.env.PORT || 5042;

dotenv.config();

app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("secret"));

app.use(passport.initialize());

app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);
app.use("/api/users", userRouter);

app.use((err: ApiError, req: Request, res: Response, next: NextFunction) => {
  const status = err.status || 500;

  return res.status(status).json({
    message: err.message,
    status: err.status,
  });
});

server.listen(PORT, () => {
  connectToDB();
  console.log(`Server is running on port ${PORT}`);
});
