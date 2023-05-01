
export interface ITaskDisplay {
    title: string;
    description?: string;
    isDone: boolean;
}

export interface ITask extends ITaskDisplay{
    user_id: string;
}




