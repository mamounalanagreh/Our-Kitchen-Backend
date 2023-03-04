import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dishes } from '../entities/dish.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dishes])],
  exports: [TypeOrmModule],
})
export class DishModule {}
