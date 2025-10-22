import { Request, Response } from 'express';
import PackageModel from './model';

export const getAllPackages = async (req: Request, res: Response) => {
  try {
    const packages = await PackageModel.findAll();
    return res.status(200).json(packages);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching packages', error });
  }
};

export const getPackageById = async (req: Request, res: Response) => {
  try {
    const packageItem = await PackageModel.findByPk(req.params.id);
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
    const packageItem = await PackageModel.create(req.body);
    return res.status(201).json(packageItem);
  } catch (error) {
    return res.status(500).json({ message: 'Error creating package', error });
  }
};

export const updatePackage = async (req: Request, res: Response) => {
  try {
    const [updated] = await PackageModel.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated === 0) {
      return res.status(404).json({ message: 'Package not found' });
    }
    const updatedPackage = await PackageModel.findByPk(req.params.id);
    return res.status(200).json(updatedPackage);
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