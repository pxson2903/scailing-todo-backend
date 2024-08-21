import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TaskEntity } from './entities/task.entity';
import configuration from '../config/config';


@Module({
  controllers: [TaskController],
  exports: [TaskService],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forFeature([TaskEntity]),
    JwtModule.register({
      secret: configuration().jwtSecret,
      signOptions: { expiresIn: '30m' },
    }),
  ],
  providers: [TaskService],
})
export class TaskModule {}