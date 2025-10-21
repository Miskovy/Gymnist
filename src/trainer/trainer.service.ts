import { CreateTrainerDto } from './dto/create-trainer.dto';
import { UpdateTrainerDto } from './dto/update-trainer.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trainer } from './entities/trainer.entity';
import * as bcrypt from 'bcrypt';
import { QRCodeService } from '../common/services/qr.service';
import { saveBase64Image } from '../utils/saveBase64Image';

@Injectable()
export class TrainerService {
  constructor(
    @InjectRepository(Trainer)
    private trainerRepository: Repository<Trainer>,
    private qrCodeService: QRCodeService 
  ) {}

  private calculateAge(birthDate: Date): number {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  }

  async create(createTrainerDto: CreateTrainerDto) {
    const passwordHash = await bcrypt.hash(createTrainerDto.password, 10);

    const barCode = this.qrCodeService.generateUniqueQRCodeData('BC');
    const qrCodeData = this.qrCodeService.generateUniqueQRCodeData('TRAINER');


    const qrCodeImage = await this.qrCodeService.generateQRCodeUrl(qrCodeData);

    let imageUrl = null;
    if (createTrainerDto.image) {
      imageUrl = await saveBase64Image(
        createTrainerDto.image, 
        `trainer-${Date.now()}.jpg`, 
        'trainers'
      );
    }

    const trainer = this.trainerRepository.create({
      ...createTrainerDto,
      password: passwordHash,
      user_id: 0,
      barCode: barCode,
      qrCode: qrCodeData,
      birthDate: new Date(createTrainerDto.birthDate),
      age: this.calculateAge(new Date(createTrainerDto.birthDate)),
      image: imageUrl,
    });

    const savedTrainer = await this.trainerRepository.save(trainer);

    return {
      ...savedTrainer,
      qrCodeImage,
    };
  }

  async findAll() {
    return this.trainerRepository.find();
  }

  async findOne(id: number) {
    const trainer = await this.trainerRepository.findOne({ where: { id } });
    if (!trainer) throw new NotFoundException(`Trainer not found`);
    
    const qrCodeImage = await this.qrCodeService.generateQRCodeUrl(trainer.qrCode);
    
    return {
      ...trainer,
      qrCodeImage,
    };
  }

  async update(id: number, updateTrainerDto: UpdateTrainerDto) {
    const trainer = await this.trainerRepository.findOne({ where: { id } });
    if (!trainer) throw new NotFoundException(`Trainer not found`);

    if (updateTrainerDto.birthDate) {
      updateTrainerDto['age'] = this.calculateAge(new Date(updateTrainerDto.birthDate));
    }

    if (updateTrainerDto.image) {
      updateTrainerDto['image'] = await saveBase64Image(
        updateTrainerDto.image, 
        `trainer-${Date.now()}.jpg`, 
        'trainers'
      );
    }

    await this.trainerRepository.update(id, updateTrainerDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.trainerRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Trainer not found`);
    return { message: 'Trainer deleted successfully' };
  }

  async findByQRCode(qrCode: string) {
    if (!this.qrCodeService.validateQRCodeData(qrCode, 'TRAINER')) {
      throw new NotFoundException('Invalid QR code format');
    }

    const trainer = await this.trainerRepository.findOne({ where: { qrCode } });
    if (!trainer) throw new NotFoundException('Trainer not found with this QR code');
    
    return trainer;
  }

  async scanQRCode(qrCode: string) {
    const trainer = await this.findByQRCode(qrCode);
    
    trainer.lastAttendance = new Date();
    await this.trainerRepository.save(trainer);

    return {
      message: 'Attendance recorded successfully',
      trainer: {
        id: trainer.id,
        name: trainer.name,
        email: trainer.email,
        phone: trainer.phone,
        lastAttendance: trainer.lastAttendance,
      },
    };
  }
}