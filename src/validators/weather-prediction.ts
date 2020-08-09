import { Validator } from 'jsonschema';
import { Request, Response, NextFunction } from 'express';
import { HTTP_CODES, WEATHER_FORECAST_VALIDATION } from '../utils/global';

const validator = new Validator();
const intRegex = /^([+-]?[1-9]\d*|0)$/;

const daySchema = {
  required: true,
  pattern: intRegex
};

const daySchemaValidator = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const theDay = req.params.day;
  const validatorResponse = validator.validate(theDay, daySchema);
  if (validatorResponse.errors.length === 0) next();
  else {
    res.status(HTTP_CODES.BAD_REQUEST).send({
      status: HTTP_CODES.BAD_REQUEST,
      message: WEATHER_FORECAST_VALIDATION.INVALID_DAY_PARAMETER
    });
  }
};

export default daySchemaValidator;
