import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import TrainerModel from './model';
import MajorModel from '../major/model';
import { CityModel, CountryModel, StateModel } from '../location/model';
import QRCodeService from '../utils/QRCodeService';
import { saveBase64Image } from '../utils/handleImages';
import calculateAge from '../utils/CalcAge';

const qrCodeService = new QRCodeService();

export const createTrainer = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone, birthDate, majorIds, gender, countryId, cityId, stateId, nationality } = req.body;

    if (email) {
      const existingTrainer = await TrainerModel.findOne({ where: { email } });
      if (existingTrainer) return res.status(400).json({ message: 'Trainer with this email already exists' });
    }


    if (countryId) {
      const country = await CountryModel.findByPk(countryId);
      if (!country) return res.status(400).json({ message: 'Country not found' });
    }
    if (stateId) {
      const state = await StateModel.findByPk(stateId);
      if (!state) return res.status(400).json({ message: 'State not found' });
    }
    if (cityId) {
      const city = await CityModel.findByPk(cityId);
      if (!city) return res.status(400).json({ message: 'City not found' });
    }

    
    const passwordHash = await bcrypt.hash(password, 10);
    const barCode = qrCodeService.generateUniqueQRCodeData('BC');
    const qrCodeData = qrCodeService.generateUniqueQRCodeData('TRAINER');
    const qrCodeImage = await qrCodeService.generateQRCodeUrl(qrCodeData);

    let imageUrl: string | undefined;
    if (req.body.image) {
      imageUrl = await saveBase64Image(req.body.image, req, 'trainers');
    }

    const birthDateObj = birthDate ? new Date(birthDate) : undefined;
    const age = birthDateObj ? calculateAge(birthDateObj) : undefined;

    const trainer = await TrainerModel.create({
      name,
      email,
      password: passwordHash,
      phone,
      birthDate: birthDateObj,
      age,
      gender,
      countryId,
      cityId,
      stateId,
      nationality,
      image: imageUrl,
      barCode,
      qrCode: qrCodeData,
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

    const {  name, email, password, phone, birthDate, majorIds, gender, countryId, cityId, stateId, nationality } = req.body;

    
    if (email !== undefined && email !== trainer.email) {
      const existing = await TrainerModel.findOne({ where: { email } });
      if (existing) return res.status(400).json({ message: 'Trainer with this email already exists' });
    }

    
    if (countryId !== undefined && countryId !== null) {
      const country = await CountryModel.findByPk(Number(countryId));
      if (!country) return res.status(400).json({ message: 'Country not found' });
    }
    if (stateId !== undefined && stateId !== null) {
      const state = await StateModel.findByPk(Number(stateId));
      if (!state) return res.status(400).json({ message: 'State not found' });
    }
    if (cityId !== undefined && cityId !== null) {
      const city = await CityModel.findByPk(Number(cityId));
      if (!city) return res.status(400).json({ message: 'City not found' });
    }

    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (email !== undefined) updateData.email = email;
    if (phone !== undefined) updateData.phone = phone;
    if (gender !== undefined) updateData.gender = gender;
    if (countryId !== undefined) updateData.countryId = countryId;
    if (cityId !== undefined) updateData.cityId = cityId;
    if (stateId !== undefined) updateData.stateId = stateId;
    if (nationality !== undefined) updateData.nationality = nationality;
    if (birthDate !== undefined) {
      const bd = new Date(birthDate);
      updateData.birthDate = bd;
      updateData.age = calculateAge(bd);
    }

    if (req.body.image && req.body.image.startsWith('data:')) {
      updateData.image = await saveBase64Image(req.body.image, req, 'trainers');
    }

    
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    
    await TrainerModel.update(updateData, { where: { id } });

    if (majorIds !== undefined) {
      if (Array.isArray(majorIds) && majorIds.length > 0) {
        
        const majors = await MajorModel.findAll({
          where: { id: majorIds }
        });
        
        if (majors.length !== majorIds.length) {
          return res.status(400).json({ message: 'One or more majors not found' });
        }

        await (trainer as any).setMajors(majorIds);
      } else {
        await (trainer as any).setMajors([]);
      }
    }

    
    const updatedTrainer = await TrainerModel.findByPk(id, {
      include: [{
        model: MajorModel,
        as: 'majors',
        through: { attributes: [] }
      }]
    });

    const qrCodeImage = await qrCodeService.generateQRCodeUrl(updatedTrainer?.qrCode ?? '');

    res.json({
      message: 'Trainer updated successfully'
    });
  } catch (error: any) {
    res.status(500).json({ message: 'Error updating trainer', error: error.message });
  }
};

export const getAllTrainers = async (req: Request, res: Response) => {
  try {
    const trainers = await TrainerModel.findAll({
      attributes: { exclude: ['password'] },
      include: [
        {
          model: MajorModel,
          as: 'majors',
          through: { attributes: [] }
        },
        {
          model: CountryModel,
          as: 'country', 
          attributes: ['id', 'name'] 
        },
        {
          model: StateModel, 
          as: 'state', 
          attributes: ['id', 'name']
        },
        {
          model: CityModel,
          as: 'city',
          attributes: ['id', 'name']
        }
      ]
    });
    return res.status(200).json(trainers);
  } catch (error) {
    return res.status(500).json({ message: 'Error fetching trainers', error });
  }
};

export const getTrainerById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const trainer = await TrainerModel.findByPk(id, 
      {
      attributes: { exclude: ['password'] },
      include: [
        {
          model: MajorModel,
          as: 'majors',
          through: { attributes: [] }
        },
        {
          model: CountryModel,
          as: 'country', 
          attributes: ['id', 'name'] 
        },
        {
          model: StateModel, 
          as: 'state', 
          attributes: ['id', 'name']
        },
        {
          model: CityModel,
          as: 'city',
          attributes: ['id', 'name']
        }
      ]
    }
    );
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
    const id = Number(req.params.id);
    const deleted = await TrainerModel.destroy({ where: { id } });
    if (deleted === 0) {
      return res.status(404).json({ message: 'Trainer not found' });
    }
    return res.status(200).json({ message: 'Trainer deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Error deleting trainer', error });
  }
};

