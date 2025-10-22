import express from 'express';
import * as paymentMethodController from './controller';
import { validatePaymentMethod, validate } from './validator';

const router = express.Router();

router.get('/', paymentMethodController.getAllPaymentMethods);
router.get('/:id', paymentMethodController.getPaymentMethodById);
router.post('/', validatePaymentMethod, validate, paymentMethodController.createPaymentMethod);
router.put('/:id', validatePaymentMethod, validate, paymentMethodController.updatePaymentMethod);
router.delete('/:id', paymentMethodController.deletePaymentMethod);

export default router;