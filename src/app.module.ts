import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { Account } from './accounts/account.entity';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/guards/role.guard';
import { AuthModule } from './auth/auth.module';
import { AccountsModule } from './accounts/accounts.module';
import { LoanModule } from './loan/loan.module';
import { Loan } from './loan/entities/loan.entity'; // Import Loan entity
import { Repayment } from './loan/entities/repayment.entity'; // Import Repayment entity

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: 'dev.env',
      load: [configuration],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Anonbob2001!',
      database: 'MiniBankingDB',
      entities: [User, Account, Loan, Repayment], // Add Loan and Repayment to the entities array
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    AccountsModule,
    LoanModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}