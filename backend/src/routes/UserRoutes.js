import express from "express";
import { getUsres, login, register } from "../controllers/UserController.js";

const userRouter = express.Router();
userRouter.get("/", getUsres);
userRouter.post("/register", register);
userRouter.post("/login", login);

export default userRouter;
