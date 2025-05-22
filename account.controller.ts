import { Controller, Get, Post, Body, Param, Patch, Delete, ParseIntPipe } from '@nestjs/common';
import { AccountsService } from '../nest-mini-bank/src/accounts/accounts.service';
import { CreateAccountDto } from '../nest-mini-bank/src/accounts/dto/create-account.dto';
import { UpdateAccountDto } from '../nest-mini-bank/src/accounts/dto/update-account.dto';
import { Roles } from 'src/decorators/role.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Role } from 'src/entities';

@ApiBearerAuth() // Applied once at class level for consistency
@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Roles(Role.User)
  @Post()
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountsService.create(createAccountDto);
  }

  @Roles(Role.User)
  @Get()
  findAll() {
    return this.accountsService.findAll();
  }

  @Roles(Role.User)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.accountsService.findOne(id);
  }

  @Roles(Role.User)
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountsService.update(id, updateAccountDto);
  }

  @Roles(Role.User)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.accountsService.remove(id);
  }
}
