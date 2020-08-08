import { Request, Response, NextFunction } from 'express';

/**
 * Controller function that retrieves the Weather Forecast for the galaxy.
 * GET /api/weather/day
 * @param req
 * @param res
 */
const getWeatherForecastByDayNumber: (
  req: Request,
  res: Response
) => Promise<void> = async (req: Request, res: Response) => {
  res.status(200).end();
};

export default getWeatherForecastByDayNumber;
