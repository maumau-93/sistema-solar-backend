import Redis, { ClientOpts } from 'redis';
import env from '../env';
import Logger from './logger';

const redisInstance = Redis.createClient(env.redisUrl as ClientOpts);

redisInstance.on('error', (err) => {
  Logger.error(err);
});

export default redisInstance;
