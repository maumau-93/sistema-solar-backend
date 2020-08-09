import env from '../config/env';

const HTTP_CODES = {
  INTERNAL_SERVER_ERROR: 500,
  NOT_FOUND: 404,
  OK: 200,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400
};

const PLANET_CREATION_MESSAGES = {
  STARTING_CREATION: 'Creating a new planet in the DB',
  CREATION_FINISHED: 'Planet Created successfully',
  ERROR_CREATING: 'Error while creating a new planet'
};

const WEATHER_FORECAST_VALIDATION = {
  INVALID_DAY_PARAMETER: `Not allowed format for the DAY parameter`
};

const PLANET_VALIDATION = {
  INVALID_PLANET_OBJECT: `Invalid PLANET object provided`
};

const STARTUP_MESSAGES = {
  DB_LOADED: 'DB Loaded and connected!',
  EXPRESS_LOADED: 'Express application loaded',
  SERVER_STARTED: `Application server started in port ${env.port}`,
  SERVER_FAILED_TO_START: `Application server failed to start in port ${env.port}`
};

export {
  HTTP_CODES,
  WEATHER_FORECAST_VALIDATION,
  PLANET_VALIDATION,
  PLANET_CREATION_MESSAGES,
  STARTUP_MESSAGES
};
