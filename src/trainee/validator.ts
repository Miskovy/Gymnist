import { Request, Response, NextFunction } from 'express';
import { body, param, validationResult } from 'express-validator';

export const validateTraineeCreation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('phone').notEmpty().withMessage('Phone is required'),
  body('email').optional().isEmail().withMessage('Invalid email format'),
  body('gender').optional().isIn(['male', 'female', 'other']).withMessage('Gender must be male, female, or other'),
  body('birthDate').optional().isDate().withMessage('Birth date must be a valid date'),
  body('age').optional().isInt({ min: 0 }).withMessage('Age must be a positive number'),
  body('countryId').optional().isInt().withMessage('Country ID must be an integer'),
  body('cityId').optional().isInt().withMessage('City ID must be an integer'),
  body('stateId').optional().isInt().withMessage('State ID must be an integer'),
  body('nationality').optional().isString().withMessage('Nationality must be a string')
];

export const validateTraineeUpdate = [
  param('id').isInt().withMessage('Invalid trainee ID'),
  body('name').optional().notEmpty().withMessage('Name cannot be empty'),
  body('phone').optional().notEmpty().withMessage('Phone cannot be empty'),
  body('email').optional().isEmail().withMessage('Invalid email format'),
  body('gender').optional().isIn(['male', 'female', 'other']).withMessage('Gender must be male, female, or other'),
  body('birthDate').optional().isDate().withMessage('Birth date must be a valid date'),
  body('age').optional().isInt({ min: 0 }).withMessage('Age must be a positive number'),
  body('countryId').optional().isInt().withMessage('Country ID must be an integer'),
  body('cityId').optional().isInt().withMessage('City ID must be an integer'),
  body('stateId').optional().isInt().withMessage('State ID must be an integer'),
  body('nationality').optional().isString().withMessage('Nationality must be a string')
];

export const validateTraineeId = [
  param('id').isInt().withMessage('Invalid trainee ID'),
];

export const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};