import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoanController } from 'src/loan/loan.controller';
import { LoanService } from 'src/loan/loan.service';
import { Loan } from './entities/loan.entity';
import { Repayment } from './entities/repayment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Loan, Repayment])],
  controllers: [LoanController],
  providers: [LoanService]
})
export class LoanModule {}
