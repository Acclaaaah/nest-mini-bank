import {
  Controller,
  Get,
  Patch,
  Param,
  Delete,
  Body,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request as ExpressRequest } from 'express';

interface AuthenticatedRequest extends ExpressRequest {
  user: {
    sub: number; // user ID
    username: string;
    role: string;
  };
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiBody({ type: CreateUserDto })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  
  @Get()
  @ApiBearerAuth()
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [UserDto] })
  findAll() {
    return this.usersService.findAll();
  }

  
  @Get(':id')
  @ApiBearerAuth()
  @Roles(Role.User, Role.Admin)
  @ApiOperation({ summary: 'Get user by ID' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

 
  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update user by ID' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  
  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete user by ID' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Patch('update')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update current user profile' })
  updateProfile(
    @Request() req: AuthenticatedRequest,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(req.user.sub, updateUserDto);
  }

  
  @Patch('change-password')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Change current user password' })
  @ApiBody({ type: ChangePasswordDto })
  async changePassword(
    @Request() req: AuthenticatedRequest,
    @Body() dto: ChangePasswordDto,
  ) {
    return this.usersService.changePassword(req.user.sub, dto);
  }
}
