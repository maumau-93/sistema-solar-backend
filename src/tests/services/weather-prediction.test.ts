import GalaxyWeather from '../../models/enums/galaxy-weather';
import { planetWithValidData2 } from '../data/planet';
import { weatherPrediction1 } from '../data/weather-prediction';
import {
  createNewWeatherPrediction,
  getPeriodCountForWeather,
  getWeatherPrediction,
  getMostRecentProcessedDay,
  getMaximumPrecipitationPredictionInRangeOfDays,
  getMaximumPrecipitationPredictionInHistory,
  setMaxPrecipitationFlag
} from '../../services/weather-prediction';

jest.mock('../../models/weather-prediction');

describe('getPeriodCountForWeather', () => {
  it('should retreive correctly the count of periods for a given weather condition', async () => {
    const result = await getPeriodCountForWeather('rainy');
    expect(result).toBe(10);
  });
  it('should fail to retreive the count of periods for a given weather condition', async () => {
    try {
      await getPeriodCountForWeather('non-existent-weather');
    } catch (e) {
      expect(e).toMatchSnapshot();
    }
  });
});

describe('getWeatherPrediction', () => {
  it('should get the weather prediction correctly for the given day', async () => {
    const result = await getWeatherPrediction(100);
    const weather = result.weather;
    expect(weather).toBe(GalaxyWeather.Rainy);
  });
  it('should fail to get the weather prediction as it is not found', async () => {
    try {
      await getWeatherPrediction(50);
    } catch (e) {
      expect(e).toMatchSnapshot();
    }
  });
});

describe('getMostRecentProcessedDay', () => {
  it('should retreive the most recently processed weather prediction', async () => {
    const result = await getMostRecentProcessedDay();
    expect(result).toBe(weatherPrediction1);
  });
});

describe('getMaximumPrecipitationPredictionInRangeOfDays', () => {
  it('should retreive the max precipitation prediction in a range of days', async () => {
    const result = await getMaximumPrecipitationPredictionInRangeOfDays(1, 10);
    expect(result).toBe(weatherPrediction1);
  });
  it('should fail to retreive the max precipitation prediction', async () => {
    try {
      const res = await getMaximumPrecipitationPredictionInRangeOfDays(2, 21);
      console.log(res);
    } catch (e) {
      expect(e).toMatchSnapshot();
    }
  });
});

describe('getMaximumPrecipitationPredictionInHistory', () => {
  it('should retreive the prediction with the max precipitation in history', async () => {
    const res = await getMaximumPrecipitationPredictionInHistory();
    expect(res).toBe(weatherPrediction1);
  });
});

describe('setMaxPrecipitationFlag', () => {
  it('should update the user record successfully', () => {
    expect(async () => await setMaxPrecipitationFlag(10, true)).not.toThrow();
  });
  it('should fail to update the user record', () => {
    expect(async () => await setMaxPrecipitationFlag(11, true)).not.toThrow();
  });
});

describe('createNewWeatherPrediction', () => {
  it('should create the new weather prediction successfully', () => {
    expect(
      async () =>
        await createNewWeatherPrediction(1, 10, [planetWithValidData2])
    ).not.toThrow();
  });
  it('should fail create the new weather prediction', () => {
    expect(
      async () =>
        await createNewWeatherPrediction(20, 22, [planetWithValidData2])
    ).not.toThrow();
  });
});
