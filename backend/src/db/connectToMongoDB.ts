import * as mongoose from "mongoose";

export const connectToDB = async() => {
  try {
     await mongoose.connect(process.env.DB_URL);
      console.log('Connected to Database');
  } catch (e) {
      console.log('Error Connection to database', e.message);
  }
};