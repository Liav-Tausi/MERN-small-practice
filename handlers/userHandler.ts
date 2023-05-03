import {getUser, insertNewUser} from "../DAL/collections/users/querys";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import {ILoginHandleResult, IUser} from "../interfaces/user";

export const jwtSecret: string = 'wfwefe423423f2f2f4cv252tfr34ty423423f2ft53t4cv'


export const signUpHandler = async (user: IUser) => {
    user.password = await bcrypt.hash(user.password, 10);
    return await insertNewUser(user);
}

export const signInHandler = async (user: IUser): Promise<ILoginHandleResult> => {
    const userResult: any = await getUser(user.email);
    if (!userResult) return {success: false, message: 'email does not exist in database'}
    const isPasswordEqual= await bcrypt.compare(user.password, userResult.password)
    if (!isPasswordEqual) return {success: false, message: 'incorrect password'}
    const token = jwt.sign({user_id: userResult._id}, jwtSecret, {expiresIn: "1m"})
    return {
        success: true,
        token
    }
}