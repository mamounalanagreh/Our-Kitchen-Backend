import { IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Accounts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  username: string;

  @Column()
  @IsString()
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @Column('int', { array: true })
  orders: number[];
}
