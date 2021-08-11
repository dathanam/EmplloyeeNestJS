import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class employee{
  @PrimaryGeneratedColumn()
  id: number;

  @Column() 
  idjobtitle: number;

  @Column() 
  iddepartment: number;

  @Column() 
  name: string;

  @Column() 
  phone: string;

  @Column() 
  email: string;

  @Column() 
  avata: string;
}
