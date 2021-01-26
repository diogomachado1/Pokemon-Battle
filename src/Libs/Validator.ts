/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable class-methods-use-this */
import { ObjectSchema } from 'yup';
import CustomError from './CustomError';

export default class Validator {
  async validate<T>(schema: ObjectSchema<any, any, any, T>, data: any) {
    try {
      const response = await schema.validate(data, {
        abortEarly: true,
        stripUnknown: true,
      });
      return response;
    } catch (err) {
      throw new CustomError(err.message, 400);
    }
  }
}

module.exports = Validator;
