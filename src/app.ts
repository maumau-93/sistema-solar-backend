import express from 'express';
import mainApplication from './config/loaders';
const startServer = async () => {
  const app = express();

  await mainApplication({ expressApp: app });
  try {
    await app.listen(4747);
    console.log('APP STARTEDD!!');
  } catch (e) {
    console.log(e);
    return;
  }
};

startServer();
