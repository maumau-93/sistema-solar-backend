import { HTTP_CODES, WEATHER_FORECAST_VALIDATION } from '../utils/global';
import { Request, Response, NextFunction } from 'express';
import { Validator } from 'jsonschema';

const validator = new Validator();
const intRegex = /^([+-]?[1-9]\d*|0)$/;
const letterRegex = /^[a-zA-Z]+$/;

const daySchema = {
  required: true,
  pattern: intRegex
};

const weatherConditionSchema = {
  required: false,
  pattern: letterRegex,
  enum: ['rainy', 'optimal', 'drought']
};

const weatherConditionValidator = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let theWeather = req.query.condition;
  if (!theWeather) next();
  theWeather = theWeather?.toString().toLowerCase();
  const validatorResponse = validator.validate(
    theWeather,
    weatherConditionSchema
  );
  if (validatorResponse.errors.length === 0) {
    req.query.condition = theWeather;
    next();
  } else {
    res
      .status(HTTP_CODES.BAD_REQUEST)
      .json(WEATHER_FORECAST_VALIDATION.INVALID_WEATHER_PARAMETER);
  }
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
    res
      .status(HTTP_CODES.BAD_REQUEST)
      .json(WEATHER_FORECAST_VALIDATION.INVALID_DAY_PARAMETER);
  }
};

export { daySchemaValidator, weatherConditionValidator };
