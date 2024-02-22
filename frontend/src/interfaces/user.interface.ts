export interface IUser {
    _id?: string;
  fullName: string;
  username: string;
  password: string;
  confirmPassword: string;
  gender: EGender | string;
  profilePic?: string ;
}

export enum EGender {
    male = "male",
    female = "female",
}