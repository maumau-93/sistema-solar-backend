import IPlanet from '../../models/interfaces/I-planet';

const createNewPlanet = (planet: IPlanet): IPlanet => {
  if (planet.name.length >= 2) return planet;
  throw new Error(planet.name);
};

export default createNewPlanet;
