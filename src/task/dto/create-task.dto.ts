import { ApiType } from 'src/weather/interfaces/weather-api';

export class CreateTaskDto {
  title?: string;
  description?: string;
  createdBy?: number;
  compelted?: boolean;
  lat?: number;
  lon?: number;
  apiType?: ApiType;
}
