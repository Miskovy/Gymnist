import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaymentMethod } from './entities/payment-method.entity';
import { CreatePaymentMethodDto } from './dto/create-payment-method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment-method.dto';
import { saveBase64Image } from '../utils/saveBase64Image';

@Injectable()
export class PaymentMethodService {
  constructor(
    @InjectRepository(PaymentMethod)
    private paymentMethodRepository: Repository<PaymentMethod>,
  ) {}

  async create(createPaymentMethodDto: CreatePaymentMethodDto): Promise<PaymentMethod> {

     let imageUrl = null;
    if (createPaymentMethodDto.image) {
      imageUrl = await saveBase64Image(
        createPaymentMethodDto.image, 
        `PaymentMethod-${Date.now()}.jpg`, 
        'Payment-Method'
      );
    }
    const paymentMethod = this.paymentMethodRepository.create({
      ...createPaymentMethodDto,
      image: imageUrl,
      isActive: createPaymentMethodDto.isActive ?? true,
    });
    return this.paymentMethodRepository.save(paymentMethod);
  }

  async findAll(): Promise<PaymentMethod[]> {
    return this.paymentMethodRepository.find();
  }

  async findOne(id: number): Promise<PaymentMethod> {
    const paymentMethod = await this.paymentMethodRepository.findOne({ where: { id } });
    if (!paymentMethod) throw new NotFoundException(`Payment Method ${id} not found`);
    return paymentMethod;
  }

  async update(id: number, updatePaymentMethodDto: UpdatePaymentMethodDto): Promise<PaymentMethod> {
    await this.paymentMethodRepository.update(id, updatePaymentMethodDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.paymentMethodRepository.delete(id);
    if (result.affected === 0) throw new NotFoundException(`Payment Method ${id} not found`);
  }
}