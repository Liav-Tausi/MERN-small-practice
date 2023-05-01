import {Request, Response} from "express";
import {createTaskHandler, delTaskHandler, getTasksHandler, updateTaskHandler} from "../handlers/taskHandler";
import {ITask, ITaskDisplay} from "../interfaces/tasks";
import {taskBodySchema} from "../middleware/bodyValidators";

export const getTasksController = (req: Request, res: Response)=> {
    try {
        const queryParams = req.query;
        const {user_id} = queryParams
        const result: ITaskDisplay[] = getTasksHandler(String(user_id))
        console.log(queryParams)
        res.status(200).json({
            status: 'success',
            result
        })
    } catch (error: any) {
        console.error(`Error in getTasksController: ${error.stack}`)
        res.status(500).json({
            status: 'fail',
            error: error.message
        })
    }
}

export const createTaskController = (req: Request, res: Response) => {
    try{
        const body = taskBodySchema.parse(req.body)
        const {title, description, isDone, user_id} = body;
        const result = createTaskHandler({
            title,
            description,
            isDone,
            user_id
        })
        const returnJson = {
            status: result ? 'success' : 'fail',
            message: result ? 'task created successfully' : 'did not create'
        }
        res.status(result ? 200 : 400).json(returnJson)
    } catch (error: any) {
        console.error(`Error in createTaskController: ${error}`)
        res.status(400).json({
            status: 'error',
            message: error
        })
    }
}


export const updateTaskCollector = (req: Request, res: Response) => {
    try {
        const body: ITask = taskBodySchema.parse(req.body)
        const result: Boolean = updateTaskHandler(body)
        const returnJson = {
            status: result ? 'success' : 'fail',
            message: result ? 'task updated successfully' : 'did not update'
        }
        res.status(result ? 200 : 400).json(returnJson)
    } catch (error: any) {
        console.error(`Error in updateTaskController: ${error}`)
        res.status(400).json({
            status: 'error',
            message: error
        })
    }
}

export const delTaskCollector = (req: Request, res: Response) => {
    try {
        const body: ITask = taskBodySchema.parse(req.body)
        const result: Boolean = delTaskHandler(body)
        const returnJson = {
            status: result ? 'success' : 'fail',
            message: result ? 'task updated successfully' : 'did not update'
        }
        res.status(result ? 200 : 400).json(returnJson)
    } catch (error: any) {
        console.error(`Error in updateTaskController: ${error}`)
        res.status(400).json({
            status: 'error',
            message: error
        })
    }
}