import ILinearEquation from '../../models/interfaces/I-linear-equation';
import { pointA, pointB, pointC, pointD } from '../data/math';
import {
  areAreasEquivalent,
  calculatePolygonPerimeterAndSides,
  determineLineEquation,
  calculateTriangleArea,
  isPointBelongToLine
} from '../../utils/math';

describe('areAreasEquivalent', () => {
  it('should return true when the areas are under the precision threshold', () => {
    const result = areAreasEquivalent(10.195, 10.193);
    expect(result).toBeTruthy();
  });
  it('should return false when the areas are not under the precision threshold', () => {
    const result = areAreasEquivalent(10.195, 10.1);
    expect(result).toBeFalsy();
  });
});

describe('calculatePolygonPerimeterAndSides', () => {
  it('should return a correct polygon perimeter and side lengths', () => {
    const {
      polygonPerimeter,
      polygonSides: { A, B, C }
    } = calculatePolygonPerimeterAndSides(pointA, pointB, pointC);
    expect(polygonPerimeter).toBe(6.82842712474619);
    expect(A).toBe(2.8284271247461903);
    expect(B).toBe(2);
    expect(C).toBe(2);
  });
});

describe('determineLineEquation', () => {
  it('should return correct values for the slope and the intersect', () => {
    const { m, b } = determineLineEquation(pointA, pointB);
    expect(m).toBe(1);
    expect(b).toBe(0);
  });
});

describe('calculateTriangleArea', () => {
  it('should calculate the correct area for the triangle', () => {
    const triangleArea = calculateTriangleArea(pointA, pointB, pointC);
    expect(Math.abs(triangleArea - 2) < 0.05).toBeTruthy();
  });
});

describe('isPointBelongToLine', () => {
  it('should determine correctly if a point belongs to a given line', () => {
    const resp = isPointBelongToLine({ m: 1, b: 0 } as ILinearEquation, pointD);
    expect(resp).toBeTruthy();
  });
});
