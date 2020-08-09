import { Request, Response } from 'express';

const createPlanet: (req: Request, res: Response) => Promise<void> = async (
  req: Request,
  res: Response
) => {
  res.send('llego al POST');
};

export default createPlanet;
