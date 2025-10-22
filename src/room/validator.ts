import { body, param, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validateRoomCreation = [
  body('name').notEmpty().withMessage('Room name is required'),
  body('capacity').isInt({ min: 0 }).withMessage('Capacity must be a positive number'),
  body('description').optional(),
  body('thumbnail').optional(),
];

export const validateRoomUpdate = [
  param('id').isInt().withMessage('Invalid room ID'),
  body('name').optional().notEmpty().withMessage('Room name cannot be empty'),
  body('capacity').optional().isInt({ min: 0 }).withMessage('Capacity must be a positive number'),
  body('description').optional(),
  body('thumbnail').optional(),
];

export const validateRoomId = [
  param('id').isInt().withMessage('Invalid room ID'),
];

export const validateRoomImageUpload = [
  param('roomId').isInt().withMessage('Invalid room ID'),
];

export const validateRoomImageId = [
  param('id').isInt().withMessage('Invalid gallery item ID'),
];

export const handleValidationErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};