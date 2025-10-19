import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PackageSubscription } from './entities/subscription.entity';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(PackageSubscription)
    private subRepo: Repository<PackageSubscription>,
  ) {}

  async create(dto: CreateSubscriptionDto): Promise<PackageSubscription> {
    const subscription = this.subRepo.create({
      ...dto,
      startDate: new Date(dto.startDate),
      endDate: new Date(dto.endDate),
    });
    return this.subRepo.save(subscription);
  }

  async findAll() {
    return this.subRepo.find({ relations: ['trainee', 'package', 'paymentMethod'] });
  }

  async findOne(id: number): Promise<PackageSubscription> {
    const sub = await this.subRepo.findOne({
      where: { id },
      relations: ['trainee', 'package', 'paymentMethod'],
    });
    if (!sub) throw new NotFoundException(`Subscription ${id} not found`);
    return sub;
  }
}