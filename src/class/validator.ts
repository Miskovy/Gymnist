import { Request, Response, NextFunction } from 'express';
import { body, param, query, validationResult } from 'express-validator';

export const validateClassCreation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('gender').isIn(['mix', 'male', 'female']).withMessage('Gender must be mix, male, or female'),
  body('trainers').optional().isArray().withMessage('Trainers must be an array'),
  body('schedules').optional().isArray().withMessage('Schedules must be an array'),
  body('schedules.*.date').optional().isDate().withMessage('Schedule date must be a valid date'),
  body('schedules.*.timeSlot').optional().notEmpty().withMessage('Schedule time slot is required'),
  body('schedules.*.roomId').optional().isInt().withMessage('Room ID must be an integer')
];

export const validateClassUpdate = [
  param('id').isInt().withMessage('Invalid class ID'),
  body('name').optional().notEmpty().withMessage('Name cannot be empty'),
  body('price').optional().isNumeric().withMessage('Price must be a number'),
  body('gender').optional().isIn(['mix', 'male', 'female']).withMessage('Gender must be mix, male, or female')
];

export const validateClassId = [
  param('id').isInt().withMessage('Invalid class ID')
];

export const validateTrainerClassCreation = [
  param('classId').isInt().withMessage('Invalid class ID'),
  body('trainerId').isInt().withMessage('Trainer ID must be an integer')
];

export const validateScheduleCreation = [
  param('classId').isInt().withMessage('Invalid class ID'),
  body('date').isDate().withMessage('Date must be a valid date'),
  body('timeSlot').notEmpty().withMessage('Time slot is required'),
  body('roomId').isInt().withMessage('Room ID must be an integer')
];

export const validateBookingCreation = [
  body('traineeId').isInt().withMessage('Trainee ID must be an integer'),
  body('classScheduleId').isInt().withMessage('Class schedule ID must be an integer'),
  body('price').isNumeric().withMessage('Price must be a number'),
  body('paymentMethod').notEmpty().withMessage('Payment method is required')
];

export const validateCalendarQuery = [
  query('classId').optional().isInt().withMessage('Class ID must be an integer'),
  query('trainerId').optional().isInt().withMessage('Trainer ID must be an integer')
];

export const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};