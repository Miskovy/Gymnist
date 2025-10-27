import express from 'express';
import * as trainerController from './controller';
import * as validator from './validator';

const router = express.Router();

router.get('/', trainerController.getAllTrainers);
router.get('/:id', validator.validateTrainerId, validator.handleValidationErrors, trainerController.getTrainerById);
router.post('/', validator.validateTrainerCreation, validator.handleValidationErrors, trainerController.createTrainer);
router.post('/scan', trainerController.scanQRCode);
router.put('/:id', validator.validateTrainerUpdate, validator.handleValidationErrors, trainerController.updateTrainer);
router.delete('/:id', validator.validateTrainerId, validator.handleValidationErrors, trainerController.deleteTrainer);

export default router;