import IPlanet from './interfaces/I-planet';
import mongoose from 'mongoose';

/**
 * This interface is created to satisfy the inheritance of all the properties
 * of mongoose.Document class
 */
interface PlanetModel extends IPlanet, mongoose.Document {}

const Planet = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  distanceToSun: {
    type: Number,
    required: true
  },
  angularSpeed: {
    type: Number,
    required: true
  },
  planetDirection: {
    type: Number,
    required: true
  }
});

export default mongoose.model<PlanetModel>('Planet', Planet);
