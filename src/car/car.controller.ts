import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { CarService } from './car.service';
import { CreateCarDto } from './dto';

@UseGuards(JwtGuard)
@Controller('cars')
export class CarController {
  constructor(private carService: CarService) {}

  @Get()
  getUserCars(@GetUser('id') userId: number) {
    return this.carService.getUserCars(userId);
  }

  @Post()
  createCar(@GetUser('id') userId: number, @Body() dto: CreateCarDto) {
    return this.carService.createCar(userId, dto);
  }

  @Get(':id')
  getCarById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) carId: number,
  ) {
    return this.carService.getCarById(userId, carId);
  }
}
