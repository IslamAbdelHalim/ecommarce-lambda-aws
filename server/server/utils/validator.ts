import { ObjectSchema } from 'joi';

export const validate = (schema: ObjectSchema, payload: any) => {
  const { error, value } = schema.validate(payload);

  if (error) {
    const errMsg = error.details.map((err) => err.message);
    return {
      valid: false,
      errors: errMsg,
    };
  }

  return { valid: true, value };
};
