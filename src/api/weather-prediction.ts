import { Request, Response } from 'express';
import GalaxyWeather from '../models/enums/galaxy-weather';
import IWeatherPrediction from '../models/interfaces/I-weather-prediction';
import { HTTP_CODES } from '../utils/global';

import {
  getWeatherPrediction,
  getMaximumPrecipitationPredictionInHistory,
  getPeriodCountForWeather
} from '../services/weather-prediction';

/**
 * Controller function that retreives the Weather Forecast for the galaxy.
 * GET /api/weather/{day}
 * {day} variable is intended to be a number or a string parseable to a base 10 number
 * @param req
 * @param res
 */
const getWeatherForecastByDayNumber: (
  req: Request,
  res: Response
) => Promise<void> = async (req: Request, res: Response) => {
  try {
    const weatherPrediction: IWeatherPrediction = await getWeatherPrediction(
      parseInt(req.params.day)
    );
    res
      .status(HTTP_CODES.OK)
      .json({ day: weatherPrediction.day, weather: weatherPrediction.weather });
  } catch (e) {
    console.log(e.message);
    res.status(HTTP_CODES.NOT_FOUND).json(e.message);
  }
};

/**
 * Controller function that retreives the quantity of Drought periods for the first 10
 * years in the Galaxy.
 * GET /api/weather?condition
 * @param req
 * @param res
 */
const getQuantityOfClimaticPeriods: (
  req: Request,
  res: Response
) => Promise<void> = async (req: Request, res: Response) => {
  try {
    const weatherCondition = req.query.condition?.toString();
    let response;
    if (weatherCondition) {
      response = {
        [weatherCondition]: await getPeriodCountForWeather(weatherCondition)
      };
    } else {
      const promiseList = [];
      promiseList.push(getPeriodCountForWeather(GalaxyWeather.Drought));
      promiseList.push(
        getPeriodCountForWeather(GalaxyWeather.OptimalContitions)
      );
      promiseList.push(getPeriodCountForWeather(GalaxyWeather.Rainy));
      const promiseResponse = await Promise.all(promiseList);
      response = {
        drought: promiseResponse[0],
        optimal: promiseResponse[1],
        rainy: promiseResponse[2]
      };
    }
    res.status(HTTP_CODES.OK).json(response);
  } catch (e) {
    res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json(e.message);
  }
};

/**
 * Controller function that retreives the day of maximum precipitation
 * GET /api/weather/max-precipitation
 * @param req
 * @param res
 */
const getDayOfMaxPrecipitation: (
  req: Request,
  res: Response
) => Promise<void> = async (req: Request, res: Response) => {
  try {
    const weatherPrediction: IWeatherPrediction = await getMaximumPrecipitationPredictionInHistory();
    res.status(HTTP_CODES.OK).json({
      day: weatherPrediction.day,
      trianglePerimeter: weatherPrediction.precipitationPolygonPerimeter
    });
  } catch (e) {
    res.status(HTTP_CODES.INTERNAL_SERVER_ERROR).json(e.message);
  }
};

export {
  getWeatherForecastByDayNumber,
  getQuantityOfClimaticPeriods,
  getDayOfMaxPrecipitation
};
