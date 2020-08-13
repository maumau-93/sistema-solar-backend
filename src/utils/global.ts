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

const GET_PLANETS_MESSAGES = {
  GET_STARTED: 'Obtaining the initial set of planets from the DB',
  GET_FINISHED: 'Initial set of planets retreived successfully',
  GET_ERROR_FAILURE: 'Unexpected error while retreiving initial set of planets'
};

const WEATHER_CREATION_MESSAGES = {
  STARTING_CREATION: 'Creating a new Weather prediction in the DB',
  CREATION_FINISHED: 'Weather prediction Created successfully',
  ERROR_CREATING: 'Error while creating a new Weather prediction'
};

const GET_WEATHER_MESSAGES = {
  GET_STARTED: 'Obtaining a Weather prediction from the DB',
  GET_FINISHED: 'Weather prediction retreived successfully',
  GET_ERROR_NOT_FOUND: 'Weather prediction not found',
  GET_ERROR_FAILURE: 'Unexpected error while retreiving Weather prediction'
};

const GET_PERIOD_WEATHER_COUNT = {
  START: 'Obtaining period count for the specified weather'
};

const GET_DAY_MESSAGES = {
  GET_STARTED: 'Obtaining the last processed day',
  GET_FINISHED: 'Last processed day obtained',
  GET_ERROR_FAILURE: 'Unexpected error whole retreiving Last processed day'
};

const WEATHER_FORECAST_VALIDATION = {
  INVALID_DAY_PARAMETER: 'Not allowed format for the DAY parameter',
  INVALID_WEATHER_PARAMETER: 'Not allowed format for the CONDITION parameter'
};

const WEATHER_PERIODS_VALIDATION = {
  INVALID_CONDITION_PARAMTER: 'Not allowed format for the CONDITION parameter'
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

const WEATHER_JOB_MESSAGES = {
  JOB_TRIGGERED: 'Weather Prediction Creation job triggered',
  JOB_ERROR: 'Error with Weather Prediction Creation job'
};

const GET_MAX_PREC_RANGE = {
  START: 'Getting the Max precipitation day in range',
  FINISH: 'Max precipitation day found',
  ERROR: 'Error while determining Max precipitation day'
};

const GET_MAX_PREC_HIST = {
  START: 'Getting the Max precipitation day in history',
  FINISH: 'Max precipitation day in history found',
  ERROR: 'Error while determining Max precipitation day in history'
};

const UPDATE_MAX_PREC = {
  START: 'Updating the max precipitation flag',
  FINISH: 'Finished updating the max precipitation flag',
  ERROR: 'Error uptading the max precipitation flag'
};

/*
 * THIS IS ONLY MEANT TO BE DONE AS PART OF THIS EXERCISE
 * NORMALLY THIS IS NEVER DONE AS IN A REAL PROBLEM THERE
 * SHOULD BE MORE FLEXIBILITY
 */
enum PlanetName {
  Vulcano = 'Vulcano',
  Ferengi = 'Ferengi',
  Betasoide = 'Betasoide',
  Sun = 'Sun'
}

const MIN_NUMBER_PLANETS = 4;

const MAX_PREC_DAY_EVENT = {
  START: 'Determining the max precipitation day',
  FINISH: 'Max precipitation day determined',
  ERROR: 'Error while determining the max precipitation day'
};

export {
  GET_WEATHER_MESSAGES,
  GET_DAY_MESSAGES,
  GET_PLANETS_MESSAGES,
  GET_MAX_PREC_RANGE,
  GET_MAX_PREC_HIST,
  GET_PERIOD_WEATHER_COUNT,
  HTTP_CODES,
  MAX_PREC_DAY_EVENT,
  MIN_NUMBER_PLANETS,
  PLANET_CREATION_MESSAGES,
  PLANET_VALIDATION,
  STARTUP_MESSAGES,
  UPDATE_MAX_PREC,
  WEATHER_CREATION_MESSAGES,
  WEATHER_FORECAST_VALIDATION,
  WEATHER_JOB_MESSAGES,
  WEATHER_PERIODS_VALIDATION,
  PlanetName
};
