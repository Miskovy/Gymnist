import { Module } from '@nestjs/common';
import { TraineeService } from './trainee.service';
import { TraineeController } from './trainee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trainee } from './entities/trainee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Trainee])],
  controllers: [TraineeController],
  providers: [TraineeService],
})
export class TraineeModule {}
