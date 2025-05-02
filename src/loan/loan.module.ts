import { Module } from '@nestjs/common';
import { LoanController } from 'src/loan/loan.controller';
import { LoanService } from 'src/loan/loan.service';

@Module({
  controllers: [LoanController],
  providers: [LoanService]
})
export class LoanModule {}
