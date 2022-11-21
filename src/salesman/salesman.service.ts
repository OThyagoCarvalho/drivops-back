import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSalesmanDto } from './dto';

@Injectable()
export class SalesmanService {
  constructor(private prisma: PrismaService) {}

  async createSalesman(userId: number, dto: CreateSalesmanDto) {
    try {
      const salesman = await this.prisma.salesman.create({
        data: {
          userId,
          ...dto,
        },
      });
      return salesman;
    } catch (error) {
      return console.log(error);
    }
  }

  async getUserSalesmen(userId: number) {
    try {
      const salesmen = await this.prisma.salesman.findMany({
        where: {
          userId,
        },
      });
      return salesmen;
    } catch (error) {
      return console.log(error);
    }
  }

  async getSalesmanById(userId: number, salesmanId: number) {
    try {
      const salesman = await this.prisma.salesman.findFirst({
        where: {
          id: salesmanId,
          userId,
        },
      });
      return salesman;
    } catch (error) {
      return console.log(error);
    }
  }
}
