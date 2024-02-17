import { Router } from "express";
import passport from "passport";

import { login, logout, signup } from "../controllers/auth.controller";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  logout,
);

export const authRouter = router;
