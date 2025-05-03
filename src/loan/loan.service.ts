import { Injectable, NotFoundException } from '@nestjs/common';
    import { InjectRepository } from '@nestjs/typeorm';
    import { Repository } from 'typeorm';
    import { Loan } from './entities/loan.entity';
    import { Repayment } from './entities/repayment.entity';
    import { CreateLoanDto } from './dto/create-loan.dto';
    import { UpdateLoanDto } from './dto/update-loan.dto';

    @Injectable()
    export class LoanService {
        constructor(
            @InjectRepository(Loan)
            private loanRepository: Repository<Loan>,
            @InjectRepository(Repayment)
            private repaymentRepository: Repository<Repayment>,
        ) {}

        async create(createLoanDto: CreateLoanDto, userId: number): Promise<Loan> {
            const loan = this.loanRepository.create({ ...createLoanDto, user: { id: userId } });
            return await this.loanRepository.save(loan);
        }

        async findAll(): Promise<Loan[]> {
            return await this.loanRepository.find({ relations: ['user'] });
        }

        async findOne(id: number): Promise<Loan> {
            const loan = await this.loanRepository.findOne({ where: { id }, relations: ['user', 'repayments'] });
            if (!loan) {
                throw new NotFoundException(`Loan with ID ${id} not found`);
            }
            return loan;
        }

        async update(id: number, updateLoanDto: UpdateLoanDto): Promise<Loan> {
            await this.loanRepository.update(id, updateLoanDto);
            return this.findOne(id);
        }

        async remove(id: number): Promise<void> {
            await this.loanRepository.delete(id);
        }

        async approveLoan(id: number): Promise<Loan> {
            return await this.update(id, { status: 'approved', approvalDate: new Date() });
        }

        async rejectLoan(id: number): Promise<Loan> {
            return await this.update(id, { status: 'rejected' });
        }

        async makeRepayment(loanId: number, amount: number): Promise<Repayment> {
            const loan = await this.findOne(loanId);
            if (!loan) {
                throw new NotFoundException(`Loan with ID ${loanId} not found`);
            }

            const repayment = this.repaymentRepository.create({
                loan: { id: loanId },
                amount,
                paymentDate: new Date(),
            });

            return await this.repaymentRepository.save(repayment);
        }

        async getLoanStatusAndHistory(loanId: number): Promise<Loan> {
            return this.findOne(loanId);
        }
    }