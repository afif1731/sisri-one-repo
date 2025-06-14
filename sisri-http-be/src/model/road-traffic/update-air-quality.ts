import { type Quality } from '@prisma/client';

export interface IUpdateAirQuality {
  pm1?: number;
  pm10?: number;
  pm25?: number;
  co?: number;
  no2?: number;
  ozone?: number;
  temperature?: number;
  humidity?: number;
  pressure?: number;
  aqi?: number;
  quality?: Quality;
}
