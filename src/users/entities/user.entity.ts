import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('User')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 75})
    username: string;
    @Column({length: 255})
    password: string;

    @Column({length: 255, nullable: true})
    firstName: string;
    @Column({length: 255, nullable: true})
    lastName: string;
}
