import {
    Controller,
    Get,
    UseGuards,
    Inject,
  } from '@nestjs/common';
  import { UserService } from './user.service';
import { GoogleAuthGuard } from './utils/Gaurds';

  
  @Controller('auth')
  export class UserController {
    constructor (@Inject('AUTH_SERVICE') private userService: UserService) {}
  
    @Get()
  @UseGuards(GoogleAuthGuard)
  handleLogin() {
    return { msg: 'Google Authentication' };
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  handleRedirect() {
    return { msg: 'OK' };
  }
  
  
  }