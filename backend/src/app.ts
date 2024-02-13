import dotenv from "dotenv";
import express from "express";
import {authRouter} from "./routes/auth.router";
import {userRouter} from "./routes/user.router";
import {connectToDB} from "./db/connectToMongoDB";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5042;


app.use('/api/auth', authRouter );
app.use('/api/user', userRouter );

app.listen(PORT, () => {
    connectToDB();
    console.log(`Server is running on port ${PORT}`)
});
