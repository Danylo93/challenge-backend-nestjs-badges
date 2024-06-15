import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Badge {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  slug!: string;

  @Column()
  image!: string;
}
