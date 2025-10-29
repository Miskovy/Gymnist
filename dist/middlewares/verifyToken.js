"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const appError_1 = require("../utils/appError");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'] || req.headers['Authorization'];
    if (!authHeader) {
        return next(new appError_1.AppError('No token provided', 401));
    }
    const token = authHeader.split(' ')[1];
    try {
        const currentUser = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
        req.currentUser = currentUser;
        next();
    }
    catch (err) {
        return next(new appError_1.AppError('Invalid token', 401));
    }
};
exports.default = verifyToken;
