import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ComicEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    available: number;

    @Column()
    heroId: number;

}
