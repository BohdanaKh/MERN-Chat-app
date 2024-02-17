import { Router } from "express";

import { getUsersForSidebar } from "../controllers/users.controller";
import { auth } from "../middlewares/protectRoute.middleware";

const router = Router();

router.get("/", auth, getUsersForSidebar);

export const userRouter = router;
