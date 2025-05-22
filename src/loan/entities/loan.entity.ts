import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
    import { User } from '../../users/entities/user.entity';
    import { Repayment } from './repayment.entity';

    @Entity('loans')
    export class Loan {
        @PrimaryGeneratedColumn()
        id: number;

        @ManyToOne(() => User, user => user.loans)
        @JoinColumn({ name: 'userId' })
        user: User;

        @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
        amount: number;

        @Column({ type: 'integer', nullable: false })
        term: number; // in months

        @Column({ type: 'decimal', precision: 5, scale: 2, nullable: false })
        interestRate: number;

        @Column({ type: 'enum', enum: ['pending', 'approved', 'rejected', 'active', 'completed', 'defaulted'], default: 'pending' })
        status: string;

        @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
        applicationDate: Date;

        @Column({ type: 'timestamp', nullable: true })
        approvalDate: Date;

        @OneToMany(() => Repayment, repayment => repayment.loan)
        repayments: Repayment[];
    }