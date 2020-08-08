import Agenda from 'agenda';
import env from '../env';
import { Db } from 'mongodb';

export default ({ mongoConnection }: { mongoConnection: Db }): Agenda => {
  return new Agenda({
    mongo: mongoConnection,
    db: { collection: env.agenda.dbCollection },
    processEvery: env.agenda.pooltime,
    maxConcurrency: env.agenda.concurrency
  });
};
