import PlanetDirection from '../enums/planet-direction';

interface IPlanet {
  name: string;
  distanceToSun: number;
  angularSpeed: number;
  planetDirection: PlanetDirection;
}

export default IPlanet;
