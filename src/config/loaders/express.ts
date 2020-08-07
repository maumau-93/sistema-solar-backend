import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import AWSRoutes from '../../routes/amazon-web-services';
import weatherRoutes from '../../routes/weather-forecast';

export default ({ app }: { app: express.Application }): void => {
  // Middleware that transforms the raw string of req.body into json
  app.use(bodyParser.json());

  // Configure Secure HTTP Headers with helmet
  app.use(helmet());
  app.use(
    helmet.contentSecurityPolicy({
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'"]
      }
    })
  );
  app.use(helmet.hidePoweredBy());

  // Configure HTTP headers
  app.use(
    (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header(
        'Access-Control-Allow-Headers',
        'Authorization, X-API-KEY, Origin, X-Requested-With,' +
          'Content-Type, Accept, Access-Control-Allow-Request-Method'
      );
      res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, DELETE'
      );
      res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');

      next();
    }
  );

  // Base routes
  app.use('/api', AWSRoutes);
  app.use('/api', weatherRoutes);
};
