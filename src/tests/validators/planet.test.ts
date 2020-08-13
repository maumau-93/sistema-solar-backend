import planetSchemaValidator from '../../validators/planet';
import { planetWithValidData, planetWithInvalidName } from '../data/planet';
import { HTTP_CODES, PLANET_VALIDATION } from '../../utils/global';

let res: any;
let next: any;

beforeEach(() => {
  res = {
    status: jest.fn(() => res),
    json: jest.fn()
  };
  next = jest.fn();
});

describe('planetSchemaValidator', () => {
  it('should validate successfully the provided planet with no errors', () => {
    const req: any = {
      body: {
        planet: planetWithValidData
      }
    };
    planetSchemaValidator(req, res, next);
    expect(next).toHaveBeenCalled();
  });
  it('should validate successfully the provided planet with errors, rejecting the request', () => {
    const req: any = {
      body: {
        planet: planetWithInvalidName
      }
    };
    planetSchemaValidator(req, res, next);
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(HTTP_CODES.BAD_REQUEST);
    expect(res.json).toHaveBeenCalledWith(
      PLANET_VALIDATION.INVALID_PLANET_OBJECT
    );
  });
});
