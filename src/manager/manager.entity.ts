import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class manager{
  @PrimaryGeneratedColumn()
  id: number;

  @Column() 
  name: string;

  @Column() 
  avata: string;
}
