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
import { CreateSalesmanDto } from './dto';
import { SalesmanService } from './salesman.service';

@UseGuards(JwtGuard)
@Controller('salesmen')
export class SalesmanController {
  constructor(private salesmanService: SalesmanService) {}

  @Get()
  getUserSalesmen(@GetUser('id') userId: number) {
    return this.salesmanService.getUserSalesmen(userId);
  }

  @Post()
  createSalesman(
    @GetUser('id') userId: number,
    @Body() dto: CreateSalesmanDto,
  ) {
    return this.salesmanService.createSalesman(userId, dto);
  }

  @Get(':id')
  getSalesmanById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) salesmanId: number,
  ) {
    return this.salesmanService.getSalesmanById(userId, salesmanId);
  }
}
