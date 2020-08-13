import env from '../config/env';
import events from './events';
import Logger from '../config/loaders/logger';
import { MAX_PREC_DAY_EVENT } from '../utils/global';
import {
  getMaximumPrecipitationPredictionInHistory,
  getMaximumPrecipitationPredictionInRangeOfDays,
  setMaxPrecipitationFlag
} from '../services/weather-prediction';

/**
 * After the job of inserting weather predictions is executed and finished, an event is
 * emitted an received in this function to keep the day of maximum precipitation up
 * to date
 * @param startDay
 * @param endDay
 */
const updateMaxPrecipitationDay = async (
  startDay: number,
  endDay: number
): Promise<void> => {
  Logger.info(MAX_PREC_DAY_EVENT.START);
  const maxRange = await getMaximumPrecipitationPredictionInRangeOfDays(
    startDay,
    endDay
  );
  if (!maxRange) return;
  const maxHist = await getMaximumPrecipitationPredictionInHistory();
  if (!maxHist) {
    setMaxPrecipitationFlag(maxRange.day, true);
    return;
  }
  const condition =
    maxHist.precipitationPolygonPerimeter &&
    maxRange.precipitationPolygonPerimeter &&
    maxHist.precipitationPolygonPerimeter <
      maxRange.precipitationPolygonPerimeter;

  if (condition) {
    setMaxPrecipitationFlag(maxHist.day, false);
    setMaxPrecipitationFlag(maxRange.day, true);
  }
};

export default env.eventEmitter.on(
  events.weatherPrediction.onCreation,
  updateMaxPrecipitationDay
);
