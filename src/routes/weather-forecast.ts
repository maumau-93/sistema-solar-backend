import { Router } from 'express';

const route = Router();

const weatherRoutes: () => void = () => {
  route.get('/weather/:day');
};

export default weatherRoutes;
