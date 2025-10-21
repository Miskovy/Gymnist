import { CreateTraineeDto } from './dto/create-trainee.dto';
import { UpdateTraineeDto } from './dto/update-trainee.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Trainee } from './entities/trainee.entity';
import { QRCodeService } from '../common/services/qr.service';
import { saveBase64Image } from '../utils/saveBase64Image'

@Injectable()
export class TraineeService {
  constructor(
    @InjectRepository(Trainee)
    private traineeRepository: Repository<Trainee>,
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

  async create(createTraineeDto: CreateTraineeDto) {
    const passwordHash = await bcrypt.hash(createTraineeDto.password, 10);

    const barCode = this.qrCodeService.generateUniqueQRCodeData('BC');
    const qrCodeData = this.qrCodeService.generateUniqueQRCodeData('TRAINEE');

    const qrCodeImage = await this.qrCodeService.generateQRCodeUrl(qrCodeData);

    let imageUrl = null;
    if (createTraineeDto.image) {
      imageUrl = await saveBase64Image(
        createTraineeDto.image, 
        `trainee-${Date.now()}.jpg`, 
        'trainees'
      );
    }

    const trainee = this.traineeRepository.create({
      ...createTraineeDto,
      password: passwordHash,
      barCode: barCode,
      qrCode: qrCodeData,
      birthDate: new Date(createTraineeDto.birthDate),
      age: this.calculateAge(new Date(createTraineeDto.birthDate)),
      image: imageUrl,
    });

    const savedTrainee = await this.traineeRepository.save(trainee);

    return {
      ...savedTrainee,
      qrCodeImage,
    };
  }

  async findAll() {
    return this.traineeRepository.find();
  }

  async findOne(id: number) {
    const trainee = await this.traineeRepository.findOne({ where: { id } });
    if (!trainee) throw new NotFoundException(`Trainee with ID ${id} not found`);
    
    // Generate QR code URL (saved as file)
    const qrCodeImage = await this.qrCodeService.generateQRCodeUrl(trainee.qrCode);
    
    return {
      ...trainee,
      qrCodeImage,
    };
  }

  async findByQRCode(qrCode: string) {
    if (!this.qrCodeService.validateQRCodeData(qrCode, 'TRAINEE')) {
      throw new NotFoundException('Invalid QR code format');
    }

    const trainee = await this.traineeRepository.findOne({ where: { qrCode } });
    if (!trainee) throw new NotFoundException('Trainee not found with this QR code');
    
    return trainee;
  }

  async scanQRCode(qrCode: string) {
    const trainee = await this.findByQRCode(qrCode);
    
    trainee.lastAttendance = new Date();
    await this.traineeRepository.save(trainee);

    return {
      message: 'Attendance recorded successfully',
      trainee: {
        id: trainee.id,
        name: trainee.name,
        email: trainee.email,
        phone: trainee.phone,
        lastAttendance: trainee.lastAttendance,
      },
    };
  }

  async update(id: number, updateTraineeDto: UpdateTraineeDto) {
    const trainee = await this.traineeRepository.findOne({ where: { id } });
    if (!trainee) throw new NotFoundException(`Trainee with ID ${id} not found`);

    if (updateTraineeDto.birthDate) {
      updateTraineeDto['age'] = this.calculateAge(new Date(updateTraineeDto.birthDate));
    }

    if (updateTraineeDto.image) {
      updateTraineeDto['image'] = await saveBase64Image(
        updateTraineeDto.image, 
        `trainee-${Date.now()}.jpg`, 
        'trainees'
      );
    }

    await this.traineeRepository.update(id, updateTraineeDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.traineeRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Trainee with ID ${id} not found`);
    }
    return { message: 'Trainee deleted successfully' };
  }
}