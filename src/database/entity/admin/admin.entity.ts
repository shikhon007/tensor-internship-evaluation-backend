import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('admin')
export default class Admin {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  username!: string;

  @Column()
  password!: string;
}
