import { Validator } from 'jsonschema';
import { Request, Response, NextFunction } from 'express';
import { HTTP_CODES, PLANET_VALIDATION } from '../utils/global';

const validator = new Validator();

const planetSchema = {};

const planetSchemaValidator = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  next();
};

export default planetSchemaValidator;
