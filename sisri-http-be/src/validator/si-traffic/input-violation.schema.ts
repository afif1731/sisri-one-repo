import Joi from 'joi';

export const inputViolationSchema = Joi.object({
  detail: Joi.string().required(),
  image: Joi.string().optional().not(null),
});
