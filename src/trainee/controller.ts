import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import Trainee from './model';
import QRCodeService from '../utils/QRCodeService';
import { saveBase64Image } from '../utils/handleImages';
import calculateAge from '../utils/CalcAge';

const qrCodeService = new QRCodeService();

export const getAllTrainees = async (req: Request, res: Response) => {
  try {
    const trainees = await Trainee.findAll({
       attributes: { exclude: ['password'] }
    });  
    return res.status(200).json(trainees);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching trainees', error });
  }
};

export const getTraineeById = async (req: Request, res: Response) => {
  try {
    const trainee = await Trainee.findByPk(req.params.id, { attributes: { exclude: ['password'] } });
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
    const { name, email, password, phone, birthDate } = req.body;


    const existingTrainee = await Trainee.findOne({ where: { email } });
    if (existingTrainee) {
      return res.status(400).json({ message: 'Trainee with this email already exists' });
    }

     const passwordHash = await bcrypt.hash(password, 10);
     const barCode = qrCodeService.generateUniqueQRCodeData('BC');
     const qrCodeData = qrCodeService.generateUniqueQRCodeData('TRAINEE');
     const qrCodeImage = await qrCodeService.generateQRCodeUrl(qrCodeData);

    const base64 = req.body.image;
    const folder = 'trainees';
    const imageUrl = await saveBase64Image(base64, req, folder);

    const trainee = await Trainee.create({
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

    res.status(201).json({
      message: 'Trainee created successfully',
      qrCodeImage,
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Error creating trainee', error: error.message });
  }
};

export const updateTrainee = async (req: Request, res: Response) => {
  try {
    const trainee = await Trainee.findByPk(req.params.id);
    if (!trainee) {
      return res.status(404).json({ message: 'Trainee not found' });
    }

    const updateData = { ...req.body };

    if (updateData.birthDate) {
      updateData.age = calculateAge(new Date(updateData.birthDate));
    }

    if (updateData.image && updateData.image.startsWith('data:')) {
      updateData.image = await saveBase64Image(
        updateData.image, 
        req,
        'trainees'
      );
    }

    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    await Trainee.update(updateData, {
      where: { id: req.params.id }
    });

    const updatedTrainee = await Trainee.findByPk(req.params.id);
    
    if (!updatedTrainee) {
      return res.status(404).json({ message: 'Trainee not found' });
    }

    const qrCodeImage = await qrCodeService.generateQRCodeUrl(updatedTrainee.qrCode ?? '');

    res.json({ 
      message: 'Trainee updated successfully',
      qrCodeImage,
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Error updating trainee', error: error.message });
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

export const scanQRCode = async (req: Request, res: Response) => {
  try {
    const { qrCode } = req.body;
    console.log(qrCode);

    if (!qrCodeService.validateQRCodeData(qrCode, 'TRAINEE')) {
      return res.status(400).json({ message: 'Invalid QR code format' });
    }

    const trainee = await Trainee.findOne({ where: { qrCode } });
    if (!trainee) {
      return res.status(404).json({ message: 'Trainee not found with this QR code' });
    }

  
     trainee.lastAttendance = new Date();
     await trainee.save();

    res.json({
      message: 'Attendance recorded successfully',
      trainee: {
        id: trainee.id,
        name: trainee.name,
        email: trainee.email,
        phone: trainee.phone,
        lastAttendance: trainee.lastAttendance,
      },
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Error scanning QR code', error: error.message });
  }
};