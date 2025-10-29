import express from 'express';
import * as traineeController from './controller';
import * as validator from './validator';
import verifyToken from '../middlewares/verifyToken';

const router = express.Router();

router.use(verifyToken);

// Get all trainees
router.get('/', traineeController.getAllTrainees);

// Get trainee by ID
router.get('/:id', validator.validateTraineeId, validator.handleValidationErrors, traineeController.getTraineeById);

// Create new trainee
router.post('/', validator.validateTraineeCreation, validator.handleValidationErrors, traineeController.createTrainee);

// scan trainee
router.post('/scan', traineeController.scanQRCode);

// Update trainee
router.put('/:id', validator.validateTraineeUpdate, validator.handleValidationErrors, traineeController.updateTrainee);

// Delete trainee
router.delete('/:id', validator.validateTraineeId, validator.handleValidationErrors, traineeController.deleteTrainee);

export default router;