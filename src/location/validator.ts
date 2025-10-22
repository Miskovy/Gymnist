import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

// Country validation
export const validateCountry = [
  body('name').notEmpty().withMessage('Country name is required'),
];

// City validation
export const validateCity = [
  body('name').notEmpty().withMessage('City name is required'),
  body('countryId').isInt().withMessage('Valid country ID is required'),
];

// State validation
export const validateState = [
  body('name').notEmpty().withMessage('State name is required'),
  body('cityId').isInt().withMessage('Valid city ID is required'),
];

// Validation results middleware
export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};