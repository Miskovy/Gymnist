"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidationErrors = exports.validateRentUpdate = exports.validateRentCreation = exports.validateRentId = void 0;
const express_validator_1 = require("express-validator");
const express_validator_2 = require("express-validator");
exports.validateRentId = [
    (0, express_validator_1.param)('id').isInt().withMessage('Invalid rent ID'),
];
exports.validateRentCreation = [
    (0, express_validator_1.body)('roomId')
        .isInt()
        .withMessage('Room ID must be an integer'),
    (0, express_validator_1.body)('trainerId')
        .isInt()
        .withMessage('Trainer ID must be an integer'),
    (0, express_validator_1.body)('price')
        .isFloat({ min: 0 })
        .withMessage('Price must be a positive number'),
    (0, express_validator_1.body)('startDate')
        .isISO8601()
        .withMessage('Start date must be a valid date'),
    (0, express_validator_1.body)('endDate')
        .isISO8601()
        .withMessage('End date must be a valid date')
        .custom((endDate, { req }) => {
        if (new Date(endDate) <= new Date(req.body.startDate)) {
            throw new Error('End date must be after start date');
        }
        return true;
    }),
];
exports.validateRentUpdate = [
    (0, express_validator_1.param)('id').isInt().withMessage('Invalid rent ID'),
    (0, express_validator_1.body)('roomId')
        .optional()
        .isInt()
        .withMessage('Room ID must be an integer'),
    (0, express_validator_1.body)('trainerId')
        .optional()
        .isInt()
        .withMessage('Trainer ID must be an integer'),
    (0, express_validator_1.body)('price')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('Price must be a positive number'),
    (0, express_validator_1.body)('startDate')
        .optional()
        .isISO8601()
        .withMessage('Start date must be a valid date'),
    (0, express_validator_1.body)('endDate')
        .optional()
        .isISO8601()
        .withMessage('End date must be a valid date')
        .custom((endDate, { req }) => {
        if (req.body.startDate && new Date(endDate) <= new Date(req.body.startDate)) {
            throw new Error('End date must be after start date');
        }
        return true;
    }),
];
const handleValidationErrors = (req, res, next) => {
    const errors = (0, express_validator_2.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
exports.handleValidationErrors = handleValidationErrors;
