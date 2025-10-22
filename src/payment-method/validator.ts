import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validatePaymentMethod = [
  body('name').notEmpty().withMessage('Payment method name is required'),
  body('type').isIn(['Auto', 'Manual']).withMessage('Type must be either Auto or Manual'),
  body('isActive').optional().isBoolean().withMessage('isActive must be a boolean'),
];

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};