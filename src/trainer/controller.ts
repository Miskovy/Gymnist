import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import TrainerModel from './model';
import MajorModel from '../major/model';
import QRCodeService from '../utils/QRCodeService';
import { saveBase64Image } from '../utils/handleImages';
import calculateAge from '../utils/CalcAge';

const qrCodeService = new QRCodeService();

export const createTrainer = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone, birthDate, majorIds } = req.body;

    const existingTrainer = await TrainerModel.findOne({ where: { email } });
    if (existingTrainer) {
      return res.status(400).json({ message: 'Trainer with this email already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const barCode = qrCodeService.generateUniqueQRCodeData('BC');
    const qrCodeData = qrCodeService.generateUniqueQRCodeData('TRAINER');
    const qrCodeImage = await qrCodeService.generateQRCodeUrl(qrCodeData);

    let imageUrl;
    if (req.body.image) {
      const base64 = req.body.image;
      const folder = 'trainers';
      imageUrl = await saveBase64Image(base64, req, folder);
    }

    const trainer = await TrainerModel.create({
      name,
      email,
      password: passwordHash,
      phone,
      birthDate: new Date(birthDate),
      age: calculateAge(new Date(birthDate)),
      image: imageUrl,
      barCode: barCode,
      qrCode: qrCodeData
    });

    if (majorIds && Array.isArray(majorIds) && majorIds.length > 0) {
      const majors = await MajorModel.findAll({
        where: { id: majorIds }
      });
      
      if (majors.length !== majorIds.length) {
        return res.status(400).json({ message: 'majors not found' });
      }

      await (trainer as any).setMajors(majorIds);
    }

    const createdTrainer = await TrainerModel.findByPk(trainer.id, {
      include: [{
        model: MajorModel,
        as: 'majors',
        through: { attributes: [] }
      }]
    });

    res.status(201).json({
      message: 'Trainer created successfully',
      data: createdTrainer,
      qrCodeImage,
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Error creating trainer', error: error.message });
  }
};

export const updateTrainer = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const trainer = await TrainerModel.findByPk(id);
    
    if (!trainer) {
      return res.status(404).json({ message: 'Trainer not found' });
    }

    const { name, email, phone, birthDate, majorIds, ...otherFields } = req.body;

    const updateData: any = {};

    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email;
    if (phone !== undefined) updateData.phone = phone;
    if (birthDate !== undefined) {
      updateData.birthDate = new Date(birthDate);
      updateData.age = calculateAge(new Date(birthDate));
    }

    if (req.body.image && req.body.image.startsWith('data:')) {
      const folder = 'trainers';
      updateData.image = await saveBase64Image(req.body.image, req, folder);
    }

    // Handle password update
    if (otherFields.password) {
      updateData.password = await bcrypt.hash(otherFields.password, 10);
    }

    // Update trainer
    await TrainerModel.update(updateData, { where: { id } });

    if (majorIds !== undefined) {
      if (Array.isArray(majorIds) && majorIds.length > 0) {
        // Validate that all majors exist
        const majors = await MajorModel.findAll({
          where: { id: majorIds }
        });
        
        if (majors.length !== majorIds.length) {
          return res.status(400).json({ message: 'One or more majors not found' });
        }

        await (trainer as any).setMajors(majorIds);
      } else {
        // If empty array, remove all majors
        await (trainer as any).setMajors([]);
      }
    }

    // Fetch updated trainer with majors
    const updatedTrainer = await TrainerModel.findByPk(id, {
      include: [{
        model: MajorModel,
        as: 'majors',
        through: { attributes: [] }
      }]
    });

    const qrCodeImage = await qrCodeService.generateQRCodeUrl(updatedTrainer?.qrCode ?? '');

    res.json({
      message: 'Trainer updated successfully',
      data: updatedTrainer,
      qrCodeImage,
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Error updating trainer', error: error.message });
  }
};

export const getAllTrainers = async (req: Request, res: Response) => {
  try {
    const trainers = await TrainerModel.findAll({
      include: [{
        model: MajorModel,
        as: 'majors',
        through: { attributes: [] }
      }]
    });
    return res.status(200).json(trainers);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching trainers', error });
  }
};

export const getTrainerById = async (req: Request, res: Response) => {
  try {
    const trainer = await TrainerModel.findByPk(req.params.id, {
      include: [{
        model: MajorModel,
        as: 'majors',
        through: { attributes: [] }
      }]
    });
    if (!trainer) {
      return res.status(404).json({ message: 'Trainer not found' });
    }
    return res.status(200).json(trainer);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching trainer', error });
  }
};


export const scanQRCode = async (req: Request, res: Response) => {
 try {
    const { qrCode } = req.body;

    if (!qrCodeService.validateQRCodeData(qrCode, 'TRAINER')) {
      return res.status(400).json({ message: 'Invalid QR code format' });
    }

    const trainer = await TrainerModel.findOne({ where: { qrCode } });
    if (!trainer) {
      return res.status(404).json({ message: 'Trainer not found with this QR code' });
    }

    trainer.lastAttendance = new Date();
    await trainer.save();

    res.json({
      message: 'Attendance recorded successfully',
      trainer: {
        id: trainer.id,
        name: trainer.name,
        email: trainer.email,
        phone: trainer.phone,
        lastAttendance: trainer.lastAttendance,
      },
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Error scanning QR code', error: error.message });
  }
};

export const deleteTrainer = async (req: Request, res: Response) => {
  try {
    const deleted = await TrainerModel.destroy({ where: { id: req.params.id } });
    if (deleted === 0) {
      return res.status(404).json({ message: 'Trainer not found' });
    }
    return res.status(200).json({ message: 'Trainer deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting trainer', error });
  }
};

