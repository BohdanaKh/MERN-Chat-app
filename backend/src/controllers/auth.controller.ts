import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/api.error";
import User from "../models/user.model";
import { IUser } from "../types/user.type";
import generateTokenAndSetCookie from "../utils/generateToken";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response<IUser>> => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    }
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);

    const girlProfilePic = `https://api.dicebear.com/7.x/open-peeps/svg?seed=${username}`;
    const boyProfilePic = `https://api.dicebear.com/7.x/open-peeps/svg?seed=${username}`;

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });
    if (newUser) {
      generateTokenAndSetCookie(newUser._id.toString(), res);
      await newUser.save();
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        userName: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json("Invalid user data");
    }
  } catch (e) {
    throw new ApiError(e.message, e.status);
  }
};
export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user: IUser = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || "",
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username or password" });
    }
    generateTokenAndSetCookie(user._id.toString(), res);
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (e) {
    throw new ApiError(e.message, e.status);
  }
};
export const logout = async (req: Request, res: Response) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (e) {
    console.log(e);
    throw new ApiError(e.message, e.status);
  }
};
