import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
    import { Loan } from './loan.entity';

    @Entity('repayments')
    export class Repayment {
        @PrimaryGeneratedColumn()
        id: number;

        @ManyToOne(() => Loan, loan => loan.repayments)
        @JoinColumn({ name: 'loanId' })
        loan: Loan;

        @Column({ type: 'date', nullable: false })
        paymentDate: Date;

        @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
        amount: number;
    }