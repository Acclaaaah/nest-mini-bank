import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards,
  } from '@nestjs/common';
  import { AuthService } from './auth.service';
  import { SignInDto } from './dto/sign-in.dto';
  import { CreateUserDto } from '../users/dto/create-user.dto';
  import { UsersService } from '../users/users.service';
  import { JwtAuthGuard } from './jwt-auth.guard'; // <-- Make sure you have this guard created
  
  @Controller('auth')
  export class AuthController {
    constructor(
      private authService: AuthService,
      private usersService: UsersService
    ) {}
  
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: SignInDto) {
      return this.authService.signIn(signInDto.username, signInDto.password);
    }
  
    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
      return this.usersService.create(createUserDto);
    }
  
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
      return req.user;
    }
  }
  