import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Dishes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  desc: string;
}
