import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AppService } from './app.service';
import { Dishes } from './entities/dish.entity';
import { v4 as uuidv4 } from 'uuid';
import path = require('path');
import { join } from 'path';
import { AccountsService } from './accounts.service';
import { SignInDto } from './dto/siginIn.dto';
import { SignUpDto } from './dto/signup.dto';
import { OrderDto } from './dto/order.dto';

export const storage = {
  storage: diskStorage({
    destination: './uploads/thumbnails',
    filename: (req, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extention: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extention}`);
    },
  }),
};

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly accountsService: AccountsService,
  ) {}

  @Get()
  getHello() {
    return this.appService.getAllDishes();
  }

  @Get('dish/:imagename')
  findDish(@Param('imagename') imagename: string) {
    return this.appService.findDish(imagename);
  }

  @Get('image/:imagename')
  findImage(@Param('imagename') imagename, @Res() res) {
    return res.sendFile(join(process.cwd(), 'uploads/thumbnails/' + imagename));
  }

  @Post('adddish')
  @UseInterceptors(FileInterceptor('file', storage))
  addDish(@UploadedFile() file, @Body() dish: Dishes) {
    return this.appService.addDish(file.filename, dish);
  }

  @Post('deletedish')
  deleteDish(@Body() id: number) {
    return this.appService.deleteDish(id);
  }

  @Post('wipe')
  wipeTable() {
    return this.appService.wipeDishes();
  }

  @Post('checkemail')
  checkEmail(@Body() email: string) {
    return this.accountsService.checkEmail(email['email']);
  }

  @Post('login')
  signin(@Body() siginInDto: SignInDto) {
    return this.accountsService.signin(siginInDto);
  }

  @Post('signup')
  signup(@Body() signUpDto: SignUpDto) {
    return this.accountsService.signup(signUpDto);
  }

  @Post('user/delete')
  deleteUser(@Body() email: string) {
    return this.accountsService.deleteUser(email['email']);
  }

  @Post('user/addorder')
  addOrder(@Body('order') order: OrderDto, @Body('email') email: string) {
    return this.accountsService.addOrder(order, email);
  }

  @Post('user/orders')
  getOrders(@Body() ids: number[]) {
    return this.accountsService.getOrders(ids);
  }

  @Get('dish/find/:id')
  findDishById(@Param() id: number) {
    return this.appService.findDishById(id['id']);
  }

  @Post('orders/delete')
  deleteOrder(@Body('date') date: string, @Body('email') email: string) {
    return this.accountsService.deleteOrder(date, email);
  }
}
