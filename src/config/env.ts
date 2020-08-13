import { EventEmitter } from 'events';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

/**
 * This line loads the custom env dependency.
 * The dependency takes the NODE_ENV variable and according to its value it will load the corresponding ".env.{NODE_ENV}" file
 * with its associated environmental variables so those can be exported in the next export default block.
 * */
/* eslint-disable import/no-commonjs */
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('custom-env').env(true);

export default {
  /**
   * Agenda.js stuff
   */
  agenda: {
    dbCollection: process.env.AGENDA_DB_COLLECTION,
    pooltime: process.env.AGENDA_POOL_TIME,
    concurrency: parseInt(process.env.AGENDA_CONCURRENCY || '1', 10)
  },

  // Days to check in weatherPredictionJobHandler
  daysRange: process.env.DAYS_TO_CHECK || '20',

  // Only one event emitter instance needed for this application
  eventEmitter: new EventEmitter(),

  // Connection string for database
  databaseUrl: process.env.DB_CONN || '',
  // Winston logger config
  logs: {
    level: process.env.LOG_LEVEL || 'silly'
  },
  // Server port
  port: process.env.PORT
};
