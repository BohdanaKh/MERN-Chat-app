"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const auth_router_1 = require("./routes/auth.router");
const user_router_1 = require("./routes/user.router");
const connectToMongoDB_1 = require("./db/connectToMongoDB");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const PORT = process.env.PORT || 5042;
app.use('/api/auth', auth_router_1.authRouter);
app.use('/api/user', user_router_1.userRouter);
app.listen(PORT, () => {
    (0, connectToMongoDB_1.connectToDB)();
    console.log(`Server is running on port ${PORT}`);
});
