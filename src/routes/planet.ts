import { Router } from 'express';
import createPlanet from '../api/planet';
import planetSchemaValidator from '../validators/planet';

const route = Router();

const planetRoutes: (app: Router) => void = (app: Router) => {
  app.use('/planet', route);
  route.post('', planetSchemaValidator, createPlanet);
};

export default planetRoutes;
