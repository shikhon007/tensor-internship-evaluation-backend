import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('registration')
export default class Registration {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  companyName!: string;

  @Column()
  representativeName!: string;

  @Column()
  representativeNid!: string;

  @Column()
  address!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ unique: true })
  mobile!: number;

  //later added
  @Column()
  name!: string;

  @Column()
  contact!: number;

  @Column()
  postalCode!: string;
}
