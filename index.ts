import express, {Express, NextFunction, Request, Response} from "express"
import cors from "cors"
import helmet from "helmet"
import compression from "compression"
import {taskRouter} from "./routers/taskRouter";
import {createCollections, establishDBConnection} from "./DAL/connection";
import {Db} from "mongodb";
import {userRouter} from "./routers/userRouter";
import {requestUrlMiddleWare} from "./middleware/generalMiddleWares";


const app: Express = express();

app.use(cors())
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(requestUrlMiddleWare)

app.use('/tasks', taskRouter);
app.use('/auth', userRouter)

export let db: Db;
const connectToDb = async () => {
    try {
        db = await establishDBConnection()
        await createCollections(db);
    } catch (error: any) {
        throw error
    }
}

connectToDb().then(async () => {

    console.log('Connected to DB')

    //launching the app
    app.listen(8000, () => {
        console.log('express app is running on 8000')
    })
    // const user1 = {
    //     email: 'user1@gmail.com',
    //     password: '12345678',
    //     firstName: 'First'
    // }
    // const result = await insertNewUser(user1)
    // console.log(result)
}).catch((error: any) => {
    console.log('Failed connecting to DB')
    throw error;
})