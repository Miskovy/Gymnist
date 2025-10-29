const { body, validationResult } = require('express-validator');

// Validation rules
const validationRules = [
  // Add your validation rules here
  body('name').notEmpty().withMessage('Name is required'),
  // Add more validation rules as needed
];

// Middleware to validate
exports.validate = [
  ...validationRules,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        status: 'error',
        errors: errors.array()
      });
    }
    next();
  }
];