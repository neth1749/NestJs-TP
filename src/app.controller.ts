/* eslint-disable prettier/prettier */
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getRoot(): string {
    return 'Welcome to the NestJS ToDo App!';
  }

  @Get('hello')
  getHello(): string {
    return 'Hello World!';
  }
}
