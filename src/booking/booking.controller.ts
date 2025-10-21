import { Controller, Post, Body, Get, Param, ParseIntPipe } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateClassDto } from './dto/create-class.dto';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { CreateBookingDto } from './dto/create-booking.dto';
import { Class } from './entities/class.entity';
import { ClassSchedule } from './entities/class-schedule.entity';
import { ClassBooking } from './entities/class-booking.entity';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  // CLASS endpoints
  @Post('class')
  async createClass(@Body() createClassDto: CreateClassDto): Promise<Class> {
    return this.bookingService.createClass(createClassDto);
  }

  @Get('class')
  async findAllClasses(): Promise<Class[]> {
    return this.bookingService.findAllClasses();
  }

  @Get('class/:id')
  async findClassById(@Param('id', ParseIntPipe) id: number): Promise<Class> {
    return this.bookingService.findClassById(id);
  }

  // SCHEDULE endpoints
  @Post('schedule')
  async createSchedule(@Body() createScheduleDto: CreateScheduleDto): Promise<ClassSchedule> {
    return this.bookingService.createSchedule(createScheduleDto);
  }

  @Get('schedule')
  async findAllSchedules(): Promise<ClassSchedule[]> {
    return this.bookingService.findAllSchedules();
  }

  @Get('schedule/:id')
  async findScheduleById(@Param('id', ParseIntPipe) id: number): Promise<ClassSchedule> {
    return this.bookingService.findScheduleById(id);
  }

  @Get('schedule/class/:classId')
  async findSchedulesByClass(@Param('classId', ParseIntPipe) classId: number): Promise<ClassSchedule[]> {
    return this.bookingService.findSchedulesByClass(classId);
  }

  // BOOKING endpoints
  @Post('booking')
  async createBooking(@Body() createBookingDto: CreateBookingDto): Promise<ClassBooking> {
    return this.bookingService.createBooking(createBookingDto);
  }

  @Get('booking')
  async findAllBookings(): Promise<ClassBooking[]> {
    return this.bookingService.findAllBookings();
  }

  @Get('booking/:id')
  async findBookingById(@Param('id', ParseIntPipe) id: number): Promise<ClassBooking> {
    return this.bookingService.findBookingById(id);
  }

  @Get('booking/user/:userId')
  async findBookingsByUser(@Param('userId', ParseIntPipe) userId: number): Promise<ClassBooking[]> {
    return this.bookingService.findBookingsByUser(userId);
  }

  @Get('booking/schedule/:scheduleId')
  async findBookingsBySchedule(@Param('scheduleId', ParseIntPipe) scheduleId: number): Promise<ClassBooking[]> {
    return this.bookingService.findBookingsBySchedule(scheduleId);
  }
}