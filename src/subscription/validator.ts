import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validateSubscription = [
  body('traineeId').isInt().withMessage('Trainee ID is required'),
  body('packageId').isInt().withMessage('Package ID is required'),
  body('duration').isIn(['Monthly', 'Quarterly', 'Semi_Annually', 'Annually']).withMessage('Valid duration is required'),
  body('price').isFloat().withMessage('Price is required'),
  body('paymentMethodId').isInt().withMessage('Payment method ID is required'),
  body('startDate').isISO8601().withMessage('Valid start date is required'),
  body('endDate').isISO8601().withMessage('Valid end date is required'),
];

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};