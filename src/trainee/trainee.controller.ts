import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { TraineeService } from './trainee.service';
import { CreateTraineeDto } from './dto/create-trainee.dto';
import { UpdateTraineeDto } from './dto/update-trainee.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('trainee')
@UseGuards(JwtAuthGuard)
export class TraineeController {
  constructor(private readonly traineeService: TraineeService) {}

  @Post()
  create(@Body() createTraineeDto: CreateTraineeDto) {
    return this.traineeService.create(createTraineeDto);
  }

  @Get()
  findAll() {
    return this.traineeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.traineeService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTraineeDto: UpdateTraineeDto) {
    return this.traineeService.update(+id, updateTraineeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.traineeService.remove(+id);
  }
}
