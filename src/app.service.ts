import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Dishes } from './entities/dish.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Dishes)
    private dishRepo: Repository<Dishes>,
  ) {}

  async getAllDishes() {
    return this.dishRepo.find();
  }

  async addDish(dish: Dishes) {
    const newDish = {
      name: dish.name,
      desc: dish.desc,
    };

    const addDish = this.dishRepo.create(newDish);
    await this.dishRepo.save(addDish);

    return newDish;
  }

  async deleteDish(id: number) {
    await this.dishRepo.delete(id);
    return `Done`;
  }

  async wipeDishes() {
    this.dishRepo.clear();
    return 'Table has been wiped out';
  }
}
