"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
exports.userRouter = (0, express_1.Router)();
exports.userRouter.post('/signup', userController_1.signUpUserController);
exports.userRouter.post('/signin', userController_1.signInUserController);
