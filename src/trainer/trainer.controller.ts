import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { TrainerService } from './trainer.service';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { UpdateTrainerDto } from './dto/update-trainer.dto';

@Controller('trainers')
export class TrainerController {
  constructor(private readonly trainerService: TrainerService) {}

  @Post()
  async create(@Body() createTrainerDto: CreateTrainerDto) {
    return this.trainerService.create(createTrainerDto);
  }

  @Get()
  async findAll() {
    return this.trainerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.trainerService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTrainerDto: UpdateTrainerDto) {
    return this.trainerService.update(+id, updateTrainerDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.trainerService.remove(+id);
  }

  @Post('scan')
  async scanQRCode(@Body('qrCode') qrCode: string) {
    return this.trainerService.scanQRCode(qrCode);
  }
}