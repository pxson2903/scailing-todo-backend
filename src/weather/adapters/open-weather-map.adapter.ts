import { Injectable } from '@nestjs/common';
import { WeatherApi, WeatherData } from '../interfaces/weather-api';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OpenWeatherMapAdapter implements WeatherApi {
  private readonly apiUrl: string;
  private readonly apiKey: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiUrl = this.configService.get<string>('OPENWEATHERMAP_API_URL');
    this.apiKey = this.configService.get<string>('OPENWEATHERMAP_API_KEY');
  }

  async getWeather(lat: number, lon: number): Promise<WeatherData> {
    const response = await this.httpService
      .get(
        `${this.apiUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`,
      )
      .toPromise();
    const data = response.data;

    return {
      temperature: data.main.temp,
      description: data.weather[0].description,
      city: data.name,
      country: data.sys.country,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
    };
  }
}
