import { Request, Response } from 'express';
import Model from './model';

// Get all records
export const getAll = async (req: Request, res: Response): Promise<void> => {
  try {
    const records = await Model.findAll();
    res.status(200).json({
      status: 'success',
      data: records
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve records'
    });
  }
};

// Get record by ID
export const getById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const record = await Model.findByPk(id);
    
    if (!record) {
      res.status(404).json({
        status: 'error',
        message: 'Record not found'
      });
      return;
    }
    
    res.status(200).json({
      status: 'success',
      data: record
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve record'
    });
  }
};

// Create new record
export const create = async (req: Request, res: Response): Promise<void> => {
  try {
    const newRecord = await Model.create(req.body);
    res.status(201).json({
      status: 'success',
      data: newRecord
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to create record'
    });
  }
};

// Update record
export const update = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const [updated] = await Model.update(req.body, {
      where: { id }
    });
    
    if (updated === 0) {
      res.status(404).json({
        status: 'error',
        message: 'Record not found'
      });
      return;
    }
    
    const updatedRecord = await Model.findByPk(id);
    res.status(200).json({
      status: 'success',
      data: updatedRecord
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update record'
    });
  }
};

// Delete record
export const deleteRecord = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const deleted = await Model.destroy({
      where: { id }
    });
    
    if (deleted === 0) {
      res.status(404).json({
        status: 'error',
        message: 'Record not found'
      });
      return;
    }
    
    res.status(200).json({
      status: 'success',
      message: 'Record deleted successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete record'
    });
  }
};