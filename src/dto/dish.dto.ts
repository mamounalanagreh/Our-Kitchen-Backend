import { Optional } from '@nestjs/common';
import { IsNumber, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Dish {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  desc: string;

  @IsString()
  image: string;

  @IsString()
  price: string;
}
