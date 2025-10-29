"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidationErrors = exports.validateRoomImageId = exports.validateRoomImageUpload = exports.validateRoomId = exports.validateRoomUpdate = exports.validateRoomCreation = void 0;
const express_validator_1 = require("express-validator");
exports.validateRoomCreation = [
    (0, express_validator_1.body)('name').notEmpty().withMessage('Room name is required'),
    (0, express_validator_1.body)('capacity').isInt({ min: 0 }).withMessage('Capacity must be a positive number'),
    (0, express_validator_1.body)('description').optional(),
    (0, express_validator_1.body)('thumbnail').optional(),
];
exports.validateRoomUpdate = [
    (0, express_validator_1.param)('id').isInt().withMessage('Invalid room ID'),
    (0, express_validator_1.body)('name').optional().notEmpty().withMessage('Room name cannot be empty'),
    (0, express_validator_1.body)('capacity').optional().isInt({ min: 0 }).withMessage('Capacity must be a positive number'),
    (0, express_validator_1.body)('description').optional(),
    (0, express_validator_1.body)('thumbnail').optional(),
];
exports.validateRoomId = [
    (0, express_validator_1.param)('id').isInt().withMessage('Invalid room ID'),
];
exports.validateRoomImageUpload = [
    (0, express_validator_1.param)('roomId').isInt().withMessage('Invalid room ID'),
];
exports.validateRoomImageId = [
    (0, express_validator_1.param)('id').isInt().withMessage('Invalid gallery item ID'),
];
const handleValidationErrors = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
exports.handleValidationErrors = handleValidationErrors;
