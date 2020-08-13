import { Router } from 'express';

import {
  daySchemaValidator,
  weatherConditionValidator
} from '../validators/weather-prediction';
import {
  getQuantityOfClimaticPeriods,
  getWeatherForecastByDayNumber,
  getDayOfMaxPrecipitation
} from '../api/weather-prediction';

const route = Router();

const weatherRoutes: (app: Router) => void = (app: Router) => {
  app.use('/weather', route);
  route.get('/:day', daySchemaValidator, getWeatherForecastByDayNumber);
  route.get(
    '/:condition?',
    weatherConditionValidator,
    getQuantityOfClimaticPeriods
  );
  route.get('/precipitation/max', getDayOfMaxPrecipitation);
};

export default weatherRoutes;
