import { Injectable } from '@nestjs/common';
import { OpenWeatherMapAdapter } from '../adapters/open-weather-map.adapter';
import { WeatherStackAdapter } from '../adapters/weather-stack.adapter';
import { ApiType, WeatherApi } from '../interfaces/weather-api';
@Injectable()
export class WeatherServiceFactory {
  constructor(
    private readonly openWeatherMapAdapter: OpenWeatherMapAdapter,
    private readonly weatherStackAdapter: WeatherStackAdapter,
  ) {}

  getWeatherService(apiType: ApiType): WeatherApi {
    switch (apiType) {
      case 'openweathermap':
        return this.openWeatherMapAdapter;
      case 'weatherstack':
        return this.weatherStackAdapter;
      default:
        throw new Error('Unknown Weather API type');
    }
  }
}
