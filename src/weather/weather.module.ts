import { Module } from '@nestjs/common';
import { WeatherController } from './weather.controller';
import { HttpModule } from '@nestjs/axios';
import { WeatherServiceFactory } from './factories/weather-service.factory';
import { OpenWeatherMapAdapter } from './adapters/open-weather-map.adapter';
import { WeatherStackAdapter } from './adapters/weather-stack.adapter';

@Module({
  imports: [HttpModule],
  controllers: [WeatherController],
  providers: [
    WeatherServiceFactory,
    OpenWeatherMapAdapter,
    WeatherStackAdapter,
  ],
  exports: [WeatherServiceFactory],
})
export class WeatherModule {}
