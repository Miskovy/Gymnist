import { Request, Response } from 'express';
import SubscriptionModel from './model';
import TraineeModel from '../trainee/model';
import PackageModel from '../package/model';
import PaymentMethodModel from '../payment-method/model';

export const getAllSubscriptions = async (req: Request, res: Response) => {
  try {
    const subscriptions = await SubscriptionModel.findAll({
      include: [
        {
          model: TraineeModel,
          as: 'trainee',
          attributes: ['id', 'name', 'email', 'phone']
        },
        {
          model: PackageModel,
          as: 'package',
          attributes: ['id', 'name', 'maxEntranceCount']
        },
        {
          model: PaymentMethodModel,
          as: 'paymentMethod',
          attributes: ['id', 'name', 'type']
        }
      ],
      order: [['createdAt', 'DESC']]
    });
    return res.status(200).json(subscriptions);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching subscriptions', error });
  }
};

export const getSubscriptionById = async (req: Request, res: Response) => {
  try {
    const subscription = await SubscriptionModel.findByPk(req.params.id, {
      include: [
        {
          model: TraineeModel,
          as: 'trainee',
          attributes: ['id', 'name', 'email', 'phone']
        },
        {
          model: PackageModel,
          as: 'package',
          attributes: ['id', 'name', 'maxEntranceCount', 'description']
        },
        {
          model: PaymentMethodModel,
          as: 'paymentMethod',
          attributes: ['id', 'name', 'type']
        }
      ]
    });
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
    const {
      traineeId,
      packageId,
      duration,
      price,
      paymentMethodId,
      startDate,
      endDate,
      remainingEntrance
    } = req.body;

    const trainee = await TraineeModel.findByPk(traineeId);
    if (!trainee) {
      return res.status(404).json({ message: 'Trainee not found' });
    }

    const packageItem = await PackageModel.findByPk(packageId);
    if (!packageItem) {
      return res.status(404).json({ message: 'Package not found' });
    }

    const paymentMethod = await PaymentMethodModel.findByPk(paymentMethodId);
    if (!paymentMethod) {
      return res.status(404).json({ message: 'Payment method not found' });
    }

    const subscription = await SubscriptionModel.create({
      traineeId,
      packageId,
      duration,
      price,
      paymentMethodId,
      startDate: new Date(startDate),
      endDate: new Date(endDate)
    });

    const createdSubscription = await SubscriptionModel.findByPk(subscription.id, {
      include: [
        {
          model: TraineeModel,
          as: 'trainee',
          attributes: ['id', 'name', 'email', 'phone']
        },
        {
          model: PackageModel,
          as: 'package',
          attributes: ['id', 'name', 'maxEntranceCount']
        },
        {
          model: PaymentMethodModel,
          as: 'paymentMethod',
          attributes: ['id', 'name', 'type']
        }
      ]
    });

    return res.status(201).json(createdSubscription);
  } catch (error) {
    return res.status(500).json({ message: 'Error creating subscription', error });
  }
};

export const updateSubscription = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const subscription = await SubscriptionModel.findByPk(id);
    
    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }

    const {
      traineeId,
      packageId,
      duration,
      price,
      paymentMethodId,
      startDate,
      endDate,
      remainingEntrance,
      isActive
    } = req.body;

    const updateData: any = {};

    if (traineeId !== undefined) {
      const trainee = await TraineeModel.findByPk(traineeId);
      if (!trainee) {
        return res.status(404).json({ message: 'Trainee not found' });
      }
      updateData.traineeId = traineeId;
    }

    if (packageId !== undefined) {
      const packageItem = await PackageModel.findByPk(packageId);
      if (!packageItem) {
        return res.status(404).json({ message: 'Package not found' });
      }
      updateData.packageId = packageId;
    }

    if (paymentMethodId !== undefined) {
      const paymentMethod = await PaymentMethodModel.findByPk(paymentMethodId);
      if (!paymentMethod) {
        return res.status(404).json({ message: 'Payment method not found' });
      }
      updateData.paymentMethodId = paymentMethodId;
    }

    if (duration !== undefined) updateData.duration = duration;
    if (price !== undefined) updateData.price = price;
    if (startDate !== undefined) updateData.startDate = new Date(startDate);
    if (endDate !== undefined) updateData.endDate = new Date(endDate);

    await SubscriptionModel.update(updateData, { where: { id } });

    const updatedSubscription = await SubscriptionModel.findByPk(id, {
      include: [
        {
          model: TraineeModel,
          as: 'trainee',
          attributes: ['id', 'name', 'email', 'phone']
        },
        {
          model: PackageModel,
          as: 'package',
          attributes: ['id', 'name', 'maxEntranceCount']
        },
        {
          model: PaymentMethodModel,
          as: 'paymentMethod',
          attributes: ['id', 'name', 'type']
        }
      ]
    });

    return res.status(200).json({
      message: 'Subscription updated successfully',
      data: updatedSubscription
    });
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

// Additional utility controllers
export const getSubscriptionsByTrainee = async (req: Request, res: Response) => {
  try {
    const subscriptions = await SubscriptionModel.findAll({
      where: { traineeId: req.params.traineeId },
      include: [
        {
          model: PackageModel,
          as: 'package',
          attributes: ['id', 'name', 'maxEntranceCount']
        },
        {
          model: PaymentMethodModel,
          as: 'paymentMethod',
          attributes: ['id', 'name', 'type']
        }
      ],
      order: [['createdAt', 'DESC']]
    });
    return res.status(200).json(subscriptions);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching trainee subscriptions', error });
  }
};

export const getActiveSubscriptions = async (req: Request, res: Response) => {
  try {
    const subscriptions = await SubscriptionModel.findAll({
      include: [
        {
          model: TraineeModel,
          as: 'trainee',
          attributes: ['id', 'name', 'email', 'phone']
        },
        {
          model: PackageModel,
          as: 'package',
          attributes: ['id', 'name', 'maxEntranceCount']
        }
      ],
      order: [['endDate', 'ASC']]
    });
    return res.status(200).json(subscriptions);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching active subscriptions', error });
  }
};