import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCarDto } from './dto';

@Injectable()
export class CarService {
  constructor(private prisma: PrismaService) {}

  async createCar(userId: number, dto: CreateCarDto) {
    try {
      const car = await this.prisma.car.create({
        data: {
          userId,
          ...dto,
        },
      });
      return car;
    } catch (error) {
      return console.log(error);
    }
  }

  async getUserCars(userId: number) {
    try {
      const cars = await this.prisma.car.findMany({
        where: {
          userId,
        },
      });
      return cars;
    } catch (error) {
      return console.log(error);
    }
  }

  async getCarById(userId: number, carId: number) {
    try {
      const car = await this.prisma.car.findFirst({
        where: {
          id: carId,
          userId,
        },
      });
      return car;
    } catch (error) {
      return console.log(error);
    }
  }
}
