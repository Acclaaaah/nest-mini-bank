import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity'; 
import { Account } from 'src/accounts/account.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Transaction, Account])],
    controllers: [TransactionsController],
    providers: [TransactionsService],
    exports: [TransactionsService]
})
export class TransactionsModule {}
