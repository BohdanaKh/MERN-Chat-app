import { Router } from "express";

// import passport from "passport";
import { getMessages, sendMessage } from "../controllers/message.controller";
import { auth } from "../middlewares/protectRoute.middleware";

const messageRouter = Router();
messageRouter.get("/:id", auth, getMessages);
messageRouter.post("/send/:id", auth, sendMessage);

export { messageRouter };
