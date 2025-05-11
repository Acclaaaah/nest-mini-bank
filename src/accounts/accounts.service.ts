import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './account.entity';
import { CreateAccountDto } from './dto/create-account.dto'; 
import { UpdateAccountDto } from './dto/update-account.dto';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private accountsRepository: Repository<Account>
  ) {}

  create(createAccountDto: CreateAccountDto) {
    const account = this.accountsRepository.create(createAccountDto);
    return this.accountsRepository.save(account);
  }

  findAll() {
    return this.accountsRepository.find();
  }

  findOne(id: number) {
    return this.accountsRepository.findOne({ where: { id } }); 
  }

  async update(id: number, updateAccountDto: UpdateAccountDto) {
    await this.accountsRepository.update(id, updateAccountDto);
    return this.accountsRepository.findOne({ where: { id } }); 
  }

  remove(id: number) {
    return this.accountsRepository.delete(id);
  }
}
