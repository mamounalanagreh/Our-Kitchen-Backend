import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Accounts } from '../entities/accounts.entity';
import { Dishes } from '../entities/dish.entity';
import { Orders } from '../entities/orders.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dishes, Accounts, Orders])],
  exports: [TypeOrmModule],
})
export class SchemaModule {}
