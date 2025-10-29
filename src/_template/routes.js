const express = require('express');
const router = express.Router();
const controller = require('./controller');
const { validate } = require('./validator');

// Get all records
router.get('/', controller.getAll);

// Get record by ID
router.get('/:id', controller.getById);

// Create new record
router.post('/', validate, controller.create);

// Update record
router.put('/:id', validate, controller.update);

// Delete record
router.delete('/:id', controller.delete);

module.exports = router;