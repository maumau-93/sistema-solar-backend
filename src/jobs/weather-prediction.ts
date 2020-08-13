import env from '../config/env';
import Logger from '../config/loaders/logger';
import { getInitialPlanets } from '../services/planet';
import { PlanetName, WEATHER_JOB_MESSAGES } from '../utils/global';
import {
  getMostRecentProcessedDay,
  createNewWeatherPrediction
} from '../services/weather-prediction';

const weatherPredictionJobHandler = async (
  job: any,
  done: any
): Promise<void> => {
  try {
    Logger.info(WEATHER_JOB_MESSAGES.JOB_TRIGGERED);
    const mostRecentPrediction = await getMostRecentProcessedDay();
    let initDay = mostRecentPrediction ? mostRecentPrediction.day : -1;
    initDay++;
    const planets = await getInitialPlanets([
      PlanetName.Betasoide,
      PlanetName.Ferengi,
      PlanetName.Vulcano
    ]);
    await createNewWeatherPrediction(
      initDay,
      initDay + parseInt(env.daysRange),
      planets
    );
    done();
  } catch (e) {
    Logger.error(WEATHER_JOB_MESSAGES.JOB_ERROR);
    done(e);
  }
};

export default weatherPredictionJobHandler;
