import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Status } from './status.enum';

@Resolver('Attendance')
export class AttendanceResolver {
  private attendances = [
    {
      session: 'Biology',
      status: Status.A,
      student: {
        id: 1,
        name: 'Dara',
        idCard: '123456789',
        className: 'A',
      },
      marker: 'Tea',
    },
    {
      session: 'Chemistry',
      status: Status.P,
      student: {
        id: 2,
        name: 'Sok',
        idCard: '987654321',
        className: 'B',
      },
      marker: 'Tea',
    },
    {
      session: 'Mathematic',
      status: Status.L,
      student: {
        id: 3,
        name: 'Ratha',
        idCard: '555555555',
        className: 'C',
      },
      marker: 'Tea',
    },
    {
      session: 'Mathematic',
      status: Status.A,
      student: {
        id: 4,
        name: 'Dara',
        idCard: '123456789',
        className: 'A',
      },
      marker: 'Tea',
    },
  ];

  private students = [
    {
      id: 1,
      name: 'Dara',
      idCard: '123456789',
      className: 'A',
    },
    {
      id: 2,
      name: 'Sok',
      idCard: '987654321',
      className: 'B',
    },
    {
      id: 3,
      name: 'Ratha',
      idCard: '555555555',
      className: 'C',
    },
    {
      id: 4,
      name: 'Dara',
      idCard: '123456789',
      className: 'A',
    },
  ];

  @Query('countAttendanceByClassName')
  countAttendanceByClassName(@Args('className') className: string) {
    return this.attendances.filter(
      (attendance) => attendance.student.className == className,
    ).length;
  }

  @Query('countAttendanceByStudentId')
  countAttendanceByStudentId(@Args('studentId') studentId: number) {
    return this.attendances.filter(
      (attendance) => attendance.student.id == studentId,
    ).length;
  }

  @Mutation('markAttendance')
  markAttendance(
    @Args('studentId') studentId: number,
    @Args('session') session: string,
    @Args('status') status: Status,
  ) {
    const student = this.students.find((student) => student.id == studentId);

    if (!student) {
      throw new Error('Student not found');
    }

    const attendance = {
      session,
      status,
      student,
      marker: 'Tea',
    };
    this.attendances.push(attendance);
    return attendance;
  }

  @Mutation('removeAttendance')
  removeAttendance(
    @Args('session') session: string,
    @Args('studentId') studentId: number,
  ) {
    const attendanceIndex = this.attendances.findIndex(
      (attendance) =>
        attendance.session == session && attendance.student.id == studentId,
    );
    if (attendanceIndex == -1) {
      throw new Error('Attendance not found');
    }
    this.attendances.splice(attendanceIndex, 1);
    return true;
  }
}
