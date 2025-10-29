"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidationErrors = exports.validateTraineeId = exports.validateTraineeUpdate = exports.validateTraineeCreation = void 0;
const express_validator_1 = require("express-validator");
exports.validateTraineeCreation = [
    (0, express_validator_1.body)('name').notEmpty().withMessage('Name is required'),
    (0, express_validator_1.body)('phone').notEmpty().withMessage('Phone is required'),
    (0, express_validator_1.body)('email').optional().isEmail().withMessage('Invalid email format'),
    (0, express_validator_1.body)('gender').optional().isIn(['male', 'female', 'other']).withMessage('Gender must be male, female, or other'),
    (0, express_validator_1.body)('birthDate').optional().isDate().withMessage('Birth date must be a valid date'),
    (0, express_validator_1.body)('age').optional().isInt({ min: 0 }).withMessage('Age must be a positive number'),
    (0, express_validator_1.body)('countryId').optional().isInt().withMessage('Country ID must be an integer'),
    (0, express_validator_1.body)('cityId').optional().isInt().withMessage('City ID must be an integer'),
    (0, express_validator_1.body)('stateId').optional().isInt().withMessage('State ID must be an integer'),
    (0, express_validator_1.body)('nationality').optional().isString().withMessage('Nationality must be a string')
];
exports.validateTraineeUpdate = [
    (0, express_validator_1.param)('id').isInt().withMessage('Invalid trainee ID'),
    (0, express_validator_1.body)('name').optional().notEmpty().withMessage('Name cannot be empty'),
    (0, express_validator_1.body)('phone').optional().notEmpty().withMessage('Phone cannot be empty'),
    (0, express_validator_1.body)('email').optional().isEmail().withMessage('Invalid email format'),
    (0, express_validator_1.body)('gender').optional().isIn(['male', 'female', 'other']).withMessage('Gender must be male, female, or other'),
    (0, express_validator_1.body)('birthDate').optional().isDate().withMessage('Birth date must be a valid date'),
    (0, express_validator_1.body)('age').optional().isInt({ min: 0 }).withMessage('Age must be a positive number'),
    (0, express_validator_1.body)('countryId').optional().isInt().withMessage('Country ID must be an integer'),
    (0, express_validator_1.body)('cityId').optional().isInt().withMessage('City ID must be an integer'),
    (0, express_validator_1.body)('stateId').optional().isInt().withMessage('State ID must be an integer'),
    (0, express_validator_1.body)('nationality').optional().isString().withMessage('Nationality must be a string')
];
exports.validateTraineeId = [
    (0, express_validator_1.param)('id').isInt().withMessage('Invalid trainee ID'),
];
const handleValidationErrors = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
exports.handleValidationErrors = handleValidationErrors;
