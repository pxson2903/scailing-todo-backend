import {
  Controller,
  Get,
  Post,
  Body,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
  Req,
} from '@nestjs/common';

import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('tasks')
@UseInterceptors(ClassSerializerInterceptor)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(AuthGuard)
  @Post('/')
  async create(@Body() createTaskDto: CreateTaskDto, @Req() request: Request) {
    const userId = request?.[`user`]?.id;
    return this.taskService.create({
      title: createTaskDto.title,
      description: createTaskDto.description,
      createdBy: userId,
    });
  }

  @UseGuards(AuthGuard)
  @Get('/')
  findAll(@Req() request: Request) {
    const userId = request?.[`user`]?.id;
    return this.taskService.findAll({
      createdBy: userId,
    });
  }
}
