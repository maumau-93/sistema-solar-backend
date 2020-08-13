import GalaxyWeather from '../models/enums/galaxy-weather';
import ICoordinate from '../models/interfaces/I-coordinate';
import ILinearEquation from '../models/interfaces/I-linear-equation';
import { MIN_NUMBER_PLANETS, PlanetName } from './global';

import {
  areAreasEquivalent,
  calculatePolygonPerimeterAndSides,
  calculateTriangleArea,
  checkIfVerticallyAligned,
  checkIfAligned,
  determineLineEquation
} from './math';
import IPlanet from '../models/interfaces/I-planet';

/**
 * Given a list of coordinates, returns the weather condition in [Rainy, Unknown]
 * In addition, if the weather is Rainy, also returns the permiter of the triangle
 * conformed by the planets.
 * Right now only works for triangles. Possible refactor in the future for any nth-sided polygon
 * @param cartesianCoordinates
 * @returns {{ predictedWeather: string; precipitationPolygonPerimeter?: number }}
 */
const isRainy = (
  cartesianCoordinates: ICoordinate[]
): { predictedWeather: string; precipitationPolygonPerimeter?: number } => {
  // Calculation of the area of the triangle conformed by the position of the three planets
  // PointD is equivalent to the sun position
  const [pointA, pointB, pointC, pointD] = cartesianCoordinates;
  const bigTriangleArea = calculateTriangleArea(pointA, pointB, pointC);
  // Calculation of the areas of the triangles conformed by two of the planets and the sun
  const ABDArea = calculateTriangleArea(pointA, pointB, pointD);
  const BCDArea = calculateTriangleArea(pointB, pointC, pointD);
  const ACDArea = calculateTriangleArea(pointA, pointC, pointD);
  if (areAreasEquivalent(bigTriangleArea, ABDArea + BCDArea + ACDArea))
    return {
      predictedWeather: GalaxyWeather.Rainy,
      precipitationPolygonPerimeter: calculatePolygonPerimeterAndSides(
        pointA,
        pointB,
        pointC
      ).polygonPerimeter
    };
  return { predictedWeather: GalaxyWeather.Unkwnown };
};

/**
 * Given a List of coordinates, determines if the weather is under one of the following conditions:
 * - Optimal pressure and temperature
 * - Drought
 * @param cartesianCoordinates
 * @returns {string}
 */
const isOptimalOrDrought = (cartesianCoordinates: ICoordinate[]): string => {
  const linearEquation: ILinearEquation = determineLineEquation(
    cartesianCoordinates[0],
    cartesianCoordinates[1]
  );
  if (linearEquation.m === -1) {
    return checkIfVerticallyAligned(
      cartesianCoordinates[0],
      cartesianCoordinates
    );
  }
  return checkIfAligned(linearEquation, cartesianCoordinates);
};

/**
 * Returns the weather prediction given the coordinates of the planets that are provided
 * @param cartesianCoordinates
 * @returns {{ predictedWeather: string; precipitationPolygonPerimeter?: number }}
 */
const determineWeatherForDay = (
  cartesianCoordinates: ICoordinate[]
): { predictedWeather: string; precipitationPolygonPerimeter?: number } => {
  if (cartesianCoordinates.length < MIN_NUMBER_PLANETS)
    return { predictedWeather: GalaxyWeather.Unkwnown };
  const predictedWeather = isOptimalOrDrought(cartesianCoordinates);
  if (predictedWeather !== GalaxyWeather.Unkwnown) {
    return { predictedWeather };
  }
  const weatherAndPrecipitations = isRainy(cartesianCoordinates);
  if (weatherAndPrecipitations.predictedWeather === GalaxyWeather.Rainy) {
    return {
      predictedWeather: weatherAndPrecipitations.predictedWeather,
      precipitationPolygonPerimeter:
        weatherAndPrecipitations.precipitationPolygonPerimeter
    };
  }
  return { predictedWeather: GalaxyWeather.Unkwnown };
};

/**
 * Returns a Map that contains the position of the given planets on a specified day
 * @param planets
 * @param currentDay
 * @returns {Map<string, ICoordinate>}
 */
const calculateCoordinates = (
  planets: IPlanet[],
  currentDay: number
): Map<string, ICoordinate> => {
  const sunCoordinates: ICoordinate = {
    x: 0,
    y: 0
  };
  const coordinatesMap: Map<string, ICoordinate> = new Map();
  for (const planet of planets) {
    const totalTranslationInDegrees =
      currentDay * planet.angularSpeed * planet.planetDirection;
    const coordinates: ICoordinate = {
      x:
        planet.distanceToSun *
        Math.cos((Math.PI / 180) * totalTranslationInDegrees),
      y: planet.distanceToSun * Math.sin(totalTranslationInDegrees)
    };
    coordinatesMap.set(planet.name, coordinates);
  }
  coordinatesMap.set(PlanetName.Sun, sunCoordinates);
  return coordinatesMap;
};

export { calculateCoordinates, determineWeatherForDay };
