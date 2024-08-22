import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { WeatherServiceFactory } from './factories/weather-service.factory';
import { ApiType } from './interfaces/weather-api';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherServiceFactory: WeatherServiceFactory) {}

  @Get('/')
  async getWeather(
    @Query('lat') lat: string,
    @Query('lon') lon: string,
    @Query('apiType') apiType: ApiType,
  ) {
    const latitude = parseFloat(lat);
    const longitude = parseFloat(lon);

    if (isNaN(latitude) || isNaN(longitude) || !apiType) {
      throw new BadRequestException(
        'Latitude, Longitude, and API type must be provided and valid',
      );
    }

    const weatherService =
      this.weatherServiceFactory.getWeatherService(apiType);
    return await weatherService.getWeather(latitude, longitude);
  }
}
