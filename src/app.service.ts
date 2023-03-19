import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  async addDish(filename: string, dish: Dishes) {
    const newDish = {
      name: dish.name,
      desc: dish.desc,
      image: filename,
      price: dish.price,
    };

    const addDish = this.dishRepo.create(newDish);
    await this.dishRepo.save(addDish);

    return addDish;
  }

  async findDish(name: string) {
    return this.dishRepo.findBy({ image: name });
  }

  async findDishById(id: number) {
    return this.dishRepo.findOneBy({ id });
  }

  async deleteDish(id: number) {
    await this.dishRepo.delete(id);
    return `Done`;
  }

  async wipeDishes() {
    const fs = require('fs');
    const dir = './uploads/thumbnails';

    this.dishRepo.clear();

    fs.rmSync(dir, { recursive: true }, () => {
      console.log('deleted');
    });

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recurisve: true }, () => {
        console.log('added');
      });
    }

    return 'Table has been wiped out';
  }
}
