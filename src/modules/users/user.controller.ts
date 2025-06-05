/* eslint-disable prettier/prettier */
import {
  Get,
  Param,
  Controller,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get('/:username')
  getUser(@Param('username') username: string) {
    return this.userService.getUser(username);
  }

  @Post()
  createUser(
    @Body() body: { username: string; email: string; password: string },
  ) {
    return this.userService.createUser(body);
  }

  @Patch('/:username')
  updateUser(
    @Param('username') username: string,
    @Body() body: { username: string; email: string; password: string },
  ) {
    return this.userService.updateUser(username, body);
  }

  @Delete('/:username')
  deleteUser(
    @Param('username') username: string,
    @Body('password') password: string,
  ) {
    return this.userService.deleteUser(username, password);
  }
}
