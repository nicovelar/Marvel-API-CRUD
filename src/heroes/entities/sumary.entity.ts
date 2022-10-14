import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class SumaryEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    heroId: number;

    @Column()
    name: string;

}
