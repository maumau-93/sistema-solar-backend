import expressLoader from './express';
import { Application } from 'express';
import mongooseLoader from './mongoose';
import Logger from './logger';
import { STARTUP_MESSAGES } from '../../utils/global';

export default async ({
  expressApp
}: {
  expressApp: Application;
}): Promise<void> => {
  // Connect to DB
  await mongooseLoader();
  Logger.info(STARTUP_MESSAGES.DB_LOADED);

  // Load express application
  await expressLoader({ app: expressApp });
  Logger.info(STARTUP_MESSAGES.EXPRESS_LOADED);
};
