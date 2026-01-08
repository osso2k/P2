import { Router } from "express";
import { getUser, login, signup } from "../controllers/authcontroller.js";

const userRouter = Router()

userRouter.get("/auth/user", getUser)
userRouter.post("/auth/signup", signup)
userRouter.post("/auth/login", login)

export default userRouter