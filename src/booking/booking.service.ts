import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Class } from './entities/class.entity';
import { ClassSchedule } from './entities/class-schedule.entity';
import { ClassBooking } from './entities/class-booking.entity';
import { CreateClassDto } from './dto/create-class.dto';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Class) private classRepo: Repository<Class>,
    @InjectRepository(ClassSchedule) private scheduleRepo: Repository<ClassSchedule>,
    @InjectRepository(ClassBooking) private bookingRepo: Repository<ClassBooking>,
  ) {}

  // CLASS
  async createClass(dto: CreateClassDto): Promise<Class> {
    const cls = this.classRepo.create(dto);
    return this.classRepo.save(cls);
  }

  // SCHEDULE
  async createSchedule(dto: CreateScheduleDto): Promise<ClassSchedule> {
    const schedule = this.scheduleRepo.create({
      ...dto,
      startDate: new Date(dto.startDate),
      endDate: new Date(dto.endDate),
    });
    return this.scheduleRepo.save(schedule);
  }

  // BOOKING
  async createBooking(dto: CreateBookingDto): Promise<ClassBooking> {
    const booking = this.bookingRepo.create(dto);
    return this.bookingRepo.save(booking);
  }

  // Add these methods to your existing BookingService

// CLASS methods
async findAllClasses(): Promise<Class[]> {
  return this.classRepo.find();
}

async findClassById(id: number): Promise<Class> {
  const cls = await this.classRepo.findOne({ where: { id } });
  if (!cls) {
    throw new NotFoundException(`Class with ID ${id} not found`);
  }
  return cls;
}

// SCHEDULE methods
async findAllSchedules(): Promise<ClassSchedule[]> {
  return this.scheduleRepo.find({ relations: ['class'] });
}

async findScheduleById(id: number): Promise<ClassSchedule> {
  const schedule = await this.scheduleRepo.findOne({ 
    where: { id },
    relations: ['class'] 
  });
  if (!schedule) {
    throw new NotFoundException(`Schedule with ID ${id} not found`);
  }
  return schedule;
}

async findSchedulesByClass(classId: number): Promise<ClassSchedule[]> {
  return this.scheduleRepo.find({ 
    where: { classId },
    relations: ['class'] 
  });
}

// BOOKING methods
async findAllBookings(): Promise<ClassBooking[]> {
  return this.bookingRepo.find({ 
    relations: ['classSchedule', 'classSchedule.class'] 
  });
}

async findBookingById(id: number): Promise<ClassBooking> {
  const booking = await this.bookingRepo.findOne({ 
    where: { id },
    relations: ['classSchedule', 'classSchedule.class'] 
  });
  if (!booking) {
    throw new NotFoundException(`Booking with ID ${id} not found`);
  }
  return booking;
}

async findBookingsByUser(userId: number): Promise<ClassBooking[]> {
  return this.bookingRepo.find({ 
    where: { userId },
    relations: ['classSchedule', 'classSchedule.class'] 
  });
}

async findBookingsBySchedule(scheduleId: number): Promise<ClassBooking[]> {
  return this.bookingRepo.find({ 
    where: { scheduleId },
    relations: ['classSchedule', 'classSchedule.class'] 
  });
}
}