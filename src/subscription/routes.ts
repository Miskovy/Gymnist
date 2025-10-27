import express from 'express';
import * as subscriptionController from './controller';
import { validateSubscription, validate } from './validator';

const router = express.Router();

router.get('/', subscriptionController.getAllSubscriptions);
router.get('/:id', subscriptionController.getSubscriptionById);
router.post('/', validateSubscription, validate, subscriptionController.createSubscription);
router.put('/:id', subscriptionController.updateSubscription);
router.delete('/:id', subscriptionController.deleteSubscription);

export default router;