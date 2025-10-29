import express from 'express';
import * as paymentMethodController from './controller';
import { validatePaymentMethod, validate } from './validator';
import verifyToken from '../middlewares/verifyToken';

const router = express.Router();

router.use(verifyToken);

router.get('/', paymentMethodController.getAllPaymentMethods);
router.get('/:id', paymentMethodController.getPaymentMethodById);
router.post('/', validatePaymentMethod, validate, paymentMethodController.createPaymentMethod);
router.put('/:id', paymentMethodController.updatePaymentMethod);
router.delete('/:id', paymentMethodController.deletePaymentMethod);

export default router;