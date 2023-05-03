"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInHandler = exports.signUpHandler = void 0;
const querys_1 = require("../DAL/collections/users/querys");
const bcrypt = __importStar(require("bcrypt"));
const jwt = __importStar(require("jsonwebtoken"));
const jwtSecret = 'wfwefe423423f2f2f4cv252tfr34ty423423f2ft53t4cv';
const signUpHandler = async (user) => {
    user.password = await bcrypt.hash(user.password, 10);
    return await (0, querys_1.insertNewUser)(user);
};
exports.signUpHandler = signUpHandler;
const signInHandler = async (user) => {
    const userResult = await (0, querys_1.getUser)(user.email);
    if (!userResult)
        return { success: false, message: 'email does not exist in database' };
    const isPasswordEqual = await bcrypt.compare(user.password, userResult.password);
    if (!isPasswordEqual)
        return { success: false, message: 'incorrect password' };
    const token = jwt.sign({ user_id: userResult._id }, jwtSecret);
    return {
        success: true,
        token
    };
};
exports.signInHandler = signInHandler;
