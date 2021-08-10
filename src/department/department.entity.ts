import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class department{
  @PrimaryGeneratedColumn()
  id: number;

  @Column() 
  idmanager: number;

  @Column() 
  name: string;

  @Column() 
  phone: string;
}
