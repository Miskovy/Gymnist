import { Request, Response } from 'express';
import  Trainee  from './model';

export const getAllTrainees = async (req: Request, res: Response) => {
  try {
    const trainees = await Trainee.findAll();
    return res.status(200).json(trainees);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching trainees', error });
  }
};

export const getTraineeById = async (req: Request, res: Response) => {
  try {
    const trainee = await Trainee.findByPk(req.params.id);
    if (!trainee) {
      return res.status(404).json({ message: 'Trainee not found' });
    }
    return res.status(200).json(trainee);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching trainee', error });
  }
};

export const createTrainee = async (req: Request, res: Response) => {
  try {
    const trainee = await Trainee.create(req.body);
    return res.status(201).json(trainee);
  } catch (error) {
    return res.status(500).json({ message: 'Error creating trainee', error });
  }
};

export const updateTrainee = async (req: Request, res: Response) => {
  try {
    const [updated] = await Trainee.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated === 0) {
      return res.status(404).json({ message: 'Trainee not found' });
    }
    const updatedTrainee = await Trainee.findByPk(req.params.id);
    return res.status(200).json(updatedTrainee);
  } catch (error) {
    return res.status(500).json({ message: 'Error updating trainee', error });
  }
};

export const deleteTrainee = async (req: Request, res: Response) => {
  try {
    const deleted = await Trainee.destroy({
      where: { id: req.params.id }
    });
    if (deleted === 0) {
      return res.status(404).json({ message: 'Trainee not found' });
    }
    return res.status(200).json({ message: 'Trainee deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting trainee', error });
  }
};