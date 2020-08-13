import { createNewPlanet, getInitialPlanets } from '../../services/planet';
import { planetWithValidData, planetWithInvalidName } from '../data/planet';

jest.mock('../../models/planet');

describe('createPlanet', () => {
  it('Should save successfully a new Planet', async () => {
    const result = await createNewPlanet(planetWithValidData);
    expect(result.name).toBe(planetWithValidData.name);
  });
  it('Should fail to create a new Planet', async () => {
    try {
      await createNewPlanet(planetWithInvalidName);
    } catch (e) {
      expect(e).toMatchSnapshot();
    }
  });
});

describe('getInitialPlanets', () => {
  it('should retreive successfully the requested planet', async () => {
    const result = await getInitialPlanets(['myPlanet']);
    expect(result[0].name).toBe(planetWithValidData.name);
  });
});
