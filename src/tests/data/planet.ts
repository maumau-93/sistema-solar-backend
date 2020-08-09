import { planetSchema } from '../../models/planet';

const planetWithValidData = new planetSchema({
  _id: '507f191e810c19729de860ea',
  name: 'Planet 1',
  distanceToSun: 3784,
  angularSpeed: 2,
  planetDirection: 1
});

const planetWithInvalidName = new planetSchema({
  _id: '507f191e810c19729de860eb',
  name: 'P',
  distanceToSun: 3784,
  angularSpeed: 2,
  planetDirection: 1
});

export { planetWithValidData, planetWithInvalidName };
