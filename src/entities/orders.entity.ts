import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Orders {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int', { array: true })
  dishes: number[];

  @Column('int', { array: true })
  quantities: number[];

  @Column()
  date: string;

  @Column()
  shipping: string;
}
