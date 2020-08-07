import { Router, Request, Response } from 'express';

const route = Router();

/**
 * Routes created to make the AWS healthcheck done by the
 * Elastic Load Balancer
 */
const AWSRoutes: (app: Router) => void = (app: Router) => {
  app.use('', route);

  route.get('/status', (req: Request, res: Response) => {
    res.status(200).end();
  });
  route.head('/status', (req: Request, res: Response) => {
    res.status(200).end();
  });
};

export default AWSRoutes;
