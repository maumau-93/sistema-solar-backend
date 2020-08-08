import express from 'express';
import mainApplication from './config/loaders';
import env from './config/env';

const startServer = async () => {
  const app = express();

  await mainApplication({ expressApp: app });
  try {
    await app.listen(env.port);
    console.log(`APP STARTEDD!! in ${env.port}`);
  } catch (e) {
    console.log(e);
    return;
  }
};

startServer();
