import { weatherPrediction1 } from '../../tests/data/weather-prediction';
import {
  GET_MAX_PREC_RANGE,
  UPDATE_MAX_PREC,
  WEATHER_CREATION_MESSAGES
} from '../../utils/global';

const create = (params: any) => {
  if (params && params.day === 20)
    throw new Error(WEATHER_CREATION_MESSAGES.ERROR_CREATING);
};

const find = (params: any) => {
  if (params && params.day && params.day.$gte === 2)
    throw new Error(GET_MAX_PREC_RANGE.ERROR);
  if (params && params.maxPrecipitation) return [weatherPrediction1];
  return {
    sort: jest.fn(() => {
      return {
        limit: jest.fn(() => {
          return [weatherPrediction1];
        })
      };
    })
  };
};

const findOne = (params: any) => {
  if (params && params.day === 50) {
    return undefined;
  } else if (params && params.day === 100) {
    return weatherPrediction1;
  }
};

const findOneAndUpdate = (params: any) => {
  if (!(params && params.day === 10)) {
    throw new Error(UPDATE_MAX_PREC.ERROR);
  }
};

const countDocuments = jest.fn().mockReturnValueOnce(10);

const weatherPredictionSchema = {
  create,
  find,
  countDocuments,
  findOne,
  findOneAndUpdate
};
const GalaxyWeatherModel = {};

export { weatherPredictionSchema, GalaxyWeatherModel };
