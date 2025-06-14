import Joi from 'joi';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const UpdateAirQualitySchema = Joi.object({
  pm1: Joi.number().optional().not(null),
  pm10: Joi.number().optional().not(null),
  pm25: Joi.number().optional().not(null),
  co: Joi.number().optional().not(null),
  no2: Joi.number().optional().not(null),
  ozone: Joi.number().optional().not(null),
  temperature: Joi.number().optional().not(null),
  humidity: Joi.number().optional().not(null),
  pressure: Joi.number().optional().not(null),
  aqi: Joi.number().optional().not(null),
});
