import { NextFunction, Request, Response } from "express";
import passport from "passport";

import { ApiError } from "../errors/api.error";
import { JWTPayload } from "../types/user.type";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("jwt", (err: ApiError, user: JWTPayload) => {
    if (err) {
      console.log(err);
      next(err);
    }

    if (!user) {
      // Redirect to login page
      return res.status(422).json({ error: "User not found" });
    }
    req.user = user;
    next();
    // Login successful, redirect to home page
  })(req, res, next);
};
