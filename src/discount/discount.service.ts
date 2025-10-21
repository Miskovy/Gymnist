import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Discount } from './entities/discount.entity';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { UpdateDiscountDto } from './dto/update-discount.dto';

@Injectable()
export class DiscountService {
  constructor(
    @InjectRepository(Discount)
    private discountRepo: Repository<Discount>,
  ) {}

  async create(createDiscountDto: CreateDiscountDto): Promise<Discount> {
    const existingDiscount = await this.discountRepo.findOne({
      where: { name: createDiscountDto.name }
    });

    if (existingDiscount) {
      throw new ConflictException('Discount with this name already exists');
    }

    if (createDiscountDto.type === 'percentage' && createDiscountDto.value > 100) {
      throw new ConflictException('Percentage discount cannot exceed 100%');
    }

    const discount = this.discountRepo.create({
      ...createDiscountDto,
      isActive: createDiscountDto.isActive ?? true
    });

    return this.discountRepo.save(discount);
  }

  async findAll(): Promise<Discount[]> {
    return this.discountRepo.find({
      order: { id: 'ASC' }
    });
  }

  async findOne(id: number): Promise<Discount> {
    const discount = await this.discountRepo.findOne({ where: { id } });
    
    if (!discount) {
      throw new NotFoundException(`Discount with ID ${id} not found`);
    }
    
    return discount;
  }

  async update(id: number, updateDiscountDto: UpdateDiscountDto): Promise<Discount> {
    const discount = await this.findOne(id);

    if (updateDiscountDto.name && updateDiscountDto.name !== discount.name) {
      const existingDiscount = await this.discountRepo.findOne({
        where: { name: updateDiscountDto.name }
      });

      if (existingDiscount && existingDiscount.id !== id) {
        throw new ConflictException('Discount with this name already exists');
      }
    }

    if (updateDiscountDto.type === 'percentage' && updateDiscountDto.value > 100) {
      throw new ConflictException('Percentage discount cannot exceed 100%');
    }

    const updatedDiscount = await this.discountRepo.preload({
      id,
      ...updateDiscountDto
    });

    if (!updatedDiscount) {
      throw new NotFoundException(`Discount with ID ${id} not found`);
    }

    return this.discountRepo.save(updatedDiscount);
  }

  async remove(id: number): Promise<void> {
    const discount = await this.findOne(id);
    await this.discountRepo.remove(discount);
  }

}