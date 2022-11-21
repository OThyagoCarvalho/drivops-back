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
import { CreateSaleDto } from './dto';
import { SalesService } from './sales.service';

@UseGuards(JwtGuard)
@Controller('sales')
export class SalesController {
  constructor(private salesService: SalesService) {}

  @Get()
  getSales(@GetUser('id') userId: number) {
    return this.salesService.getUserSales(userId);
  }

  @Post()
  createSale(@GetUser('id') userId: number, @Body() dto: CreateSaleDto) {
    return this.salesService.createSale(userId, dto);
  }

  @Get(':id')
  getSaleById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) saleId: number,
  ) {
    return this.salesService.getSaleById(userId, saleId);
  }
}
