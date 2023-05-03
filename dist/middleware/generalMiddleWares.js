"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestUrlMiddleWare = void 0;
const requestUrlMiddleWare = (req, res, next) => {
    console.log(`request url: ${req.url}`);
    next();
};
exports.requestUrlMiddleWare = requestUrlMiddleWare;
