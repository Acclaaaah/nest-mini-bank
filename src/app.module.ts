// src/app.module.ts
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
import { AccountsModule } from './accounts/account.module'; 
import { WithdrawalsModule } from './withdrawals/withdrawals.module';
import { Withdrawal } from './withdrawals/withdrawal.entity';

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
      password: 'root',
      database: 'MiniBankingDB',
      entities: [User, Account, Withdrawal], 
      synchronize: false, 
    }),
    UsersModule,
    AuthModule,
    AccountsModule,
    WithdrawalsModule,
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
