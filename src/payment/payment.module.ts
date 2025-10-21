import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { Payment } from './entities/payment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PackageSubscription } from 'src/subscription/entities/subscription.entity';
import { Trainee } from 'src/trainee/entities/trainee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Payment]), PackageSubscription, Trainee],
  controllers: [PaymentController],
  providers: [PaymentService],
})
export class PaymentModule {}
