import {
  Controller,
  Get,
  Post,
  Body,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
  Req,
  Patch,
  Delete,
  Param,
  BadRequestException,
} from '@nestjs/common';

import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { AuthGuard } from '../auth/auth.guard';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskOwnerGuard } from './guards/task-owner.guard';

@Controller('tasks')
@UseGuards(AuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('/')
  async create(@Body() createTaskDto: CreateTaskDto, @Req() request: Request) {
    const userId = request?.[`user`]?.id;
    return this.taskService.create({
      ...createTaskDto,
      createdBy: userId,
    });
  }

  @Get('/')
  findAll(@Req() request: Request) {
    const userId = request?.[`user`]?.id;
    return this.taskService.findAll({
      createdBy: userId,
    });
  }

  @UseGuards(TaskOwnerGuard)
  @Get(':id')
  async findById(@Param('id') id: string) {
    const task = await this.taskService.findOne({ id: +id });
    if (!task) {
      throw new BadRequestException('Task not found');
    }
    return this.taskService.findOne({ id: +id });
  }

  @UseGuards(TaskOwnerGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(+id, updateTaskDto);
  }

  @UseGuards(TaskOwnerGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }
}
