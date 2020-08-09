import IWeatherPrediction from './interfaces/I-weather-prediction';
import mongoose from 'mongoose';

/**
 * This interface is created to satisfy the inheritance of all the properties
 * of mongoose.Document class
 */
interface GalaxyWeatherModel extends IWeatherPrediction, mongoose.Document {}

const WeatherPrediction = new mongoose.Schema({
  day: {
    type: Number,
    required: true,
    index: true
  },
  weather: {
    type: String,
    required: true
  }
});

export default mongoose.model<GalaxyWeatherModel>(
  'WeatherPrediction',
  WeatherPrediction
);
