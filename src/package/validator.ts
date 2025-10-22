import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validatePackage = [
  body('name').notEmpty().withMessage('Package name is required'),
  body('maxEntranceCount').isInt().withMessage('Max entrance count is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('startDate').isISO8601().withMessage('Valid start date is required'),
  body('endDate').isISO8601().withMessage('Valid end date is required'),
  body('paymentMethodId').isInt().withMessage('Payment method ID is required'),
  body('priceMonthly').isFloat().withMessage('Monthly price is required'),
  body('priceQuarterly').isFloat().withMessage('Quarterly price is required'),
  body('priceSemiAnnually').isFloat().withMessage('Semi-annual price is required'),
  body('priceAnnually').isFloat().withMessage('Annual price is required'),
];

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};