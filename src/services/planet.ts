import IPlanet from '../models/interfaces/I-planet';
import Logger from '../config/loaders/logger';
import { planetSchema } from '../models/planet';

import {
  PLANET_CREATION_MESSAGES,
  GET_PLANETS_MESSAGES
} from '../utils/global';

/**
 * Creates a new planet given a planet object and returns it
 * @param planetToCreate
 * @returns {Promise<IPlanet>}
 */
const createNewPlanet = async (planetToCreate: IPlanet): Promise<IPlanet> => {
  try {
    Logger.info(PLANET_CREATION_MESSAGES.STARTING_CREATION);
    const planetCreated = await planetSchema.create(planetToCreate);
    Logger.info(PLANET_CREATION_MESSAGES.CREATION_FINISHED);
    return planetCreated;
  } catch (e) {
    Logger.info(PLANET_CREATION_MESSAGES.ERROR_CREATING);
    Logger.error(e);
    throw e;
  }
};

/**
 * Returns a list of planets given a list of names
 * @param planetNames
 * @returns {Promise<IPlanet[]>}
 */
const getInitialPlanets = async (planetNames: string[]): Promise<IPlanet[]> => {
  try {
    Logger.info(GET_PLANETS_MESSAGES.GET_STARTED);
    const initialPlanets = await planetSchema.find({
      name: { $in: planetNames }
    });
    Logger.info(GET_PLANETS_MESSAGES.GET_FINISHED);
    return initialPlanets;
  } catch (e) {
    Logger.info(GET_PLANETS_MESSAGES.GET_ERROR_FAILURE);
    Logger.error(e);
    throw e;
  }
};

export { createNewPlanet, getInitialPlanets };
