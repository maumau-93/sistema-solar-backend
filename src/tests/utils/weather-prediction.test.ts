import GalaxyWeather from '../../models/enums/galaxy-weather';
import ICoordinate from '../../models/interfaces/I-coordinate';
import { PlanetName } from '../../utils/global';
import {
  calculateCoordinates,
  determineWeatherForDay
} from '../../utils/weather-prediction';

import {
  planet1,
  planet2,
  planet3,
  xAxisCoordinate1,
  xAxisCoordinate2,
  xAxisCoordinate3,
  sunCoordinate,
  triangleCoordinate2,
  triangleCoordinate1,
  triangleCoordinate3,
  xAlignedCoordinate1,
  xAlignedCoordinate2,
  xAlignedCoordinate3,
  yAlignedCoordinate1,
  yAlignedCoordinate2,
  yAlignedCoordinate3,
  yAlignedCoordinate4,
  yAlignedCoordinate5,
  yAlignedCoordinate6
} from '../data/weather-prediction';

describe('calculateCoordinates', () => {
  it('should calculate the correct coordinates for the first day', () => {
    const coordinates: Map<string, ICoordinate> = calculateCoordinates(
      [planet1, planet2, planet3],
      0
    );
    expect(coordinates.get(PlanetName.Ferengi)?.x).toBe(500);
    expect(coordinates.get(PlanetName.Betasoide)?.y).toBe(0);
    expect(coordinates.get(PlanetName.Vulcano)?.x).toBe(1000);
    expect(coordinates.get(PlanetName.Sun)?.y).toBe(0);
  });
  it('should calculate the correct coordinates for the 10th day', () => {
    const coordinates: Map<string, ICoordinate> = calculateCoordinates(
      [planet1, planet2, planet3],
      10
    );
    expect(coordinates.get(PlanetName.Ferengi)?.x).toBe(492.403876506104);
    expect(coordinates.get(PlanetName.Betasoide)?.y).toBe(-1976.0632481857238);
    expect(coordinates.get(PlanetName.Vulcano)?.x).toBe(642.7876096865393);
    expect(coordinates.get(PlanetName.Sun)?.y).toBe(0);
  });
});

describe('determineWeatherForDay', () => {
  it('should determine correctly that the weather is Unknown when there are not enough coordinates to process', () => {
    const weatherPrediction = determineWeatherForDay([
      xAxisCoordinate1,
      xAxisCoordinate2,
      xAxisCoordinate3
    ]);
    expect(weatherPrediction.predictedWeather).toBe(GalaxyWeather.Unkwnown);
  });
  it('should determine correctly that the weather is Drought', () => {
    const weatherPrediction = determineWeatherForDay([
      xAxisCoordinate1,
      xAxisCoordinate2,
      xAxisCoordinate3,
      sunCoordinate
    ]);
    expect(weatherPrediction.predictedWeather).toBe(GalaxyWeather.Drought);
  });
  it('should determine correctly that the weather is in Optimal conditions', () => {
    const weatherPrediction = determineWeatherForDay([
      xAlignedCoordinate1,
      xAlignedCoordinate2,
      xAlignedCoordinate3,
      sunCoordinate
    ]);
    expect(weatherPrediction.predictedWeather).toBe(
      GalaxyWeather.OptimalContitions
    );
  });
  it('should determine correctly that the weather is in Rainy condition', () => {
    const weatherPrediction = determineWeatherForDay([
      triangleCoordinate1,
      triangleCoordinate2,
      triangleCoordinate3,
      sunCoordinate
    ]);
    expect(weatherPrediction.precipitationPolygonPerimeter).toBe(
      97.08203932499369
    );
    expect(weatherPrediction.predictedWeather).toBe(GalaxyWeather.Rainy);
  });
  it('should determine correctly that weather is Unknown then there is a triangle that does not enclose the sun', () => {
    const weatherPrediction = determineWeatherForDay([
      xAlignedCoordinate1,
      xAlignedCoordinate2,
      triangleCoordinate2,
      sunCoordinate
    ]);
    expect(weatherPrediction.predictedWeather).toBe(GalaxyWeather.Unkwnown);
  });
  it('should determine correctly that weather is in optimal conditions for coordinates vertically aligned', () => {
    const weatherPrediction = determineWeatherForDay([
      yAlignedCoordinate1,
      yAlignedCoordinate2,
      yAlignedCoordinate3,
      sunCoordinate
    ]);
    expect(weatherPrediction.predictedWeather).toBe(
      GalaxyWeather.OptimalContitions
    );
  });
  it('should determine correctly that weather is in Unknown condition when two coordinates are vertically aligned but the third makes a triangle that does not enclose the sun ', () => {
    const weatherPrediction = determineWeatherForDay([
      yAlignedCoordinate1,
      yAlignedCoordinate2,
      triangleCoordinate2,
      sunCoordinate
    ]);
    expect(weatherPrediction.predictedWeather).toBe(GalaxyWeather.Unkwnown);
  });
  it('should determine correctly that weather is in Drought condition when all coordinates are vertically aligned with the sun', () => {
    const weatherPrediction = determineWeatherForDay([
      yAlignedCoordinate4,
      yAlignedCoordinate5,
      yAlignedCoordinate6,
      sunCoordinate
    ]);
    expect(weatherPrediction.predictedWeather).toBe(GalaxyWeather.Drought);
  });
});
