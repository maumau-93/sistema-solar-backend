import mockingoose from 'mockingoose';
import { planetSchema } from '../../models/planet';
import { planetWithValidData } from '../data/planet';
import createNewPlanet from '../../services/planet';

beforeEach(() => {
  mockingoose.resetAll();
});

describe('Create Planet', () => {
  it('Should save successfully a new Planet', async () => {
    mockingoose(planetSchema).toReturn(planetWithValidData, 'save');
    const result = await createNewPlanet(planetWithValidData);
    expect(result).toMatchSnapshot();
  });
});
