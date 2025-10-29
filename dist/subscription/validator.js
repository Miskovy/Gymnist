"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.validateSubscription = void 0;
const express_validator_1 = require("express-validator");
exports.validateSubscription = [
    (0, express_validator_1.body)('traineeId').isInt().withMessage('Trainee ID is required'),
    (0, express_validator_1.body)('packageId').isInt().withMessage('Package ID is required'),
    (0, express_validator_1.body)('duration').isIn(['Monthly', 'Quarterly', 'Semi_Annually', 'Annually']).withMessage('Valid duration is required'),
    (0, express_validator_1.body)('price').isFloat().withMessage('Price is required'),
    (0, express_validator_1.body)('paymentMethodId').isInt().withMessage('Payment method ID is required'),
    (0, express_validator_1.body)('startDate').isISO8601().withMessage('Valid start date is required'),
    (0, express_validator_1.body)('endDate').isISO8601().withMessage('Valid end date is required'),
];
const validate = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
exports.validate = validate;
