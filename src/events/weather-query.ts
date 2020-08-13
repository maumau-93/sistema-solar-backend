import env from '../config/env';
import events from './events';
import Logger from '../config/loaders/logger';
import redisInstance from '../config/loaders/redis';
import { getWeatherPrediction } from '../services/weather-prediction';
import {
  DAY_IN_SECONDS,
  HIGH_DEMAND_DAY_QUERY,
  REDIS_CHECKING,
  WEATHER_CACHE_POSTFIX
} from '../utils/global';

/**
 * Retrieves the popular day weather prediction and stores it
 * by an entire day in the cache. After that, the record is
 * deleted
 * @param day
 */
const cacheWeatherPrediction = async (day: number): Promise<void> => {
  Logger.info(REDIS_CHECKING.BECOME_POPULAR);
  const weatherPrediction = await getWeatherPrediction(day);
  redisInstance.setex(
    `${day}${WEATHER_CACHE_POSTFIX}`,
    DAY_IN_SECONDS,
    JSON.stringify(weatherPrediction)
  );
};

/**
 * Checks if there is already insight about the day that is being currently queried
 * If it reaches the high demand threshold, calls another function to cache the query.
 * @param day
 */
const checkWeatherPrediction = (day: number): void => {
  redisInstance.get(day.toString(), (err, data) => {
    if (err) {
      Logger.info(REDIS_CHECKING.ERROR_GETTING_FROM_REDIS);
      Logger.error(err);
      return;
    }
    if (!data) {
      Logger.info(REDIS_CHECKING.NO_EXISTENT_RECORD);
      redisInstance.setex(day.toString(), DAY_IN_SECONDS, '1');
      return;
    }
    redisInstance.incr(day.toString(), (err, data) => {
      if (err) {
        Logger.info(REDIS_CHECKING.ERROR_UPDATING);
        Logger.error(err);
        return;
      }
      if (data === HIGH_DEMAND_DAY_QUERY) {
        cacheWeatherPrediction(day);
      }
    });
  });
};

export default env.eventEmitter.on(
  events.weatherQuery.onQuery,
  checkWeatherPrediction
);
