"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appError_1 = require("../utils/appError");
const sendErrorForDev = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });
};
const sendErrorForProd = (err, res) => {
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
};
const handleJWTInvalidSignature = () => new appError_1.AppError('Invalid token, please login again...', 401);
const handleJWTTokenExpiredError = () => new appError_1.AppError('Token expired, please login again...', 401);
const globalError = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    if (process.env.NODE_ENV === 'development') {
        sendErrorForDev(err, res);
    }
    else {
        if (err.name === 'JsonWebTokenError')
            err = handleJWTInvalidSignature();
        if (err.name === 'TokenExpiredError')
            err = handleJWTTokenExpiredError();
        sendErrorForProd(err, res);
    }
};
exports.default = globalError;
