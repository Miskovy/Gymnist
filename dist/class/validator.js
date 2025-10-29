"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleValidationErrors = exports.validateCalendarParams = exports.validateBookingCreation = exports.validateScheduleCreation = exports.validateTrainerClassCreation = exports.validateClassId = exports.validateClassUpdate = exports.validateClassCreation = void 0;
const express_validator_1 = require("express-validator");
exports.validateClassCreation = [
    (0, express_validator_1.body)('name').notEmpty().withMessage('Name is required'),
    (0, express_validator_1.body)('price').isNumeric().withMessage('Price must be a number'),
    (0, express_validator_1.body)('gender').isIn(['mix', 'male', 'female']).withMessage('Gender must be mix, male, or female'),
    (0, express_validator_1.body)('trainers').optional().isArray().withMessage('Trainers must be an array'),
    (0, express_validator_1.body)('schedules').optional().isArray().withMessage('Schedules must be an array'),
    (0, express_validator_1.body)('schedules.*.date').optional().isDate().withMessage('Schedule date must be a valid date'),
    (0, express_validator_1.body)('schedules.*.timeSlot').optional().notEmpty().withMessage('Schedule time slot is required'),
    (0, express_validator_1.body)('schedules.*.roomId').optional().isInt().withMessage('Room ID must be an integer')
];
exports.validateClassUpdate = [
    (0, express_validator_1.param)('id').isInt().withMessage('Invalid class ID'),
    (0, express_validator_1.body)('name').optional().notEmpty().withMessage('Name cannot be empty'),
    (0, express_validator_1.body)('price').optional().isNumeric().withMessage('Price must be a number'),
    (0, express_validator_1.body)('gender').optional().isIn(['mix', 'male', 'female']).withMessage('Gender must be mix, male, or female')
];
exports.validateClassId = [
    (0, express_validator_1.param)('id').isInt().withMessage('Invalid class ID')
];
exports.validateTrainerClassCreation = [
    (0, express_validator_1.param)('classId').isInt().withMessage('Invalid class ID'),
    (0, express_validator_1.body)('trainerId').isInt().withMessage('Trainer ID must be an integer')
];
exports.validateScheduleCreation = [
    (0, express_validator_1.param)('classId').isInt().withMessage('Invalid class ID'),
    (0, express_validator_1.body)('date').isDate().withMessage('Date must be a valid date'),
    (0, express_validator_1.body)('timeSlot').notEmpty().withMessage('Time slot is required'),
    (0, express_validator_1.body)('roomId').isInt().withMessage('Room ID must be an integer')
];
exports.validateBookingCreation = [
    (0, express_validator_1.body)('traineeId').isInt().withMessage('Trainee ID must be an integer'),
    (0, express_validator_1.body)('classScheduleId').isInt().withMessage('Class schedule ID must be an integer'),
    (0, express_validator_1.body)('price').isNumeric().withMessage('Price must be a number'),
    (0, express_validator_1.body)('paymentMethod').notEmpty().withMessage('Payment method is required')
];
exports.validateCalendarParams = [
    (0, express_validator_1.param)('classId')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Class ID must be a positive integer'),
    (0, express_validator_1.param)('trainerId')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Trainer ID must be a positive integer')
];
const handleValidationErrors = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
exports.handleValidationErrors = handleValidationErrors;
