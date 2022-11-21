import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSaleDto } from './dto';

@Injectable()
export class SalesService {
  constructor(private prisma: PrismaService) {}

  async createSale(userId: number, dto: CreateSaleDto) {
    try {
      const sale = await this.prisma.sale.create({
        data: {
          ...dto,
          userId,
        },
      });
      return sale;
    } catch (error) {
      return console.log(error);
    }
  }

  async getUserSales(userId: number) {
    try {
      const sales = await this.prisma.sale.findMany({
        where: {
          userId,
        },
      });
      return sales;
    } catch (error) {
      return console.log(error);
    }
  }

  async getSaleById(userId: number, saleId: number) {
    try {
      const sale = await this.prisma.sale.findUnique({
        where: {
          id: saleId,
        },
        include: {
          car: true,
          salesman: true,
        },
      });
      return sale;
    } catch (error) {
      return console.log(error);
    }
  }
}
