import {Request, Response} from "express";
import {signInHandler, signUpHandler} from "../handlers/userHandler";
import {userBodySchema} from "../middleware/bodyValidators";
import {ILoginHandleResult} from "../interfaces/user";

export const signUpUserController = async (req: Request, res: Response) => {
    try{
        const body = userBodySchema.parse(req.body)
        const {email, password} = body;
        const result: any = await signUpHandler({
            email,
            password,
        })
        const returnJson = {
            status: result.success ? 'success' : 'fail',
            message: result.success ? 'task created successfully' : 'did not create'
        }
        res.status(result ? 200 : 400).json(returnJson)
    } catch (error: any) {
        console.error(`Error in createTaskController: ${error}`)
        res.status(500).json({
            status: 'error',
            message: error
        })
    }
}

export const signInUserController = async (req: Request, res: Response) => {
    try{
        const body = userBodySchema.parse(req.body)
        const {email, password} = body;
        const result: ILoginHandleResult = await signInHandler({
            email,
            password,
        })
        res.status(result ? 200 : 400).json(result)
    } catch (error: any) {
        console.error(`Error in signInUserController: ${error}`)
        res.status(500).json({
            status: 'error',
            message: error
        })
    }
}