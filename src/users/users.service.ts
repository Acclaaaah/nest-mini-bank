import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  // Create a user with a hashed password
  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return this.usersRepository.save(user);
  }

  async findAll() {
    const results = await this.usersRepository.find();
    return results.map(({ password, ...user }) => user);
  }

  async findOne(id: number) {
    const result = await this.usersRepository.findOneBy({ id });
    if (!result) throw new NotFoundException('User not found');
    const { password, ...userWithoutPassword } = result;
    return userWithoutPassword;
  }

  findByUsername(username: string) {
    return this.usersRepository.findOneBy({ username });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<Partial<User> | null> {
    await this.usersRepository.update(id, updateUserDto);
    const updatedUser = await this.usersRepository.findOne({ where: { id } });
    if (!updatedUser) return null;

    const { password, ...sanitizedUser } = updatedUser;
    return sanitizedUser;
  }

  // Unified and improved password change method
  async changePassword(userId: number, dto: ChangePasswordDto) {
    const user = await this.usersRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isMatch = await bcrypt.compare(dto.currentPassword, user.password);
    if (!isMatch) {
      throw new BadRequestException('Current password is incorrect');
    }

    user.password = await bcrypt.hash(dto.newPassword, 10);
    await this.usersRepository.save(user);

    return { message: 'Password updated successfully' };
  }

  async remove(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) throw new NotFoundException('User not found');
    await this.usersRepository.remove(user);
    return { message: `User with ID ${id} removed successfully` };
  }
}
