import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateTaskDto } from './dto/create-task.dto';
import { TaskEntity } from './entities/task.entity';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}
  async create(createTaskDto: CreateTaskDto): Promise<CreateTaskDto> {
    return this.taskRepository.save(createTaskDto);
  }

  async findAll(condition): Promise<TaskEntity[]> {
    return this.taskRepository.find({ where: condition });
  }

  async findOne(condition): Promise<TaskEntity> {
    return this.taskRepository.findOne({ where: condition });
  }

  async update(id: number, updateAuthDto: QueryDeepPartialEntity<TaskEntity>) {
    // @ts-ignore
    return this.taskRepository.update(id, updateAuthDto);
  }

  remove(id: number) {
    return this.taskRepository.delete(id);
  }
}
