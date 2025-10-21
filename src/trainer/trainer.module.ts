import { Module } from '@nestjs/common';
import { TrainerService } from './trainer.service';
import { TrainerController } from './trainer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trainer } from './entities/trainer.entity';
import { QRCodeService } from '../common/services/qr.service';

@Module({
  imports: [TypeOrmModule.forFeature([Trainer])],
  controllers: [TrainerController],
  providers: [TrainerService, QRCodeService],
})
export class TrainerModule {}
