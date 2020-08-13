interface IWeatherPrediction {
  day: number;
  weather: string;
  maxPrecipiation?: boolean;
  precipitationPolygonPerimeter?: number;
  startingPeriod?: boolean;
}

export default IWeatherPrediction;
