"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInUserController = exports.signUpUserController = void 0;
const userHandler_1 = require("../handlers/userHandler");
const bodyValidators_1 = require("../middleware/bodyValidators");
const signUpUserController = async (req, res) => {
    try {
        const body = bodyValidators_1.userBodySchema.parse(req.body);
        const { email, password } = body;
        const result = await (0, userHandler_1.signUpHandler)({
            email,
            password,
        });
        const returnJson = {
            status: result.success ? 'success' : 'fail',
            message: result.success ? 'task created successfully' : 'did not create'
        };
        res.status(result ? 200 : 400).json(returnJson);
    }
    catch (error) {
        console.error(`Error in createTaskController: ${error}`);
        res.status(500).json({
            status: 'error',
            message: error
        });
    }
};
exports.signUpUserController = signUpUserController;
const signInUserController = async (req, res) => {
    console.log(req);
    try {
        const body = bodyValidators_1.userBodySchema.parse(req.body);
        const { email, password } = body;
        const result = await (0, userHandler_1.signInHandler)({
            email,
            password,
        });
        const statusCode = result.success ? 200 : 400;
        res.status(statusCode).json(result);
    }
    catch (error) {
        console.error(`Error in signInUserController: ${error}`);
        res.status(500).json({
            status: 'error',
            message: error
        });
    }
};
exports.signInUserController = signInUserController;
