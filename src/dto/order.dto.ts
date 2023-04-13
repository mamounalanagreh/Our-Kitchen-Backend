import { IsNumber, IsString } from 'class-validator';

export class OrderDto {
  @IsNumber()
  dishes: number[];

  @IsNumber()
  quantities: number[];

  @IsString()
  date: string;

  @IsString()
  shipping: string;
}
