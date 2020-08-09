import { planetSchema, PlanetModel } from '../models/planet';
import IPlanet from '../models/interfaces/I-planet';
import Logger from '../config/loaders/logger';
import { PLANET_CREATION_MESSAGES } from '../utils/global';

const createNewPlanet = async (
  planetToCreate: IPlanet
): Promise<PlanetModel> => {
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

export default createNewPlanet;
