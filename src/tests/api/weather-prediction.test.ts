import GalaxyWeather from '../../models/enums/galaxy-weather';
import { GET_WEATHER_MESSAGES, HTTP_CODES } from '../../utils/global';
import {
  getDayOfMaxPrecipitation,
  getQuantityOfClimaticPeriods,
  getWeatherForecastByDayNumber
} from '../../api/weather-prediction';

let res: any;

beforeEach(() => {
  res = {
    status: jest.fn(() => res),
    json: jest.fn()
  };
});

jest.mock('../../services/weather-prediction');

describe('getWeatherForecastByDayNumber', () => {
  it('should retreive the weather forecast successfully', async () => {
    const req: any = {
      params: {
        day: 50
      }
    };
    await getWeatherForecastByDayNumber(req, res);
    expect(res.status).toHaveBeenCalledWith(HTTP_CODES.OK);
    expect(res.json).toHaveBeenCalledWith({
      day: 29,
      weather: GalaxyWeather.Rainy
    });
  });
  it('should fail to retreive the weather forecast', async () => {
    const req: any = {
      params: {
        day: 10
      }
    };
    await getWeatherForecastByDayNumber(req, res);
    expect(res.status).toHaveBeenCalledWith(HTTP_CODES.NOT_FOUND);
    expect(res.json).toHaveBeenCalledWith(
      GET_WEATHER_MESSAGES.GET_ERROR_NOT_FOUND
    );
  });
});

describe('getQuantityOfClimaticPeriods', () => {
  it('should retreive correctly the quantity of periods for the specified weather', async () => {
    const req: any = {
      query: {
        condition: 'rainy'
      }
    };
    await getQuantityOfClimaticPeriods(req, res);
    expect(res.status).toHaveBeenCalledWith(HTTP_CODES.OK);
    expect(res.json).toHaveBeenCalledWith({ rainy: 50 });
  });
  it('should retreive correctly the quantity of periods without specifying weather', async () => {
    const req: any = {
      query: {}
    };
    await getQuantityOfClimaticPeriods(req, res);
    expect(res.status).toHaveBeenCalledWith(HTTP_CODES.OK);
    expect(res.json).toHaveBeenCalledWith({
      drought: 10,
      optimal: 20,
      rainy: 50
    });
  });
  it('should retreive correctly the quantity of periods for the specified weather', async () => {
    const req: any = {
      query: {
        condition: 'unkwnown'
      }
    };
    await getQuantityOfClimaticPeriods(req, res);
    expect(res.status).toHaveBeenCalledWith(HTTP_CODES.INTERNAL_SERVER_ERROR);
    expect(res.json).toHaveBeenCalledWith(
      GET_WEATHER_MESSAGES.GET_ERROR_NOT_FOUND
    );
  });
});

describe('getDayOfMaxPrecipitation', () => {
  it('Should retreive correctly the day of maximum precipitation', async () => {
    const req: any = {};
    await getDayOfMaxPrecipitation(req, res);
    expect(res.status).toHaveBeenCalledWith(HTTP_CODES.OK);
    expect(res.json).toHaveBeenCalledWith({ day: 29, trianglePerimeter: 300 });
  });
});
