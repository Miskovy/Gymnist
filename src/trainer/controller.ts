import { Request, Response } from 'express';
import  Trainer  from './model';

export const getAllTrainers = async (req: Request, res: Response) => {
  try {
    const trainers = await Trainer.findAll();
    return res.status(200).json(trainers);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching trainers', error });
  }
};

export const getTrainerById = async (req: Request, res: Response) => {
  try {
    const trainer = await Trainer.findByPk(req.params.id);
    if (!trainer) {
      return res.status(404).json({ message: 'Trainer not found' });
    }
    return res.status(200).json(trainer);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching trainer', error });
  }
};

export const createTrainer = async (req: Request, res: Response) => {
  try {
    const trainer = await Trainer.create(req.body);
    return res.status(201).json(trainer);
  } catch (error) {
    return res.status(500).json({ message: 'Error creating trainer', error });
  }
};

export const updateTrainer = async (req: Request, res: Response) => {
  try {
    const [updated] = await Trainer.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated === 0) {
      return res.status(404).json({ message: 'Trainer not found' });
    }
    const updatedTrainer = await Trainer.findByPk(req.params.id);
    return res.status(200).json(updatedTrainer);
  } catch (error) {
    return res.status(500).json({ message: 'Error updating trainer', error });
  }
};

export const deleteTrainer = async (req: Request, res: Response) => {
  try {
    const deleted = await Trainer.destroy({
      where: { id: req.params.id }
    });
    if (deleted === 0) {
      return res.status(404).json({ message: 'Trainer not found' });
    }
    return res.status(200).json({ message: 'Trainer deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting trainer', error });
  }
};