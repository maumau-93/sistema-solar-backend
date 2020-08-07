import express from 'express';
import mainApplication from './config/loaders';
async function startServer() {
  const app = express();

  await mainApplication({ expressApp: app });
  app.listen(4747, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log('APP STARTEDD!!');
  });
}

startServer();
