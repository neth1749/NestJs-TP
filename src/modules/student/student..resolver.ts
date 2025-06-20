import { Module } from '@nestjs/common';
import { StudentResolver } from './student.module';

@Module({
  imports: [],
  controllers: [],
  providers: [StudentResolver],
})
export class StudentModule {}
