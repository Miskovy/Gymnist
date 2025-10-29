"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.validatePackage = void 0;
const express_validator_1 = require("express-validator");
exports.validatePackage = [
    (0, express_validator_1.body)('name').notEmpty().withMessage('Package name is required'),
    (0, express_validator_1.body)('maxEntranceCount').isInt().withMessage('Max entrance count is required'),
    (0, express_validator_1.body)('description').notEmpty().withMessage('Description is required'),
    (0, express_validator_1.body)('startDate').isISO8601().withMessage('Valid start date is required'),
    (0, express_validator_1.body)('endDate').isISO8601().withMessage('Valid end date is required'),
    (0, express_validator_1.body)('paymentMethodId').isInt().withMessage('Payment method ID is required'),
    (0, express_validator_1.body)('priceMonthly').isFloat().withMessage('Monthly price is required'),
    (0, express_validator_1.body)('priceQuarterly').isFloat().withMessage('Quarterly price is required'),
    (0, express_validator_1.body)('priceSemiAnnually').isFloat().withMessage('Semi-annual price is required'),
    (0, express_validator_1.body)('priceAnnually').isFloat().withMessage('Annual price is required'),
];
const validate = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
exports.validate = validate;
