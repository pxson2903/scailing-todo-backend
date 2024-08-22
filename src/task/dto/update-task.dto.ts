import { ApiType } from 'src/weather/interfaces/weather-api';

export class UpdateTaskDto {
  title?: string;
  description?: string;
  completed?: boolean;
  lat?: number;
  lon?: number;
  apiType?: ApiType;
}
