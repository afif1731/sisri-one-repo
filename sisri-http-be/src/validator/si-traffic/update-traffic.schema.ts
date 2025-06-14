import Joi from 'joi';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const UpdateTrafficCctvSchema = Joi.object({
  traffic_flow: Joi.number().optional().not(null),
  vehicle_num: Joi.number().optional().not(null),
});

// eslint-disable-next-line @typescript-eslint/naming-convention
export const UpdateTrafficIdSchema = Joi.object({
  traffic_flow: Joi.number().optional().not(null),
  vehicle_num: Joi.number().optional().not(null),
  detection_range: Joi.number().optional().not(null),
});
