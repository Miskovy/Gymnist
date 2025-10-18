import { Module } from '@nestjs/common';
import { PackageService } from './package.service';
import { PackageController } from './package.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Package } from './entities/package.entity';
import { PaymentMethodModule } from 'src/payment-method/payment-method.module';

@Module({
  imports: [TypeOrmModule.forFeature([Package]), PaymentMethodModule],
  controllers: [PackageController],
  providers: [PackageService],
})
export class PackageModule {}
