import express from 'express';
import * as controller from './controller';
import { validate } from './validator';

const router = express.Router();

// Get all records
router.get('/', controller.getAll);

// Get record by ID
router.get('/:id', controller.getById);

// Create new record
router.post('/', validate, controller.create);

// Update record
router.put('/:id', validate, controller.update);

// Delete record
router.delete('/:id', controller.deleteRecord);

export default router;