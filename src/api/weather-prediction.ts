import { Request, Response } from 'express';

/**
 * Controller function that retrieves the Weather Forecast for the galaxy.
 * GET /api/weather/{day}
 * {day} variable is intended to be a number or a string parseable to a base 10 number
 * @param req
 * @param res
 */
const getWeatherForecastByDayNumber: (
  req: Request,
  res: Response
) => Promise<void> = async (req: Request, res: Response) => {
  res.status(200).end();
};

/**
 * Controller function that retrieves the quantity of Drought periods for the first 10
 * years in the Galaxy.
 * GET /api/weather/drought
 * @param req
 * @param res
 */
const getQuantityOfDroughtPeriods: (
  req: Request,
  res: Response
) => Promise<void> = async (req: Request, res: Response) => {
  res.status(200).end();
};

/**
 * Controller function that retrieves the quantity of Rainy periods for the first 10
 * years in the Galaxy.
 * GET /api/weather/rainy
 * @param req
 * @param res
 */
const getQuantityOfRainyPeriods: (
  req: Request,
  res: Response
) => Promise<void> = async (req: Request, res: Response) => {
  res.status(200).end();
};

/**
 * Controller function that retrieves the quantity of periods with optimal weather
 * conditions for the first 10 years in the Galaxy.
 * GET /api/weather/optimal
 * @param req
 * @param res
 */
const getQuantityOfGoodConditionPeriods: (
  req: Request,
  res: Response
) => Promise<void> = async (req: Request, res: Response) => {
  res.status(200).end();
};

export {
  getWeatherForecastByDayNumber,
  getQuantityOfDroughtPeriods,
  getQuantityOfRainyPeriods,
  getQuantityOfGoodConditionPeriods
};
