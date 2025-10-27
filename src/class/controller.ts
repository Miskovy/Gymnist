import { Request, Response } from 'express';
import { ClassModel, ClassScheduleModel, TrainerClassModel, BookingModel } from './model';
import { Op, WhereOptions } from 'sequelize';

// Class Controllers
export const getAllClasses = async (req: Request, res: Response) => {
  try {
    const classes = await ClassModel.findAll();
    return res.status(200).json(classes);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching classes', error });
  }
};

export const getClassById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const classItem = await ClassModel.findByPk(id);
    
    if (!classItem) {
      return res.status(404).json({ message: 'Class not found' });
    }
    
    return res.status(200).json(classItem);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching class', error });
  }
};

export const createClass = async (req: Request, res: Response) => {
  try {
    const { name, description, image, price, gender, trainers, schedules } = req.body;
    
    // Create class - explicitly type the creation object
    const classData = {
      name,
      description,
      image,
      price,
      gender
    };
    
    const newClass = await ClassModel.create(classData as any);
    
    // Add trainers if provided
    if (trainers && trainers.length > 0) {
      const trainerClasses = trainers.map((trainerId: number) => ({
        trainerId,
        classId: newClass.id
      }));
      
      await TrainerClassModel.bulkCreate(trainerClasses as any[]);
    }
    
    // Add schedules if provided
    if (schedules && schedules.length > 0) {
      const classSchedules = schedules.map((schedule: any) => ({
        classId: newClass.id,
        date: schedule.date,
        timeSlot: schedule.timeSlot,
        roomId: schedule.roomId
      }));
      
      await ClassScheduleModel.bulkCreate(classSchedules as any[]);
    }
    
    return res.status(201).json(newClass);
  } catch (error) {
    return res.status(500).json({ message: 'Error creating class', error });
  }
};

export const updateClass = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, image, price, gender } = req.body;
    
    const classItem = await ClassModel.findByPk(id);
    
    if (!classItem) {
      return res.status(404).json({ message: 'Class not found' });
    }
    
    await classItem.update({
      name,
      description,
      image,
      price,
      gender
    });
    
    return res.status(200).json(classItem);
  } catch (error) {
    return res.status(500).json({ message: 'Error updating class', error });
  }
};

export const deleteClass = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const classItem = await ClassModel.findByPk(id);
    
    if (!classItem) {
      return res.status(404).json({ message: 'Class not found' });
    }
    
    await classItem.destroy();
    
    return res.status(200).json({ message: 'Class deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting class', error });
  }
};

// Trainer-Class Controllers
export const addTrainerToClass = async (req: Request, res: Response) => {
  try {
    const { classId } = req.params;
    const { trainerId } = req.body;
    
    const classItem = await ClassModel.findByPk(classId);
    
    if (!classItem) {
      return res.status(404).json({ message: 'Class not found' });
    }
    
    const trainerClassData = {
      trainerId,
      classId: parseInt(classId)
    };
    
    const trainerClass = await TrainerClassModel.create(trainerClassData as any);
    
    return res.status(201).json(trainerClass);
  } catch (error) {
    return res.status(500).json({ message: 'Error adding trainer to class', error });
  }
};

// Class Schedule Controllers
export const addScheduleToClass = async (req: Request, res: Response) => {
  try {
    const { classId } = req.params;
    const { date, timeSlot, roomId } = req.body;
    
    const classItem = await ClassModel.findByPk(classId);
    
    if (!classItem) {
      return res.status(404).json({ message: 'Class not found' });
    }
    
    const scheduleData = {
      classId: parseInt(classId),
      date,
      timeSlot,
      roomId
    };
    
    const schedule = await ClassScheduleModel.create(scheduleData as any);
    
    return res.status(201).json(schedule);
  } catch (error) {
    return res.status(500).json({ message: 'Error adding schedule to class', error });
  }
};

// Booking Controllers
export const createBooking = async (req: Request, res: Response) => {
  try {
    const { traineeId, classScheduleId, price, paymentMethod } = req.body;
    
    const schedule = await ClassScheduleModel.findByPk(classScheduleId);
    
    if (!schedule) {
      return res.status(404).json({ message: 'Class schedule not found' });
    }
    
    const bookingData = {
      traineeId,
      classScheduleId,
      price,
      paymentMethod
    };
    
    const booking = await BookingModel.create(bookingData as any);
    
    return res.status(201).json(booking);
  } catch (error) {
    return res.status(500).json({ message: 'Error creating booking', error });
  }
};

// Calendar Controller
export const getClassCalendar = async (req: Request, res: Response) => {
  try {
    const { classId, trainerId } = req.query;
    
    let whereClause: WhereOptions = {};
    
    if (classId) {
      whereClause.classId = Array.isArray(classId) 
        ? { [Op.in]: classId.map(id => parseInt(id as string)) }
        : parseInt(classId as string);
    }
    
    // Handle trainerId filtering
    let classWhereClause: WhereOptions = {};
    if (trainerId) {
      const trainerClasses = await TrainerClassModel.findAll({
        where: { 
          trainerId: Array.isArray(trainerId) 
            ? { [Op.in]: trainerId.map(id => parseInt(id as string)) }
            : parseInt(trainerId as string)
        },
        attributes: ['classId']
      });
      
      const classIds = trainerClasses.map(tc => tc.classId);
      classWhereClause.id = { [Op.in]: classIds };
    }
    
    const schedules = await ClassScheduleModel.findAll({
      where: whereClause,
      include: [
        {
          model: ClassModel,
          where: Object.keys(classWhereClause).length > 0 ? classWhereClause : undefined
        }
      ]
    });
    
    return res.status(200).json(schedules);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching class calendar', error });
  }
};