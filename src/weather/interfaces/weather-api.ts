export interface WeatherApi {
  getWeather(lat: number, lon: number): Promise<WeatherData>;
}

export type ApiType = 'openweathermap' | 'weatherstack';

export interface WeatherData {
  temperature: number;
  description: string;
  city: string;
  country: string;
  humidity: number;
  windSpeed: number;
}
