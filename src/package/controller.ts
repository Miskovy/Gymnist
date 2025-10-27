import { Request, Response } from 'express';
import PackageModel from './model';
import PaymentMethodModel from '../payment-method/model';
import { saveBase64Image } from '../utils/handleImages';

export const getAllPackages = async (req: Request, res: Response) => {
  try {
    const packages = await PackageModel.findAll({
      include: [{
        model: PaymentMethodModel,
        as: 'paymentMethod'
      }]
    });
    return res.status(200).json(packages);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching packages', error });
  }
};

export const getPackageById = async (req: Request, res: Response) => {
  try {
    const packageItem = await PackageModel.findByPk(req.params.id, {
      include: [{
        model: PaymentMethodModel,
        as: 'paymentMethod'
      }]
    });
    if (!packageItem) {
      return res.status(404).json({ message: 'Package not found' });
    }
    return res.status(200).json(packageItem);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching package', error });
  }
};

export const createPackage = async (req: Request, res: Response) => {
  try {
    const { 
      name, 
      maxEntranceCount, 
      description, 
      startDate, 
      endDate, 
      paymentMethodId, 
      priceMonthly, 
      priceQuarterly, 
      priceSemiAnnually, 
      priceAnnually 
    } = req.body;

    let imageUrl;
    if (req.body.image) {
      const base64 = req.body.image;
      const folder = 'packages';
      imageUrl = await saveBase64Image(base64, req, folder);
    }

    const packageItem = await PackageModel.create({
      name,
      maxEntranceCount,
      description,
      image: imageUrl,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      paymentMethodId,
      priceMonthly,
      priceQuarterly,
      priceSemiAnnually,
      priceAnnually
    });

    const createdPackage = await PackageModel.findByPk(packageItem.id, {
      include: [{
        model: PaymentMethodModel,
        as: 'paymentMethod'
      }]
    });

    return res.status(201).json(createdPackage);
  } catch (error) {
    return res.status(500).json({ message: 'Error creating package', error });
  }
};

export const updatePackage = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const packageItem = await PackageModel.findByPk(id);
    
    if (!packageItem) {
      return res.status(404).json({ message: 'Package not found' });
    }

    const { 
      name, 
      maxEntranceCount, 
      description, 
      startDate, 
      endDate, 
      paymentMethodId, 
      priceMonthly, 
      priceQuarterly, 
      priceSemiAnnually, 
      priceAnnually,
      image 
    } = req.body;

    const updateData: any = {};
    
    if (image) {
      const folder = 'packages';
      updateData.image = await saveBase64Image(image, req, folder);
    }

    // Only update fields that are provided in the request body
    if (name !== undefined) updateData.name = name;
    if (maxEntranceCount !== undefined) updateData.maxEntranceCount = maxEntranceCount;
    if (description !== undefined) updateData.description = description;
    if (startDate !== undefined) updateData.startDate = new Date(startDate);
    if (endDate !== undefined) updateData.endDate = new Date(endDate);
    if (paymentMethodId !== undefined) updateData.paymentMethodId = paymentMethodId;
    if (priceMonthly !== undefined) updateData.priceMonthly = priceMonthly;
    if (priceQuarterly !== undefined) updateData.priceQuarterly = priceQuarterly;
    if (priceSemiAnnually !== undefined) updateData.priceSemiAnnually = priceSemiAnnually;
    if (priceAnnually !== undefined) updateData.priceAnnually = priceAnnually;

    await PackageModel.update(updateData, { where: { id } });

    const updatedPackage = await PackageModel.findByPk(id, {
      include: [{
        model: PaymentMethodModel,
        as: 'paymentMethod'
      }]
    });
    
    return res.status(200).json({ 
      message: 'Package updated successfully', 
      data: updatedPackage 
    });
  } catch (error) {
    return res.status(500).json({ message: 'Error updating package', error });
  }
};

export const deletePackage = async (req: Request, res: Response) => {
  try {
    const deleted = await PackageModel.destroy({
      where: { id: req.params.id }
    });
    if (deleted === 0) {
      return res.status(404).json({ message: 'Package not found' });
    }
    return res.status(200).json({ message: 'Package deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting package', error });
  }
};