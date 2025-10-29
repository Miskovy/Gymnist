"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.validatePaymentMethod = void 0;
const express_validator_1 = require("express-validator");
exports.validatePaymentMethod = [
    (0, express_validator_1.body)('name').notEmpty().withMessage('Payment method name is required'),
    (0, express_validator_1.body)('type').isIn(['Auto', 'Manual']).withMessage('Type must be either Auto or Manual'),
    (0, express_validator_1.body)('isActive').optional().isBoolean().withMessage('isActive must be a boolean'),
];
const validate = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
exports.validate = validate;
