import { CreateTraineeDto } from './dto/create-trainee.dto';
import { UpdateTraineeDto } from './dto/update-trainee.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Trainee } from './entities/trainee.entity';


@Injectable()
export class TraineeService {
  constructor(
      @InjectRepository(Trainee)
      private traineeRepository: Repository<Trainee>
    ) {}
  
      private calculateAge(birthDate: Date): number {
      return new Date().getFullYear() - birthDate.getFullYear();
    }
  
    async create(createTraineeDto: CreateTraineeDto) {
      const passwordHash = await bcrypt.hash(createTraineeDto.password, 10);
  
      const trainee = this.traineeRepository.create({
        ...createTraineeDto,
        password: passwordHash,
        user_id: 0,
        barCode: `BC${Date.now()}${Math.random().toString(36).substr(2, 5)}`,
        qrCode: `QR${Date.now()}${Math.random().toString(36).substr(2, 5)}`,
        birthDate: new Date(createTraineeDto.birthDate),
        age: this.calculateAge(new Date(createTraineeDto.birthDate)),
      });
  
      const savedTrainee = await this.traineeRepository.save(trainee);
  
  
      return savedTrainee; 
    }
  
    async findAll() {
      return this.traineeRepository.find();
    }
  
    async findOne(id: number) {
      const trainee = await this.traineeRepository.findOne({ where: { id } });
      if (!trainee) throw new NotFoundException(`Trainee not found`);
      return trainee;
    }
  
    async update(id: number, updateTraineeDto: UpdateTraineeDto) {
      await this.traineeRepository.update(id, updateTraineeDto);
      return this.findOne(id);
    }
  
    async remove(id: number) {
      const result = await this.traineeRepository.delete(id);
      if (result.affected === 0) throw new NotFoundException(`Trainee not found`);
    }
  }
  