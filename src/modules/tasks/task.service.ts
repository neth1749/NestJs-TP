/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Task } from './entities/task.entity';
import { User } from '../users/entities/user.entity';
import { CreateTaskDto } from 'src/modules/tasks/dto/create-task.dto';
import { UpdateTaskDto } from 'src/modules/tasks/dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const user = await this.userRepository.findOneBy({
      id: createTaskDto.userId,
    });
    if (!user)
      throw new NotFoundException(
        `User with ID ${createTaskDto.userId} not found`,
      );

    const task = this.taskRepository.create({
      name: createTaskDto.name,
      description: createTaskDto.description,
      user: user,
    });

    return this.taskRepository.save(task);
  }

  async findAll(): Promise<Task[]> {
    return this.taskRepository.find({ relations: ['user'] });
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!task) throw new NotFoundException(`Task with id ${id} not found`);
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.taskRepository.preload({
      id,
      ...updateTaskDto,
    });

    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    if (updateTaskDto.userId) {
      const user = await this.userRepository.findOneBy({
        id: updateTaskDto.userId,
      });
      if (!user) {
        throw new NotFoundException(
          `User with ID ${updateTaskDto.userId} not found`,
        );
      }
      task.user = user;
    }

    if ('completedAt' in updateTaskDto) {
      if (updateTaskDto.completedAt) {
        task.completedAt = new Date(); // set current timestamp if truthy
      } else {
        task.completedAt = null; // clear completedAt if falsy
      }
    }

    return this.taskRepository.save(task);
  }

  async remove(id: number): Promise<{ message: string }> {
    const task = await this.findOne(id); // throws if not found
    await this.taskRepository.remove(task);
    return { message: `Task ${id} has been removed successfully!` };
  }
}
