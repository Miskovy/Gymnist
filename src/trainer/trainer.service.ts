import { CreateTrainerDto } from './dto/create-trainer.dto';
import { UpdateTrainerDto } from './dto/update-trainer.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trainer } from './entities/trainer.entity';
import * as bcrypt from 'bcrypt';


@Injectable()
export class TrainerService {
  constructor(
    @InjectRepository(Trainer)
    private trainerRepository: Repository<Trainer>
  ) {}

    private calculateAge(birthDate: Date): number {
    return new Date().getFullYear() - birthDate.getFullYear();
  }

  async create(createTrainerDto: CreateTrainerDto) {
    const passwordHash = await bcrypt.hash(createTrainerDto.password, 10);

    const trainer = this.trainerRepository.create({
      ...createTrainerDto,
      password: passwordHash,
      user_id: 0,
      barCode: `BC${Date.now()}${Math.random().toString(36).substr(2, 5)}`,
      qrCode: `QR${Date.now()}${Math.random().toString(36).substr(2, 5)}`,
      birthDate: new Date(createTrainerDto.birthDate),
      age: this.calculateAge(new Date(createTrainerDto.birthDate)),
    });

    const savedTrainer = await this.trainerRepository.save(trainer);


    return savedTrainer; 
  }

  async findAll() {
    return this.trainerRepository.find();
  }

  async findOne(id: number) {
    const trainer = await this.trainerRepository.findOne({ where: { id } });
    if (!trainer) throw new NotFoundException(`Trainer not found`);
    return trainer;
  }

  async update(id: number, updateTrainerDto: UpdateTrainerDto) {
    await this.trainerRepository.update(id, updateTrainerDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.trainerRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Trainer not found`);
  }
}
