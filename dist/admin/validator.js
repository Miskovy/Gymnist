"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validatePrivileges = exports.validateAdminId = exports.validateAdminUpdate = exports.validateAdmin = void 0;
const express_validator_1 = require("express-validator");
// Validation middleware
exports.validateAdmin = [
    (0, express_validator_1.body)('email').isEmail().withMessage('Valid email is required'),
    (0, express_validator_1.body)('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }
        next();
    }
];
exports.validateAdminUpdate = [
    (0, express_validator_1.body)('email').optional().isEmail().withMessage('Valid email is required'),
    (0, express_validator_1.body)('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }
        next();
    }
];
exports.validateAdminId = [
    (0, express_validator_1.param)('id').isInt().withMessage('Admin ID must be an integer'),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }
        next();
    }
];
exports.validatePrivileges = [
    (0, express_validator_1.body)('privilegesIds').isArray().withMessage('Privileges IDs must be an array'),
    (0, express_validator_1.body)('privilegesIds.*').isInt().withMessage('Each privilege ID must be an integer'),
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }
        next();
    }
];
