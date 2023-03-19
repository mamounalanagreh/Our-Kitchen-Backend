import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderDto } from './dto/order.dto';
import { SignInDto } from './dto/siginIn.dto';
import { SignUpDto } from './dto/signup.dto';
import { Accounts } from './entities/accounts.entity';
import { Orders } from './entities/orders.entity';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Accounts)
    private accountsRepo: Repository<Accounts>,
    @InjectRepository(Orders)
    private orderRepo: Repository<Orders>,
  ) {}

  async checkEmail(email: string) {
    const user = await this.accountsRepo.findBy({ email });
    return user.length ? true : false;
  }

  async signin(signinDto: SignInDto) {
    const { email, password } = signinDto;

    const user = await this.accountsRepo.findBy({ email });
    if (user[0].password === password) {
      return {
        email: user[0].email,
        username: user[0].username,
        role: user[0].role,
        orders: user[0].orders,
      };
    } else {
      return false;
    }
  }

  async signup(signupDto: SignUpDto) {
    const { email, username, password } = signupDto['user'];

    const user = {
      email: email,
      username: username,
      password: password,
      role: 'User',
      orders: [],
    };

    const addUser = this.accountsRepo.create(user);
    await this.accountsRepo.save(addUser);

    return {
      email: user.email,
      username: user.username,
      role: user.role,
      orders: user.orders,
    };
  }

  async deleteUser(email: string) {
    let user = await this.accountsRepo.findOneBy({ email });
    let orderIds: number[] = user.orders;

    orderIds.forEach(async (id) => {
      await this.orderRepo.delete({ id });
    });

    await this.accountsRepo.delete({ email });
    return true;
  }

  async addOrder(order: OrderDto, email: string) {
    let user = await this.accountsRepo.findOneBy({ email });

    const newOrder = await this.orderRepo.create({
      ...order,
    });
    const added = await this.orderRepo.save(newOrder);

    await this.accountsRepo.update(
      { email: email },
      {
        ...Accounts,
        orders: [...user.orders, added.id],
      },
    );

    const updatedUser = await this.accountsRepo.findOneBy({ email });

    return updatedUser.orders;
  }

  async getOrders(ids: number[]) {
    let allOrders = await this.orderRepo.find();
    let orders: Orders[] = allOrders.filter((order) => ids.includes(order.id));

    return orders;
  }

  async deleteOrder(date: string, email: string) {
    const user = await this.accountsRepo.findOneBy({ email });
    let savedOrder = await this.orderRepo.findOneBy({ date });

    await this.accountsRepo.update(
      { email: email },
      {
        ...Accounts,
        orders: user.orders.filter((order) => order !== savedOrder.id),
      },
    );
    await this.orderRepo.delete({ date });

    return user.orders;
  }
}
