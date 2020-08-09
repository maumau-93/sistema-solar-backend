import express from 'express';
import mainApplication from './config/loaders';
import Logger from './config/loaders/logger';
import { STARTUP_MESSAGES } from './utils/global';
import env from './config/env';

const startServer = async () => {
  const app = express();

  await mainApplication({ expressApp: app });
  try {
    await app.listen(env.port);
    Logger.info(STARTUP_MESSAGES.SERVER_STARTED);
  } catch (e) {
    Logger.info(STARTUP_MESSAGES.SERVER_FAILED_TO_START);
    return;
  }
};

startServer();
