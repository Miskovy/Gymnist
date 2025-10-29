import { Request, Response } from 'express';
import { Op } from 'sequelize';
import RentModel from './model';
import { RoomModel } from '../room/model';
import TrainerModel from '../trainer/model';

export const createRent = async (req: Request, res: Response) => {
  try {
    const { roomId, trainerId, price, startDate, endDate } = req.body;

    // Check if room exists
    const room = await RoomModel.findByPk(roomId);
    if (!room) {
      return res.status(400).json({ message: 'Room not found' });
    }

    // Check if trainer exists
    const trainer = await TrainerModel.findByPk(trainerId);
    if (!trainer) {
      return res.status(400).json({ message: 'Trainer not found' });
    }

    // Check for overlapping rentals
    const overlappingRent = await RentModel.findOne({
      where: {
        roomId,
        [Op.or]: [
          {
            startDate: {
              [Op.between]: [startDate, endDate]
            }
          },
          {
            endDate: {
              [Op.between]: [startDate, endDate]
            }
          }
        ]
      }
    });

    if (overlappingRent) {
      return res.status(400).json({ message: 'Room is already rented for this period' });
    }

    const rent = await RentModel.create({
      roomId,
      trainerId,
      price,
      startDate,
      endDate
    });

    const createdRent = await RentModel.findByPk(rent.id, {
      include: [
        {
          model: RoomModel,
          as: 'room'
        },
        {
          model: TrainerModel,
          as: 'trainer',
          attributes: ['id', 'name', 'email', 'phone']
        }
      ]
    });

    res.status(201).json({
      message: 'Rent created successfully',
      data: createdRent
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Error creating rent', error: error.message });
  }
};

export const updateRent = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const rent = await RentModel.findByPk(id);
    
    if (!rent) {
      return res.status(404).json({ message: 'Rent not found' });
    }

    const { roomId, trainerId, price, startDate, endDate } = req.body;

    if (roomId !== undefined) {
      const room = await RoomModel.findByPk(roomId);
      if (!room) {
        return res.status(400).json({ message: 'Room not found' });
      }
    }

    if (trainerId !== undefined) {
      const trainer = await TrainerModel.findByPk(trainerId);
      if (!trainer) {
        return res.status(400).json({ message: 'Trainer not found' });
      }
    }

    // Check for overlapping rentals if dates are being updated
    if (startDate !== undefined || endDate !== undefined) {
      const newStartDate = startDate || rent.startDate;
      const newEndDate = endDate || rent.endDate;

      const overlappingRent = await RentModel.findOne({
        where: {
          id: { [Op.ne]: id },
          roomId: roomId || rent.roomId,
          [Op.or]: [
            {
              startDate: {
                [Op.between]: [newStartDate, newEndDate]
              }
            },
            {
              endDate: {
                [Op.between]: [newStartDate, newEndDate]
              }
            }
          ]
        }
      });

      if (overlappingRent) {
        return res.status(400).json({ message: 'Room is already rented for this period' });
      }
    }

    const updateData: any = {};
    if (roomId !== undefined) updateData.roomId = roomId;
    if (trainerId !== undefined) updateData.trainerId = trainerId;
    if (price !== undefined) updateData.price = price;
    if (startDate !== undefined) updateData.startDate = startDate;
    if (endDate !== undefined) updateData.endDate = endDate;

    await RentModel.update(updateData, { where: { id } });

    const updatedRent = await RentModel.findByPk(id, {
      include: [
        {
          model: RoomModel,
          as: 'room'
        },
        {
          model: TrainerModel,
          as: 'trainer',
          attributes: ['id', 'name', 'email', 'phone']
        }
      ]
    });

    res.json({
      message: 'Rent updated successfully',
      data: updatedRent
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Error updating rent', error: error.message });
  }
};

export const getAllRents = async (req: Request, res: Response) => {
  try {
    const rents = await RentModel.findAll({
      include: [
        {
          model: RoomModel,
          as: 'room'
        },
        {
          model: TrainerModel,
          as: 'trainer',
          attributes: ['id', 'name', 'email', 'phone']
        }
      ]
    });
    return res.status(200).json(rents);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching rents', error });
  }
};

export const getRentById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const rent = await RentModel.findByPk(id, {
      include: [
        {
          model: RoomModel,
          as: 'room'
        },
        {
          model: TrainerModel,
          as: 'trainer',
          attributes: ['id', 'name', 'email', 'phone']
        }
      ]
    });
    
    if (!rent) {
      return res.status(404).json({ message: 'Rent not found' });
    }
    
    return res.status(200).json(rent);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching rent', error });
  }
};

export const deleteRent = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const deleted = await RentModel.destroy({ where: { id } });
    if (deleted === 0) {
      return res.status(404).json({ message: 'Rent not found' });
    }
    return res.status(200).json({ message: 'Rent deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting rent', error });
  }
};