"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.validateState = exports.validateCity = exports.validateCountry = void 0;
const express_validator_1 = require("express-validator");
// Country validation
exports.validateCountry = [
    (0, express_validator_1.body)('name').notEmpty().withMessage('Country name is required'),
];
// City validation
exports.validateCity = [
    (0, express_validator_1.body)('name').notEmpty().withMessage('City name is required'),
    (0, express_validator_1.body)('countryId').isInt().withMessage('Valid country ID is required'),
];
// State validation
exports.validateState = [
    (0, express_validator_1.body)('name').notEmpty().withMessage('State name is required'),
    (0, express_validator_1.body)('cityId').isInt().withMessage('Valid city ID is required'),
];
// Validation results middleware
const validate = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
exports.validate = validate;
