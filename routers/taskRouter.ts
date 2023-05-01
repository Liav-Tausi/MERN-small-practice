import {Router} from "express";
import {
    createTaskController,
    delTaskCollector,
    getTasksController,
    updateTaskCollector
} from "../controllers/taskController";

export const taskRouter: Router = Router()

taskRouter.get('/', getTasksController)
taskRouter.post('/', createTaskController)
taskRouter.patch('/', updateTaskCollector)
taskRouter.delete('/', delTaskCollector)