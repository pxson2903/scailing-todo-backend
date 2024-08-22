import { ApiType } from 'src/weather/interfaces/weather-api';

export class UpdateTaskDto {
  title?: string;
  description?: string;
  compelted?: boolean;
  lat?: number;
  lon?: number;
  apiType?: ApiType;
}
