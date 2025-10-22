import { Request, Response } from 'express';
import PaymentMethodModel from './model';

export const getAllPaymentMethods = async (req: Request, res: Response) => {
  try {
    const paymentMethods = await PaymentMethodModel.findAll();
    return res.status(200).json(paymentMethods);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching payment methods', error });
  }
};

export const getPaymentMethodById = async (req: Request, res: Response) => {
  try {
    const paymentMethod = await PaymentMethodModel.findByPk(req.params.id);
    if (!paymentMethod) {
      return res.status(404).json({ message: 'Payment method not found' });
    }
    return res.status(200).json(paymentMethod);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching payment method', error });
  }
};

export const createPaymentMethod = async (req: Request, res: Response) => {
  try {
    const paymentMethod = await PaymentMethodModel.create(req.body);
    return res.status(201).json(paymentMethod);
  } catch (error) {
    return res.status(500).json({ message: 'Error creating payment method', error });
  }
};

export const updatePaymentMethod = async (req: Request, res: Response) => {
  try {
    const [updated] = await PaymentMethodModel.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated === 0) {
      return res.status(404).json({ message: 'Payment method not found' });
    }
    const updatedPaymentMethod = await PaymentMethodModel.findByPk(req.params.id);
    return res.status(200).json(updatedPaymentMethod);
  } catch (error) {
    return res.status(500).json({ message: 'Error updating payment method', error });
  }
};

export const deletePaymentMethod = async (req: Request, res: Response) => {
  try {
    const deleted = await PaymentMethodModel.destroy({
      where: { id: req.params.id }
    });
    if (deleted === 0) {
      return res.status(404).json({ message: 'Payment method not found' });
    }
    return res.status(200).json({ message: 'Payment method deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting payment method', error });
  }
};