import { Injectable } from '@nestjs/common';
import { WeatherApi, WeatherData } from '../interfaces/weather-api';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class WeatherStackAdapter implements WeatherApi {
  private readonly apiUrl: string;
  private readonly apiKey: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiUrl = this.configService.get<string>('WEATHERSTACK_API_URL');
    this.apiKey = this.configService.get<string>('WEATHERSTACK_API_KEY');
  }

  async getWeather(lat: number, lon: number): Promise<WeatherData> {
    const response = await this.httpService
      .get(`${this.apiUrl}?access_key=${this.apiKey}&query=${lat},${lon}`)
      .toPromise();
    const data = response.data;

    return {
      temperature: data.current.temperature,
      description: data.current.weather_descriptions[0],
      city: data.location.name,
      country: data.location.country,
      humidity: data.current.humidity,
      windSpeed: data.current.wind_speed,
    };
  }
}
