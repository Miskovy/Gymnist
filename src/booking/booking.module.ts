import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Class } from './entities/class.entity';
import { ClassSchedule } from './entities/class-schedule.entity';
import { ClassBooking } from './entities/class-booking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Class, ClassSchedule, ClassBooking])],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
