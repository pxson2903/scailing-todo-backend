import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateTaskDto } from './dto/create-task.dto';
import { TaskEntity } from './entities/task.entity';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { TaskRepository } from './task.repository';
import { WeatherServiceFactory } from 'src/weather/factories/weather-service.factory';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: TaskRepository,
    private readonly weatherServiceFactory: WeatherServiceFactory,
  ) {}
  async create(createTaskDto: CreateTaskDto): Promise<CreateTaskDto> {
    const { lat, lon, apiType } = createTaskDto;

    const weatherService =
      this.weatherServiceFactory.getWeatherService(apiType);

    const weatherData = await weatherService.getWeather(lat, lon);

    return this.taskRepository.save({
      title: createTaskDto.title,
      description: createTaskDto.description,
      createdBy: createTaskDto.createdBy,
      completed: createTaskDto.compelted,
      temperature: weatherData.temperature,
      weatherDescription: weatherData.description,
      city: weatherData.city,
      country: weatherData.country,
      humidity: weatherData.humidity,
      windSpeed: weatherData.windSpeed,
    });
  }

  async findAll(condition): Promise<TaskEntity[]> {
    return this.taskRepository.find({ where: condition });
  }

  async findOne(condition): Promise<TaskEntity> {
    return this.taskRepository.findOne({ where: condition });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    const { lat, lon, apiType } = updateTaskDto;

    const weatherService =
      this.weatherServiceFactory.getWeatherService(apiType);

    const weatherData = await weatherService.getWeather(lat, lon);

    return this.taskRepository.update(id, {
      title: updateTaskDto.title,
      description: updateTaskDto.description,
      completed: updateTaskDto.completed,
      temperature: weatherData.temperature,
      weatherDescription: weatherData.description,
      city: weatherData.city,
      country: weatherData.country,
      humidity: weatherData.humidity,
      windSpeed: weatherData.windSpeed,
    });
  }

  remove(id: number) {
    return this.taskRepository.delete(id);
  }
}
