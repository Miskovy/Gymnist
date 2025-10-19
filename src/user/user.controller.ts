import { Controller, Get, Put, Body, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserService } from './user.service';


@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
}
