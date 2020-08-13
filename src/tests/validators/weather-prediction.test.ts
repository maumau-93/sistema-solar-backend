import { HTTP_CODES, WEATHER_FORECAST_VALIDATION } from '../../utils/global';
import {
  daySchemaValidator,
  weatherConditionValidator
} from '../../validators/weather-prediction';

let res: any;
let next: any;

beforeEach(() => {
  res = {
    status: jest.fn(() => res),
    json: jest.fn()
  };
  next = jest.fn();
});

describe('daySchemaValidator', () => {
  it('should validate and approve the day provided', () => {
    const req: any = {
      params: {
        day: 10
      }
    };
    daySchemaValidator(req, res, next);
    expect(next).toHaveBeenCalled();
  });
  it('should validate and reject the day provided', () => {
    const req: any = {
      params: {
        day: '10a'
      }
    };
    daySchemaValidator(req, res, next);
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(HTTP_CODES.BAD_REQUEST);
    expect(res.json).toHaveBeenCalledWith(
      WEATHER_FORECAST_VALIDATION.INVALID_DAY_PARAMETER
    );
  });
});

describe('weatherConditionValidator', () => {
  it('should validate and approve the weather provided', () => {
    const req: any = {
      query: {
        condition: 'rainy'
      }
    };
    weatherConditionValidator(req, res, next);
    expect(next).toHaveBeenCalled();
  });
  it('should validate and approve when no weather is provided', () => {
    const req: any = {
      query: {}
    };
    weatherConditionValidator(req, res, next);
    expect(next).toHaveBeenCalled();
  });
  it('should validate and reject the weather provided', () => {
    const req: any = {
      query: {
        condition: 'invalidWeather'
      }
    };
    weatherConditionValidator(req, res, next);
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(HTTP_CODES.BAD_REQUEST);
    expect(res.json).toHaveBeenCalledWith(
      WEATHER_FORECAST_VALIDATION.INVALID_WEATHER_PARAMETER
    );
  });
});
