import joi from 'joi';

export const registerSchema = joi.object({
  name: joi.string().required().messages({
    'string.name': 'Please provide a valid name',
    'any.required': 'name is required',
  }),
  email: joi.string().email().required().messages({
    'string.email': 'Please provide a valid email',
    'any.required': 'Email is required',
  }),
  password: joi
    .string()
    .pattern(/^[a-zA-Z0-9!@#$%^&*()_+\-=]{8,20}$/)
    .messages({
      'string.pattern.base': 'Please enter a strong password (8-20 alphanumeric characters)',
      'any.required': 'Password is required',
    }),

  image_url: joi.string().required(),
});

export const loginSchema = joi.object({
  email: joi.string().email().required().messages({
    'string.email': 'Please provide a valid email',
    'any.required': 'Email is required',
  }),
  password: joi
    .string()
    .required()
    .pattern(/^[a-zA-Z0-9!@#$%^&*()_+\-=]{8,20}$/)
    .messages({
      'string.pattern.base': 'Please enter a strong password (8-20 alphanumeric characters)',
      'any.required': 'Password is required',
    }),
});
