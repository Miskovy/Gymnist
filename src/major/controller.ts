import { Request, Response } from 'express';
import MajorModel from './model';

export const getAllMajors = async (req: Request, res: Response) => {
  try {
    const majors = await MajorModel.findAll({
      order: [['name', 'ASC']]
    });
    return res.status(200).json(majors);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching majors', error });
  }
};

export const getMajorById = async (req: Request, res: Response) => {
  try {
    const major = await MajorModel.findByPk(req.params.id);
    if (!major) {
      return res.status(404).json({ message: 'Major not found' });
    }
    return res.status(200).json(major);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching major', error });
  }
};

export const createMajor = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;

    const existingMajor = await MajorModel.findOne({ where: { name } });
    if (existingMajor) {
      return res.status(400).json({ message: 'Major with this name already exists' });
    }

    const major = await MajorModel.create({
      name
    });

    return res.status(201).json(major);
  } catch (error) {
    return res.status(500).json({ message: 'Error creating major', error });
  }
};

export const updateMajor = async (req: Request, res: Response) => {
  try {
    const [updated] = await MajorModel.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated === 0) {
      return res.status(404).json({ message: 'Major not found' });
    }
    const updatedMajor = await MajorModel.findByPk(req.params.id);
    return res.status(200).json(updatedMajor);
  } catch (error) {
    return res.status(500).json({ message: 'Error updating major', error });
  }
};

export const deleteMajor = async (req: Request, res: Response) => {
  try {
    const deleted = await MajorModel.destroy({
      where: { id: req.params.id }
    });
    if (deleted === 0) {
      return res.status(404).json({ message: 'Major not found' });
    }
    return res.status(200).json({ message: 'Major deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting major', error });
  }
};