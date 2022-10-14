import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class HeroEntity {

    @PrimaryGeneratedColumn()
    heroId: number;
  
    @Column()
    name: string;
  
    @Column()
    description: string;
  
    @Column()
    path:string;

    @Column()
    extension:string;
}
