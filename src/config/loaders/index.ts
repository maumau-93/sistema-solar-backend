import expressLoader from './express';
import { Application } from 'express';

export default async ({
  expressApp
}: {
  expressApp: Application;
}): Promise<void> => {
  await expressLoader({ app: expressApp });
  console.group('express loaded');
};