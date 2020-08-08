import express from 'express';
import mainApplication from './config/loaders';
import env from './config/env';
import Logger from './config/loaders/logger';

const startServer = async () => {
  const app = express();

  await mainApplication({ expressApp: app });
  try {
    await app.listen(env.port);
    Logger.info(`Application server started in port ${env.port}`);
  } catch (e) {
    Logger.info(`Application server failed to start in port ${env.port}`);
    return;
  }
};

startServer();
