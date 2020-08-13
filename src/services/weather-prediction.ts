import env from '../config/env';
import events from '../events/events';
import IPlanet from '../models/interfaces/I-planet';
import IWeatherPrediction from '../models/interfaces/I-weather-prediction';
import Logger from '../config/loaders/logger';
import redisInstance from '../config/loaders/redis';
import { promisify } from 'util';
import { weatherPredictionSchema } from '../models/weather-prediction';
import {
  GET_WEATHER_MESSAGES,
  GET_DAY_MESSAGES,
  GET_MAX_PREC_RANGE,
  GET_MAX_PREC_HIST,
  GET_PERIOD_WEATHER_COUNT,
  UPDATE_MAX_PREC,
  WEATHER_CREATION_MESSAGES,
  REDIS_CHECKING,
  WEATHER_CACHE_POSTFIX
} from '../utils/global';
import {
  calculateCoordinates,
  determineWeatherForDay
} from '../utils/weather-prediction';

const getAsync = promisify(redisInstance.get).bind(redisInstance);

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
 * Returns the weather prediction for a given day from the Redis cache
 * whenever possible.
 * @param day
 */
const getWeatherPredictionFromCache = async (day: number) => {
  Logger.info(REDIS_CHECKING.START_CACHE_CHECK);
  try {
    const weatherPrediction = await getAsync(`${day}${WEATHER_CACHE_POSTFIX}`);
    if (!weatherPrediction) {
      Logger.info(REDIS_CHECKING.DAY_NOT_CACHED);
      return null;
    }
    return JSON.parse(weatherPrediction) as IWeatherPrediction;
  } catch (e) {
    Logger.info(REDIS_CHECKING.ERROR_GETTING_FROM_REDIS);
    Logger.info(e);
    return null;
  }
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
    const cachedPrediction = await getWeatherPredictionFromCache(day);
    if (cachedPrediction) return cachedPrediction;
    const weatherPrediction = await weatherPredictionSchema.findOne({ day });
    if (!weatherPrediction) {
      throw new Error(GET_WEATHER_MESSAGES.GET_ERROR_NOT_FOUND);
    }
    env.eventEmitter.emit(events.weatherQuery.onQuery, day);
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
    const mostRecentProcessedDay = await weatherPredictionSchema
      .find()
      .sort({ day: -1 })
      .limit(1);
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
    const maxPrecipitationDay = await weatherPredictionSchema
      .find({
        day: { $gte: startDay, $lte: endDay },
        precipitationPolygonPerimeter: { $exists: true }
      })
      .sort({ precipitationPolygonPerimeter: -1 })
      .limit(1);
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
    const maxPrecipitationDayInHistory = await weatherPredictionSchema.find({
      maxPrecipitation: true
    });
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
  try {
    await weatherPredictionSchema.findOneAndUpdate(
      { day },
      { $set: { maxPrecipitation: value } }
    );
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
