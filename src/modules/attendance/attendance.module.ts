import { Module } from '@nestjs/common';
import { AttendanceResolver } from './attendance.resolver';

@Module({
  imports: [],
  controllers: [],
  providers: [AttendanceResolver],
})
export class AttendanceModule {}
