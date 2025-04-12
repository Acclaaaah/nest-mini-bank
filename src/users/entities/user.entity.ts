import { Role } from 'src/enums/role.enum';
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

    @Column({type: String, length: 25 })
    role: Role;
}
