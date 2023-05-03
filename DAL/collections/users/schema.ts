import {Db} from "mongodb";
import {checkIfCollectionExist} from "../../connection";

export const USERS_COLLECTION_NAME = 'users';


const DROP_COLLECTION = false;

export const createUsersCollection = async (db: Db) => {
    try {
        const isCollectionExist: boolean = await checkIfCollectionExist(
            db,
            USERS_COLLECTION_NAME
        );
        if (isCollectionExist && DROP_COLLECTION) {
            await db.dropCollection(USERS_COLLECTION_NAME);
        } else if (isCollectionExist) {
            return;
        }
        const usersCollection = await db.createCollection(USERS_COLLECTION_NAME, {
            validator: {
                $jsonSchema: {
                    bsonType: 'object',
                    required: [
                        'email',
                        'password',
                        // 'firstName',
                    ],
                    properties: {
                        email: {
                            bsonType: 'string',
                            description: 'must be a string and is required',
                            pattern:
                                '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$',
                        },
                        password: {
                            bsonType: 'string',
                            description: 'must be a string and is required',
                        },
                        // firstName: {
                        //     bsonType: 'string',
                        //     description: 'must be a string and is required',
                        //     pattern: '^[a-zA-Z\\s]{1,}$', // TODO: think it through
                        // },
                    },
                },
            },
            validationAction: 'error',
            validationLevel: 'strict',
        });

        if (usersCollection) {
            // index the email field
            await usersCollection.createIndex({ email: 1 }, { unique: true });
        }
    } catch (error: any) {
        console.error(`Error creating users collection: ${error.stack}`);
        throw error;
    }
};