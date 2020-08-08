import mongoose from 'mongoose';
import { Db } from 'mongodb';
import env from '../env';

export default async (): Promise<Db> => {
  const connection = await mongoose.connect(env.databaseUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  });
  return connection.connection.db;
};
