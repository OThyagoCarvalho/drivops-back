import { IsDateString, IsNumber } from 'class-validator';

export class CreateSaleDto {
  @IsNumber()
  price: number;

  @IsNumber()
  carId: number;

  @IsNumber()
  salesmanId: number;

  @IsDateString()
  transactionDate: Date;
}
