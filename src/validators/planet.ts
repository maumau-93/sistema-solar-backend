import IPlanet from '../models/interfaces/I-planet';
import { HTTP_CODES, PLANET_VALIDATION } from '../utils/global';
import { Request, Response, NextFunction } from 'express';
import { Validator } from 'jsonschema';

const validator = new Validator();

const planetSchema = {
  properties: {
    name: {
      type: 'string',
      minLength: 2,
      maxLength: 30
    },
    distanceToSun: {
      type: 'number'
    },
    angularSpeed: {
      type: 'number'
    },
    planetDirection: {
      type: 'number'
    }
  },
  required: ['name', 'distanceToSun', 'angularSpeed', 'planetDirection'],
  additionalProperties: false
};

const planetSchemaValidator = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const newPlanet = req.body.planet as IPlanet;
  const validatorResponse = validator.validate(newPlanet, planetSchema);
  if (validatorResponse.errors.length === 0) {
    req.body.planet = newPlanet;
    next();
  } else {
    res
      .status(HTTP_CODES.BAD_REQUEST)
      .json(PLANET_VALIDATION.INVALID_PLANET_OBJECT);
  }
};

export default planetSchemaValidator;
