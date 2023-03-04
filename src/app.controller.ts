import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Dishes } from './entities/dish.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getAllDishes();
  }

  @Post('adddish')
  addDish(@Body() dish: Dishes) {
    return this.appService.addDish(dish);
  }

  @Post('deletedish')
  deleteDish(@Body() id: number) {
    return this.appService.deleteDish(id);
  }

  @Post('wipe')
  wipeTable() {
    return this.appService.wipeDishes();
  }
}
