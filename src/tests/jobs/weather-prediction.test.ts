import weatherPredictionJobHandler from '../../jobs/weather-prediction';

jest.mock('../../services/weather-prediction');
jest.mock('../../services/planet');

describe('weatherPredictionJobHandler', () => {
  it('should trigger the weather prediction with failure', () => {
    expect(
      async () => await weatherPredictionJobHandler(undefined, jest.fn())
    ).not.toThrow();
  });
});
