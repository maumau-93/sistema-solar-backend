import IPlanet from '../interfaces/I-planet';
import { planetWithValidData } from '../../tests/data/planet';
import { PLANET_CREATION_MESSAGES } from '../../utils/global';

const create = (planetToCreate: IPlanet): IPlanet => {
  if (planetToCreate.name.length > 2) return planetToCreate;
  throw new Error(PLANET_CREATION_MESSAGES.ERROR_CREATING);
};

const find = (): IPlanet[] => {
  return [planetWithValidData];
};

const planetSchema = {
  create,
  find
};
const planetModel = {};

export { planetSchema, planetModel };
