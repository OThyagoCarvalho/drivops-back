import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateCarDto {
  @IsString()
  licensePlate: string;

  @IsString()
  model: string;

  @IsString()
  color: string;

  @IsNumber()
  year: number;

  @IsBoolean()
  forSale: boolean;
}
