import {USERS_COLLECTION_NAME} from "./schema";
import {Collection, InsertOneResult} from 'mongodb'
import {db} from "../../../index";

export const insertNewUser = async (user: any) => {
    const usersCollection: Collection = db.collection(USERS_COLLECTION_NAME);
    try {
        const result: InsertOneResult = await usersCollection.insertOne(user);
        return { success: true, ...result };
    } catch (error: any) {
        console.error(`Error Message: ${error.message}`, {
            functionName: insertNewUser.name,
        });
        return { success: false, error: error.message };
    }
};


export const getUser = async (email: string) => {
    const usersCollection: Collection = db.collection(USERS_COLLECTION_NAME);
    try {
        return await usersCollection.findOne({email});
    } catch (error: any) {
        console.error(`Error Message: ${error.message}`, {
            functionName: getUser.name,
        });
        throw Error(`Error Message: ${error.message}`)
    }
};