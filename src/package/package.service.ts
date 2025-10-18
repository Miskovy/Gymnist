import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Package } from './entities/package.entity';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';

@Injectable()
export class PackageService {
  constructor(
    @InjectRepository(Package)
    private packageRepository: Repository<Package>,
  ) {}

  async create(createPackageDto: CreatePackageDto): Promise<Package> {
    const pkg = this.packageRepository.create({
      ...createPackageDto,
      startDate: new Date(createPackageDto.startDate),
      endDate: new Date(createPackageDto.endDate),
    });
    return this.packageRepository.save(pkg);
  }

  async findAll(): Promise<Package[]> {
    return this.packageRepository.find({ relations: ['paymentMethod'] });
  }

  async findOne(id: number): Promise<Package> {
    const pkg = await this.packageRepository.findOne({
      where: { id },
      relations: ['paymentMethod'],
    });
    if (!pkg) throw new NotFoundException(`Package ${id} not found`);
    return pkg;
  }

  async update(id: number, updatePackageDto: UpdatePackageDto): Promise<Package> {
    await this.packageRepository.update(id, {
      ...updatePackageDto,
      startDate: updatePackageDto.startDate ? new Date(updatePackageDto.startDate) : undefined,
      endDate: updatePackageDto.endDate ? new Date(updatePackageDto.endDate) : undefined,
    });
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.packageRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Package ${id} not found`);
  }
}