import { Role } from 'src/enums/role.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Account } from 'src/accounts/account.entity';
import { Loan } from 'src/loan/entities/loan.entity';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 75 })
  username: string;

  @Column({ length: 255 })
  password: string;

  @Column({ length: 255, nullable: true })
  firstName: string;

  @Column({ length: 255, nullable: true })
  lastName: string;

  @Column({ type: 'enum', enum: Role })
  role: Role;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @OneToMany(() => Account, account => account.user)
  accounts: Account[];

  @OneToMany(() => Loan, loan => loan.user) // Add the OneToMany relationship with Loan
  loans: Loan[];
}
