import expressLoader from './express';
import { Application } from 'express';
import mongooseLoader from './mongoose';
import Logger from './logger';

export default async ({
  expressApp
}: {
  expressApp: Application;
}): Promise<void> => {
  // Connect to DB
  await mongooseLoader();
  Logger.info('DB Loaded and connected!');

  // Load express application
  await expressLoader({ app: expressApp });
  Logger.info('Express application loaded');
};
