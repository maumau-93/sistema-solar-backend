import GalaxyWeather from '../models/enums/galaxy-weather';
import ILinearEquation from '../models/interfaces/I-linear-equation';
import ICoordinate from '../models/interfaces/I-coordinate';

const PRECISION = 0.05;

/**
 * Given two calculated areas, it is returned if those are equivalent
 * inside a precision threshold
 * @param areaA
 * @param areaB
 * @returns {boolean}
 */
const areAreasEquivalent = (areaA: number, areaB: number): boolean => {
  return Math.abs(areaA - areaB) < PRECISION;
};

/**
 * Given two points, the distance between them is returned
 * @param pointA
 * @param pointB
 * @returns {number}
 */
const calculateDistanceBetweenPoints = (
  { x: x1, y: y1 }: ICoordinate,
  { x: x2, y: y2 }: ICoordinate
): number => {
  return Math.sqrt(Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2));
};

/**
 * Given three coordinates, the polygon perimeter and the meausrement of
 * each one of the sides is returned
 * @param pointA
 * @param pointB
 * @param pointC
 * @returns {polygonPerimeter: number; polygonSides: { A: number; B: number; C: number }}
 */
const calculatePolygonPerimeterAndSides = (
  pointA: ICoordinate,
  pointB: ICoordinate,
  pointC: ICoordinate
): {
  polygonPerimeter: number;
  polygonSides: { A: number; B: number; C: number };
} => {
  const A = calculateDistanceBetweenPoints(pointA, pointB);
  const B = calculateDistanceBetweenPoints(pointB, pointC);
  const C = calculateDistanceBetweenPoints(pointC, pointA);
  const perimeter = A + B + C;
  return { polygonPerimeter: perimeter, polygonSides: { A, B, C } };
};

/**
 * Given the three vertices of a Triangle, its area is returned using Heron's Formula
 * @param pointA
 * @param pointB
 * @param pointC
 * @returns {number}
 */
const calculateTriangleArea = (
  pointA: ICoordinate,
  pointB: ICoordinate,
  pointC: ICoordinate
): number => {
  const {
    polygonPerimeter,
    polygonSides: { A, B, C }
  } = calculatePolygonPerimeterAndSides(pointA, pointB, pointC);
  const semiPerimeter = polygonPerimeter / 2;
  return Math.sqrt(
    semiPerimeter *
      (semiPerimeter - A) *
      (semiPerimeter - B) *
      (semiPerimeter - C)
  );
};

/**
 * Given two points, the slope of a linear equation is returned
 * @param pointA
 * @param pointB
 * @returns {number}
 */
const calculateSlope = (pointA: ICoordinate, pointB: ICoordinate): number => {
  const divisor = pointA.x - pointB.x;
  if (Math.abs(divisor - 0) < PRECISION) return -1;
  return (pointA.y - pointB.y) / (pointA.x - pointB.x);
};

/**
 * Given two points, the properties of a linear equation are returned
 * @param pointA
 * @param pointB
 * @returns {ILinearEquation}
 */
const determineLineEquation = (
  pointA: ICoordinate,
  pointB: ICoordinate
): ILinearEquation => {
  const slope = calculateSlope(pointA, pointB);
  return {
    m: slope,
    b: pointA.y - slope * pointA.x
  };
};

/**
 * Given a linear equation and a point, it is determined if that point belongs to the line
 * @param linearEquation
 * @param pointCoordinate
 * @returns {boolean}
 */
const isPointBelongToLine = (
  { m, b }: ILinearEquation,
  { x, y }: ICoordinate
): boolean => {
  const calculatedY = m * x + b;
  return Math.abs(calculatedY - y) < PRECISION;
};

/**
 * Determines if coordinates are vertically aligned
 * This function will execute when two of the coordinates are vertically aligned so
 * there is undefined slope for the linear equation
 * This will return the corresponding weather in [Drought, OptimalConditions]
 * Will return Unknown when the coordinates are not vertically aligned
 * @param mainCoordinate
 * @param cartesianCoordinates
 * @returns {string}
 */
const checkIfVerticallyAligned = (
  mainCoordinate: ICoordinate,
  cartesianCoordinates: ICoordinate[]
): string => {
  for (let i = 2; i < cartesianCoordinates.length - 1; i++) {
    if (Math.abs(mainCoordinate.x - cartesianCoordinates[i].x) > PRECISION)
      return GalaxyWeather.Unkwnown;
  }
  if (Math.abs(mainCoordinate.x - 0) < PRECISION) return GalaxyWeather.Drought;
  return GalaxyWeather.OptimalContitions;
};

/**
 * Determines if coordinates are vertically aligned
 * This function will execute when there's a valid linear equation with defined slope
 * This will return the corresponding weather in [Drought, OptimalConditions]
 * Will return Unknown when the coordinates are not aligned
 * @param linearEquation
 * @param cartesianCoordinates
 * @returns {string}
 */
const checkIfAligned = (
  linearEquation: ILinearEquation,
  cartesianCoordinates: ICoordinate[]
): string => {
  for (let i = 2; i < cartesianCoordinates.length - 1; i++) {
    if (!isPointBelongToLine(linearEquation, cartesianCoordinates[i]))
      return GalaxyWeather.Unkwnown;
  }
  if (
    isPointBelongToLine(
      linearEquation,
      cartesianCoordinates[cartesianCoordinates.length - 1]
    )
  ) {
    return GalaxyWeather.Drought;
  }
  return GalaxyWeather.OptimalContitions;
};

export {
  areAreasEquivalent,
  calculatePolygonPerimeterAndSides,
  calculateTriangleArea,
  checkIfVerticallyAligned,
  checkIfAligned,
  determineLineEquation,
  isPointBelongToLine
};
