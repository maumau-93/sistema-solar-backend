import { Request, Response } from 'express';
import { createNewPlanet } from '../services/planet';
import { HTTP_CODES, PLANET_CREATION_MESSAGES } from '../utils/global';

/**
 * Controller function that creates a new Planet for the galaxy.
 * POST /api/planet
 * Visit models/planet:Planet to check body requirements for the new planet to be
 * inserted
 * @param req
 * @param res
 */
const createPlanet: (req: Request, res: Response) => Promise<void> = async (
  req: Request,
  res: Response
) => {
  try {
    const planetCreated = await createNewPlanet(req.body.planet);
    res.status(HTTP_CODES.OK).json(planetCreated);
  } catch (e) {
    res
      .status(HTTP_CODES.INTERNAL_SERVER_ERROR)
      .json(PLANET_CREATION_MESSAGES.ERROR_CREATING);
  }
};

export default createPlanet;
