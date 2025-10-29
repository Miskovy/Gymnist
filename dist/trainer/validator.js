"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidationErrors = exports.validateTrainerId = exports.validateTrainerUpdate = exports.validateTrainerCreation = void 0;
const express_validator_1 = require("express-validator");
exports.validateTrainerCreation = [
    (0, express_validator_1.body)('name').notEmpty().withMessage('Name is required'),
    (0, express_validator_1.body)('email').isEmail().withMessage('Valid email is required'),
    (0, express_validator_1.body)('phone').optional().isMobilePhone('any').withMessage('Valid phone number is required'),
    (0, express_validator_1.body)('specialization').optional(),
    (0, express_validator_1.body)('bio').optional(),
    (0, express_validator_1.body)('image').optional(),
];
exports.validateTrainerUpdate = [
    (0, express_validator_1.param)('id').isInt().withMessage('Invalid trainer ID'),
    (0, express_validator_1.body)('name').optional().notEmpty().withMessage('Name cannot be empty'),
    (0, express_validator_1.body)('email').optional().isEmail().withMessage('Valid email is required'),
    (0, express_validator_1.body)('phone').optional().isMobilePhone('any').withMessage('Valid phone number is required'),
    (0, express_validator_1.body)('specialization').optional(),
    (0, express_validator_1.body)('bio').optional(),
    (0, express_validator_1.body)('image').optional(),
];
exports.validateTrainerId = [
    (0, express_validator_1.param)('id').isInt().withMessage('Invalid trainer ID'),
];
const handleValidationErrors = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
exports.handleValidationErrors = handleValidationErrors;
