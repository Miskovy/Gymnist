import express from 'express';
import * as rentController from './controller';
import * as validator from './validator';
import { hasPrivilege } from '../middlewares/hasPrivilage';
import verifyToken from '../middlewares/verifyToken';

const router = express.Router();

router.use(verifyToken);

router.get('/', /*hasPrivilege('Rent', 'View'),*/ rentController.getAllRents);
router.get('/:id', validator.validateRentId, validator.handleValidationErrors, rentController.getRentById);
router.post('/', /*hasPrivilege('Rent', 'Create'),*/ validator.validateRentCreation, validator.handleValidationErrors, rentController.createRent);
router.put('/:id', validator.validateRentUpdate, validator.handleValidationErrors, rentController.updateRent);
router.delete('/:id', validator.validateRentId, validator.handleValidationErrors, rentController.deleteRent);

export default router;