import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class user{
  @PrimaryGeneratedColumn()
  id: number;

  @Column() 
  name: string;

  @Column() 
  email: string;

  @Column() 
  role: number;

  @Column() 
  code: string;

  @Column() 
  checkcode: boolean;

  @Column() 
  username: string;

  @Column() 
  password: string;

  @Column() 
  loginfirst: boolean;
}
