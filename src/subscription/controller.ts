import { Request, Response } from 'express';
import SubscriptionModel from './model';

export const getAllSubscriptions = async (req: Request, res: Response) => {
  try {
    const subscriptions = await SubscriptionModel.findAll();
    return res.status(200).json(subscriptions);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching subscriptions', error });
  }
};

export const getSubscriptionById = async (req: Request, res: Response) => {
  try {
    const subscription = await SubscriptionModel.findByPk(req.params.id);
    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }
    return res.status(200).json(subscription);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching subscription', error });
  }
};

export const createSubscription = async (req: Request, res: Response) => {
  try {
    const subscription = await SubscriptionModel.create(req.body);
    return res.status(201).json(subscription);
  } catch (error) {
    return res.status(500).json({ message: 'Error creating subscription', error });
  }
};

export const updateSubscription = async (req: Request, res: Response) => {
  try {
    const [updated] = await SubscriptionModel.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated === 0) {
      return res.status(404).json({ message: 'Subscription not found' });
    }
    const updatedSubscription = await SubscriptionModel.findByPk(req.params.id);
    return res.status(200).json(updatedSubscription);
  } catch (error) {
    return res.status(500).json({ message: 'Error updating subscription', error });
  }
};

export const deleteSubscription = async (req: Request, res: Response) => {
  try {
    const deleted = await SubscriptionModel.destroy({
      where: { id: req.params.id }
    });
    if (deleted === 0) {
      return res.status(404).json({ message: 'Subscription not found' });
    }
    return res.status(200).json({ message: 'Subscription deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting subscription', error });
  }
};