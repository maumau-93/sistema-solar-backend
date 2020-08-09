import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import routes from '../../routes/routes-wrapper';

export default ({ app }: { app: express.Application }): void => {
  // Middleware that transforms the raw string of req.body into json
  app.use(bodyParser.json());

  // Loads the entire API routes
  app.use('/api', routes());

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
  app.use((req: express.Request, res: express.Response) => {
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
  });
};
