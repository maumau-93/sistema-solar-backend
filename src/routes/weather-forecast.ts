import { Router } from 'express';
import daySchemaValidator from '../validators/weather-forecast';
import {
  getQuantityOfDroughtPeriods,
  getWeatherForecastByDayNumber,
  getQuantityOfRainyPeriods,
  getQuantityOfGoodConditionPeriods
} from '../api/weather-forecast';

const route = Router();

const weatherRoutes: (app: Router) => void = (app: Router) => {
  app.use('/weather', route);
  route.get('/:day', daySchemaValidator, getWeatherForecastByDayNumber);
  route.get('/drought', getQuantityOfDroughtPeriods);
  route.get('/rainy', getQuantityOfRainyPeriods);
  route.get('/optimal', getQuantityOfGoodConditionPeriods);
};

export default weatherRoutes;
