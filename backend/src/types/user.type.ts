import { Document } from "mongoose";

enum EGender {
  Male = "male",
  Female = "female",
}
export interface IUser extends Document {
  userId: string;
  fullName: string;
  username: string;
  password: string;
  profilePic?: string;
  gender: EGender;
}

export type JWTPayload = Pick<IUser, "userId">;
