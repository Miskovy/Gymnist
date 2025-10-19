import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscriptionController } from './subscription.controller';
import { PackageSubscription } from './entities/subscription.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Package } from 'src/package/entities/package.entity';
import { Trainee } from 'src/trainee/entities/trainee.entity';
import { PaymentMethod } from 'src/payment-method/entities/payment-method.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PackageSubscription, Package, PaymentMethod, Trainee])],
  controllers: [SubscriptionController],
  providers: [SubscriptionService],
})
export class SubscriptionModule {}
