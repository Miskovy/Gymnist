import { Module } from '@nestjs/common';
import { TraineeService } from './trainee.service';
import { TraineeController } from './trainee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trainee } from './entities/trainee.entity';
import { QRCodeService } from '../common/services/qr.service';

@Module({
  imports: [TypeOrmModule.forFeature([Trainee])],
  controllers: [TraineeController],
  providers: [TraineeService, QRCodeService],
})
export class TraineeModule {}
