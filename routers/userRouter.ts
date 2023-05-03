import {Router} from "express";
import {signUpUserController, signInUserController} from "../controllers/userController";


export const userRouter: Router = Router()

userRouter.post('/signup', signUpUserController)
userRouter.post('/signin', signInUserController)
