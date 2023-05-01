import {ITask} from "../interfaces/tasks";

const task1: ITask = {
    title: 'HomeWork',
    description: 'page 7',
    isDone: false,
    user_id: '1'

}

const task2: ITask = {
    title: 'Run',
    isDone: false,
    user_id: '2'
}

const tasks: ITask[] = [task1, task2]

export const getTasksDal = (user_id: string) : ITask[] => {
    return tasks.filter((task: ITask): boolean => {
        return task.user_id === user_id
    })
}

export const createTaskDal = (task: ITask): boolean => {
    try {
        tasks.push(task);
        return true;
    } catch (error: any) {
        console.error(`error inserting task: ${error.message}`)
        return false
    }
}


export const updateTaskDal = (task: ITask): boolean => {
    try {
        const index: number = tasks.findIndex((obj: ITask): boolean => obj.user_id === task.user_id);
        tasks.splice(index, 1, task);
        return true;
    } catch (error: any) {
        console.error(`error inserting task: ${error.message}`)
        return false
    }
}

export const delTaskDal = (task: ITask): boolean => {
    try {
        const index: number = tasks.findIndex((obj: ITask): boolean => obj.user_id === task.user_id);
        tasks.splice(index, 1);
        return true;
    } catch (error: any) {
        console.error(`error inserting task: ${error.message}`)
        return false
    }
}


