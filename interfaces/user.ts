export interface IUser {
    email: string
    password: string

}

export interface ILoginHandleResult {
    success: boolean,
    message?: string,
    token?: string
}