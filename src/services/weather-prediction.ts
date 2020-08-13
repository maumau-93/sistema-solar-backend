import env from '../config/env';
import events from '../events/events';
import IPlanet from '../models/interfaces/I-planet';
import IWeatherPrediction from '../models/interfaces/I-weather-prediction';
import Logger from '../config/loaders/logger';
import { weatherPredictionSchema } from '../models/weather-prediction';
import {
  GET_WEATHER_MESSAGES,
  GET_DAY_MESSAGES,
  GET_MAX_PREC_RANGE,
  GET_MAX_PREC_HIST,
  GET_PERIOD_WEATHER_COUNT,
  UPDATE_MAX_PREC,
  WEATHER_CREATION_MESSAGES
} from '../utils/global';
import {
  calculateCoordinates,
  determineWeatherForDay
} from '../utils/weather-prediction';

/**
 * Returns the count of periods for the specified weather
 * @param weather
 * @returns {Promise<number>}
 */
const getPeriodCountForWeather = async (weather: string): Promise<number> => {
  Logger.info(GET_PERIOD_WEATHER_COUNT.START);
  return await weatherPredictionSchema.countDocuments({
    weather,
    startingPeriod: true
  });
};

/**
 * Returns the weather prediction for the specified day
 * @param day
 * @returns {Promise<IWeatherPrediction>}
 */
const getWeatherPrediction = async (
  day: number
): Promise<IWeatherPrediction> => {
  try {
    Logger.info(GET_WEATHER_MESSAGES.GET_STARTED);
    const weatherPrediction = await weatherPredictionSchema.findOne({ day });
    if (!weatherPrediction) {
      throw new Error(GET_WEATHER_MESSAGES.GET_ERROR_NOT_FOUND);
    }
    return weatherPrediction;
  } catch (e) {
    Logger.info(GET_WEATHER_MESSAGES.GET_ERROR_FAILURE);
    Logger.error(e);
    throw e;
  }
};

/**
 * Returns the most recently processed weather prediction
 * @returns {Promise<IWeatherPrediction>}
 */
const getMostRecentProcessedDay = async (): Promise<IWeatherPrediction> => {
  try {
    Logger.info(GET_DAY_MESSAGES.GET_STARTED);
    const mostRecentProcessedDay = await weatherPredictionSchema
      .find()
      .sort({ day: -1 })
      .limit(1);
    Logger.info(GET_DAY_MESSAGES.GET_FINISHED);
    return mostRecentProcessedDay[0];
  } catch (e) {
    Logger.info(GET_DAY_MESSAGES.GET_ERROR_FAILURE);
    Logger.error(e);
    throw e;
  }
};

/**
 * Returns the weather precition for the maximum precipitation in the given
 * range of days
 * @param startDay
 * @param endDay
 * @returns {Promise<IWeatherPrediction>}
 */
const getMaximumPrecipitationPredictionInRangeOfDays = async (
  startDay: number,
  endDay: number
): Promise<IWeatherPrediction> => {
  try {
    Logger.info(GET_MAX_PREC_RANGE.START);
    const maxPrecipitationDay = await weatherPredictionSchema
      .find({
        day: { $gte: startDay, $lte: endDay },
        precipitationPolygonPerimeter: { $exists: true }
      })
      .sort({ precipitationPolygonPerimeter: -1 })
      .limit(1);
    Logger.info(GET_MAX_PREC_RANGE.FINISH);
    return maxPrecipitationDay[0];
  } catch (e) {
    Logger.info(GET_MAX_PREC_RANGE.ERROR);
    Logger.error(e);
    throw e;
  }
};

/**
 * Retruns the weather prediction for the most rainy day in history
 * @returns {Promise<IWeatherPrediction>}
 */
const getMaximumPrecipitationPredictionInHistory = async (): Promise<
  IWeatherPrediction
> => {
  try {
    Logger.info(GET_MAX_PREC_HIST.START);
    const maxPrecipitationDayInHistory = await weatherPredictionSchema.find({
      maxPrecipitation: true
    });
    Logger.info(GET_MAX_PREC_HIST.FINISH);
    return maxPrecipitationDayInHistory[0];
  } catch (e) {
    Logger.info(GET_MAX_PREC_HIST.ERROR);
    Logger.error(e);
    throw e;
  }
};

/**
 * Updates the maxPrecipitation flag for the given weather prediction to the given value
 * @param weatherPrediction
 * @param value
 */
const setMaxPrecipitationFlag = async (
  day: number,
  value: boolean
): Promise<void> => {
  Logger.info(UPDATE_MAX_PREC.START);
  try {
    await weatherPredictionSchema.findOneAndUpdate(
      { day },
      { $set: { maxPrecipitation: value } }
    );
    Logger.info(UPDATE_MAX_PREC.FINISH);
  } catch (e) {
    Logger.info(UPDATE_MAX_PREC.ERROR);
    Logger.error(e);
    throw e;
  }
};

/**
 * Creates the weather prediction for the days in the range [startDay, endDay] for the given universe of planets
 * @param startDay
 * @param endDay
 * @param planets
 * @returns {Promise<void>}
 */
const createNewWeatherPrediction = async (
  startDay: number,
  endDay: number,
  planets: IPlanet[]
): Promise<void> => {
  const promiseList = [];
  try {
    Logger.info(WEATHER_CREATION_MESSAGES.STARTING_CREATION);
    const mostRecentWeatherPrediction = await getMostRecentProcessedDay();
    let mostRecentWeather = mostRecentWeatherPrediction
      ? mostRecentWeatherPrediction.weather
      : '';
    for (let i = startDay; i <= endDay; i++) {
      const cartesianCoordinatesMap = calculateCoordinates(planets, i);
      const weatherForDay = determineWeatherForDay(
        Array.from(cartesianCoordinatesMap.values())
      );
      const weatherPrediction: IWeatherPrediction = {
        day: i,
        weather: weatherForDay.predictedWeather,
        precipitationPolygonPerimeter:
          weatherForDay.precipitationPolygonPerimeter,
        startingPeriod: weatherForDay.predictedWeather !== mostRecentWeather
      };
      mostRecentWeather = weatherForDay.predictedWeather;
      promiseList.push(weatherPredictionSchema.create(weatherPrediction));
    }
    await Promise.all(promiseList);
    env.eventEmitter.emit(
      events.weatherPrediction.onCreation,
      startDay,
      endDay
    );
  } catch (e) {
    Logger.info(WEATHER_CREATION_MESSAGES.ERROR_CREATING);
    Logger.error(e);
    throw e;
  }
};

export {
  createNewWeatherPrediction,
  getMostRecentProcessedDay,
  setMaxPrecipitationFlag,
  getMaximumPrecipitationPredictionInHistory,
  getMaximumPrecipitationPredictionInRangeOfDays,
  getPeriodCountForWeather,
  getWeatherPrediction
};
