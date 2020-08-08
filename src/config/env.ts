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
  port: process.env.PORT,
  databaseUrl: process.env.DB_CONN
};
