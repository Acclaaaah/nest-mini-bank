import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.usersRepository.save(createUserDto);
  }

  async findAll() {
    const results = await this.usersRepository.find();
    return results.map(user => ({
      ...user,
      password: undefined
    }));
  }

  async findOne(id: number) {
    const result = await this.usersRepository.findOneBy({ id: id });
    return { ...result, password: undefined };
  }

  findByUsername(username: string) {
    return this.usersRepository.findOneBy({ username });
  }


  async update(id: number, updateUserDto: UpdateUserDto): Promise<Partial<User>> {
    await this.usersRepository.update(id, updateUserDto);
    const updatedUser = await this.usersRepository.findOne({ where: { id } });

    if (!updatedUser) return null;

    const { password, ...sanitizedUser } = updatedUser;
    return sanitizedUser;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
