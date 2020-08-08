import { Router } from 'express';

const route = Router();

const weatherRoutes: (app: Router) => void = (app: Router) => {
  app.use('', route);
  route.get('/weather/:day');
};

export default weatherRoutes;
