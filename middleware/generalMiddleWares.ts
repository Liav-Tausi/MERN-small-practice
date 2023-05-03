import {NextFunction, Response, Request} from "express";
import * as jwt from "jsonwebtoken";
import {jwtSecret} from "../handlers/userHandler";

export const requestUrlMiddleWare = (req: Request, res: Response, next: NextFunction) => {
    console.log(`request url: ${req.url}`)
    next()
}

export const validateJwtMiddleWare = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token: string | undefined = req.headers.authorization?.split('')[1]
        if (!token) throw new Error('token error')
        const access: any = jwt.verify(token, jwtSecret)
        req.body.user_id = access.user_id
        next()
    }  catch (error: any) {
        console.error(`Error in validateJwtMiddleWare: ${error}`)
        res.status(400).json({
            status: 'error',
            message: error
        })
    }
}