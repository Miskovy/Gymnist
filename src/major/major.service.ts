import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Major } from './entities/major.entity';
import { CreateMajorDto } from './dto/create-major.dto';

@Injectable()
export class MajorService {
  constructor(
    @InjectRepository(Major)
    private majorRepo: Repository<Major>,
  ) {}

  async create(dto: CreateMajorDto): Promise<Major> {
    const major = this.majorRepo.create(dto);
    return this.majorRepo.save(major);
  }

  async findAll(): Promise<Major[]> {
    return this.majorRepo.find();
  }

  async findOne(id: number): Promise<Major> {
    const major = await this.majorRepo.findOne({ where: { majorId: id } });
    if (!major) throw new NotFoundException(`Major ${id} not found`);
    return major;
  }
}