import { planetWithValidData, planetWithInvalidName } from '../data/planet';
import createPlanet from '../../api/planet';
import { HTTP_CODES, PLANET_CREATION_MESSAGES } from '../../utils/global';

let res: any;

beforeEach(() => {
  res = {
    status: jest.fn(() => res),
    json: jest.fn()
  };
});

jest.mock('../../services/planet');

describe('createPlanet', () => {
  it('Should save successfully a new Planet', async () => {
    const req: any = {
      body: {
        planet: planetWithValidData
      }
    };
    await createPlanet(req, res);
    expect(res.status).toHaveBeenCalledWith(HTTP_CODES.OK);
    expect(res.json).toHaveBeenCalledWith(planetWithValidData);
  });
  it('Should fail saving an invalid new Planet', async () => {
    const req: any = {
      body: {
        planet: planetWithInvalidName
      }
    };
    await createPlanet(req, res);
    expect(res.status).toHaveBeenCalledWith(HTTP_CODES.INTERNAL_SERVER_ERROR);
    expect(res.json).toHaveBeenCalledWith(
      PLANET_CREATION_MESSAGES.ERROR_CREATING
    );
  });
});
