import { Request, Response } from 'express';
import PaymentMethodModel from './model';
import { saveBase64Image } from '../utils/handleImages';

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
    const { name, description, type, isActive } = req.body;
    
    const base64 = req.body.image;
    const folder = 'payment-methods';
    const imageUrl = await saveBase64Image(base64, req, folder);

    const paymentMethod = await PaymentMethodModel.create({
      name,
      description,
      type,
      image: imageUrl,
      isActive
    });

    return res.status(201).json(paymentMethod);
  } catch (error) {
    return res.status(500).json({ message: 'Error creating payment method', error });
  }
};

export const updatePaymentMethod = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const paymentMethod = await PaymentMethodModel.findByPk(id);
    
    if (!paymentMethod) {
      return res.status(404).json({ message: 'Payment method not found' });
    }

    const { name, description, type, isActive, image } = req.body;

    const updateData: any = {};
    
    if (image) {
      const folder = 'payment-methods';
      updateData.image = await saveBase64Image(image, req, folder);
    }

    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (type !== undefined) updateData.type = type;
    if (isActive !== undefined) updateData.isActive = isActive;

    await PaymentMethodModel.update(updateData, { where: { id } });

    const updatedPaymentMethod = await PaymentMethodModel.findByPk(id);
    return res.status(200).json({ 
      message: 'Payment method updated successfully', 
      data: updatedPaymentMethod 
    });
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