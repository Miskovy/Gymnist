import express from 'express';
import * as trainerController from './controller';
import * as validator from './validator';
import { hasPrivilege } from '../middlewares/hasPrivilage';
import  verifyToken  from '../middlewares/verifyToken';



const router = express.Router();

router.use(verifyToken);


router.get('/', hasPrivilege('Trainer', 'View') ,trainerController.getAllTrainers);
router.get('/:id', validator.validateTrainerId, validator.handleValidationErrors, trainerController.getTrainerById);
router.post('/', hasPrivilege('Trainer', 'Create') ,validator.validateTrainerCreation, validator.handleValidationErrors, trainerController.createTrainer);
router.post('/scan', trainerController.scanQRCode);
router.put('/:id', validator.validateTrainerUpdate, validator.handleValidationErrors, trainerController.updateTrainer);
router.delete('/:id', validator.validateTrainerId, validator.handleValidationErrors, trainerController.deleteTrainer);

export default router;