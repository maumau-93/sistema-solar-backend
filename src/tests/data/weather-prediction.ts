import GalaxyWeather from '../../models/enums/galaxy-weather';
import ICoordinate from '../../models/interfaces/I-coordinate';
import IPlanet from '../../models/interfaces/I-planet';
import IWeatherPrediction from '../../models/interfaces/I-weather-prediction';

const planet1: IPlanet = {
  name: 'Ferengi',
  distanceToSun: 500,
  angularSpeed: 1,
  planetDirection: 1
};

const planet2: IPlanet = {
  name: 'Betasoide',
  distanceToSun: 2000,
  angularSpeed: 3,
  planetDirection: 1
};

const planet3: IPlanet = {
  name: 'Vulcano',
  distanceToSun: 1000,
  angularSpeed: 5,
  planetDirection: -1
};

const sunCoordinate: ICoordinate = {
  x: 0,
  y: 0
};

const xAxisCoordinate1: ICoordinate = {
  x: 1,
  y: 0
};

const xAxisCoordinate2: ICoordinate = {
  x: 2,
  y: 0
};

const xAxisCoordinate3: ICoordinate = {
  x: 3,
  y: 0
};

const xAlignedCoordinate1: ICoordinate = {
  x: 3,
  y: 1
};

const xAlignedCoordinate2: ICoordinate = {
  x: 1,
  y: 1
};

const xAlignedCoordinate3: ICoordinate = {
  x: 2,
  y: 1
};

const triangleCoordinate1: ICoordinate = {
  x: -15,
  y: 0
};

const triangleCoordinate2: ICoordinate = {
  x: 15,
  y: 15
};

const triangleCoordinate3: ICoordinate = {
  x: 15,
  y: -15
};

const yAlignedCoordinate1: ICoordinate = {
  x: 2,
  y: 1
};

const yAlignedCoordinate2: ICoordinate = {
  x: 2,
  y: 2
};

const yAlignedCoordinate3: ICoordinate = {
  x: 2,
  y: 3
};

const yAlignedCoordinate4: ICoordinate = {
  x: 0,
  y: 1
};

const yAlignedCoordinate5: ICoordinate = {
  x: 0,
  y: 2
};

const yAlignedCoordinate6: ICoordinate = {
  x: 0,
  y: 3
};

const weatherPrediction1: IWeatherPrediction = {
  day: 100,
  weather: GalaxyWeather.Rainy
};

export {
  planet1,
  planet2,
  planet3,
  sunCoordinate,
  triangleCoordinate1,
  triangleCoordinate2,
  triangleCoordinate3,
  weatherPrediction1,
  xAxisCoordinate1,
  xAxisCoordinate2,
  xAxisCoordinate3,
  xAlignedCoordinate1,
  xAlignedCoordinate2,
  xAlignedCoordinate3,
  yAlignedCoordinate1,
  yAlignedCoordinate2,
  yAlignedCoordinate3,
  yAlignedCoordinate4,
  yAlignedCoordinate5,
  yAlignedCoordinate6
};
