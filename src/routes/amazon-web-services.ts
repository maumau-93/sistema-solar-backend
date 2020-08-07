import { Router, Request, Response } from 'express';

const route = Router();

const AWSRoutes: () => void = () => {
  route.get('/status', (req: Request, res: Response) => {
    res.status(200).end();
  });
  route.head('/status', (req: Request, res: Response) => {
    res.status(200).end();
  });
};

export default AWSRoutes;
