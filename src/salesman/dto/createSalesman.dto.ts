import { IsString } from 'class-validator';

export class CreateSalesmanDto {
  @IsString()
  name: string;
}
