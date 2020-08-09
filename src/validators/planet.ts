import { Validator } from 'jsonschema';
import { Request, Response, NextFunction } from 'express';
import { HTTP_CODES, PLANET_VALIDATION } from '../utils/global';
import IPlanet from '../models/interfaces/I-planet';
import Planet from '../models/planet';

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

const createPlanetObject = (newPlanet: IPlanet) => {
  const planet = new Planet({
    name: newPlanet.name,
    distanceToSun: newPlanet.distanceToSun,
    angularSpeed: newPlanet.angularSpeed,
    planetDirection: newPlanet.planetDirection
  });
  return planet;
};

const planetSchemaValidator = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const newPlanet = req.body.planet as IPlanet;
  const validatorResponse = validator.validate(newPlanet, planetSchema);
  if (validatorResponse.errors.length === 0) {
    req.body.planet = createPlanetObject(newPlanet);
    next();
  } else {
    res.status(HTTP_CODES.BAD_REQUEST).send({
      status: HTTP_CODES.BAD_REQUEST,
      message: PLANET_VALIDATION.INVALID_PLANET_OBJECT
    });
  }
};

export default planetSchemaValidator;
