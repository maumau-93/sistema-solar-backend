import IPlanet from '../../models/interfaces/I-planet';

const createNewPlanet = (planet: IPlanet): any => {
  if (planet.name.length >= 2) return planet;
  throw new Error(planet.name);
};

const getInitialPlanets = (planetNames: string[]): any => {
  if (planetNames.length === 3) return ['Success'];
  throw new Error('Error occured');
};

export { createNewPlanet, getInitialPlanets };
