import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';

@Resolver('Student')
export class StudentResolver {
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
  @Query('students')
  getAllStudent() {
    return this.students;
  }

  @Query('student')
  getStudentByClassName(@Args('className') className: string) {
    return this.students.filter((student) => student.className == className);
  }

  @Mutation('enrollStudent')
  enrollStudent(
    @Args('name') name: string,
    @Args('idCard') idCard: string,
    @Args('className') className: string,
  ) {
    const sortedStudents = this.students.sort((a, b) => a.id - b.id);
    const lastId =
      sortedStudents.length > 0
        ? sortedStudents[sortedStudents.length - 1].id
        : 0;
    const newStudent = { id: lastId + 1, name, idCard, className };
    this.students.push(newStudent);
    return newStudent;
  }

  @Mutation('updateStudent')
  updateStudent(
    @Args('id') id: number,
    @Args('name') name: string,
    @Args('idCard') idCard: string,
    @Args('className') className: string,
  ) {
    const studentIndex = this.students.findIndex((student) => student.id == id);
    if (studentIndex == -1) {
      throw new Error('Student not found');
    }
    const updateStudent = {
      ...this.students[studentIndex],
      name,
      idCard,
      className,
    };
    this.students[studentIndex] = updateStudent;
    return updateStudent;
  }

  @Mutation('deleteStudent')
  deleteStudent(@Args('id') id: number) {
    try {
      const studentIndex = this.students.findIndex(
        (student) => student.id == id,
      );
      if (studentIndex == -1) {
        return false;
      }
      this.students.splice(studentIndex, 1);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}
