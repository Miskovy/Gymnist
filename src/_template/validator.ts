import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

// Validation rules
export const validationRules = [
  // Add your validation rules here
  body('name').notEmpty().withMessage('Name is required'),
  // Add more validation rules as needed
];

// Middleware to validate
export const validate = [
  ...validationRules,
  (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        status: 'error',
        errors: errors.array()
      });
      return;
    }
    next();
  }
];