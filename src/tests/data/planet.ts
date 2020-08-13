import IPlanet from '../../models/interfaces/I-planet';

const planetWithValidData: IPlanet = {
  name: 'Planet1',
  distanceToSun: 3784,
  angularSpeed: 2,
  planetDirection: 1
};

const planetWithValidData2: IPlanet = {
  name: 'Planet2',
  distanceToSun: 4584,
  angularSpeed: 3,
  planetDirection: -1
};

const planetWithInvalidName: IPlanet = {
  name: 'P',
  distanceToSun: 3784,
  angularSpeed: 2,
  planetDirection: 1
};

export { planetWithValidData, planetWithValidData2, planetWithInvalidName };
