import GalaxyWeather from '../../models/enums/galaxy-weather';
import IPlanet from '../../models/interfaces/I-planet';
import IWeatherPrediction from '../../models/interfaces/I-weather-prediction';
import {
  GET_MAX_PREC_RANGE,
  GET_WEATHER_MESSAGES,
  UPDATE_MAX_PREC,
  WEATHER_CREATION_MESSAGES
} from '../../utils/global';

const res: IWeatherPrediction = {
  day: 29,
  weather: GalaxyWeather.Rainy,
  maxPrecipiation: false,
  precipitationPolygonPerimeter: 300,
  startingPeriod: false
};

const getPeriodCountForWeather = (weather: string): number => {
  if (weather === GalaxyWeather.Rainy) return 50;
  else if (weather === GalaxyWeather.Drought) return 10;
  else if (weather === GalaxyWeather.OptimalContitions) return 20;
  throw new Error(GET_WEATHER_MESSAGES.GET_ERROR_NOT_FOUND);
};

const getWeatherPrediction = (day: number): IWeatherPrediction => {
  if (day === 50) return res;
  throw new Error(GET_WEATHER_MESSAGES.GET_ERROR_NOT_FOUND);
};

const getMostRecentProcessedDay = (): IWeatherPrediction => {
  return res;
};

const getMaximumPrecipitationPredictionInRangeOfDays = (
  startDay: number,
  endDay: number
): IWeatherPrediction => {
  if (startDay === 30) return res;
  throw new Error(GET_MAX_PREC_RANGE.ERROR);
};

const getMaximumPrecipitationPredictionInHistory = (): IWeatherPrediction => {
  return res;
};

const setMaxPrecipitationFlag = (day: number, value: boolean): void => {
  if (!value) throw new Error(UPDATE_MAX_PREC.ERROR);
};

const createNewWeatherPrediction = (
  startDay: number,
  endDay: number,
  planets: IPlanet[]
): void => {
  if (startDay === 30)
    throw new Error(WEATHER_CREATION_MESSAGES.ERROR_CREATING);
};

export {
  createNewWeatherPrediction,
  getMaximumPrecipitationPredictionInRangeOfDays,
  getMaximumPrecipitationPredictionInHistory,
  getMostRecentProcessedDay,
  getPeriodCountForWeather,
  getWeatherPrediction,
  setMaxPrecipitationFlag
};
