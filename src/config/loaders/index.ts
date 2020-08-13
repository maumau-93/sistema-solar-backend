import agendaLoader from './agenda';
import expressLoader from './express';
import Logger from './logger';
import jobsLoader from './jobs';
import mongooseLoader from './mongoose';
import { Application } from 'express';
import { STARTUP_MESSAGES } from '../../utils/global';

import './events';

export default async ({
  expressApp
}: {
  expressApp: Application;
}): Promise<void> => {
  // Connect to DB
  const mongoConnection = await mongooseLoader();
  Logger.info(STARTUP_MESSAGES.DB_LOADED);

  //Loading task scheduler
  const agendajs = await agendaLoader({ mongoConnection });

  //Loading scheduled tasks
  await jobsLoader({ agendajs });

  await expressLoader({ app: expressApp });
  Logger.info(STARTUP_MESSAGES.EXPRESS_LOADED);
};
