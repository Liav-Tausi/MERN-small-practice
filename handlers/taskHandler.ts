import {ITask, ITaskDisplay} from "../interfaces/tasks";
import {createTaskDal, delTaskDal, getTasksDal, updateTaskDal} from "../DAL/taskDal";
import * as jwt from "jsonwebtoken"
import {jwtSecret} from "./userHandler";

export const getTasksHandler = (user_id: string): ITaskDisplay[]=>{
    const dbResult: ITask[] = getTasksDal(user_id)
    const displayedTasks = dbResult.map((task: ITask): ITaskDisplay => {
        const {title, description, isDone} = task
        return {
            title,
            description,
            isDone
        }
    })
    console.log(`Displayed tasks: ${displayedTasks}`)
    return displayedTasks
}

export const createTaskHandler = (task: ITask) => {
    return createTaskDal(task);
}

export const updateTaskHandler = (task: ITask) => {
    return updateTaskDal(task)
}

export const delTaskHandler = (task: ITask) => {
    return delTaskDal(task)
}