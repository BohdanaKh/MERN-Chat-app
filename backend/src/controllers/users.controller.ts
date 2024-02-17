import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/api.error";
import User from "../models/user.model";
import { JWTPayload } from "../types/user.type";

export const getUsersForSidebar = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const loggedInUser = req.user as JWTPayload;
    const loggedInUserId = loggedInUser.userId;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");
    res.status(200).json(filteredUsers);
  } catch (e) {
    throw new ApiError(e.message, e.status);
  }
};
