import { Router } from 'express';
import weatherForecast from './weather-forecast';
import AWS from './amazon-web-services';

/**
 * Routes wrapper.
 * In this file we'll summarize all the current and future existing routes for this API.
 * Registering them in this file will be enough to be available to be hit from outside.
 **/

export default (): Router => {
  const app = Router();
  weatherForecast(app);
  AWS(app);

  return app;
};
