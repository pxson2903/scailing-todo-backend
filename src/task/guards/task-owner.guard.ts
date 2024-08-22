import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { TaskService } from '../task.service';

@Injectable()
export class TaskOwnerGuard implements CanActivate {
  constructor(private readonly taskService: TaskService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request?.[`user`]?.id;

    console.log('userId', request?.[`user`]);
    const taskId = request.params.id;

    if (!userId || !taskId) {
      throw new BadRequestException(
        'User ID or Task ID not found in the request',
      );
    }

    const task = await this.taskService.findOne({ id: +taskId });

    if (!task) {
      throw new BadRequestException('Task not found');
    }

    if (task.createdBy !== userId) {
      throw new BadRequestException(
        'You are not authorized to perform this action',
      );
    }

    return true;
  }
}
