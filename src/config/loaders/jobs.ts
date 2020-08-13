import Agenda from 'agenda';
import weatherPredictionJobHandler from '../../jobs/weather-prediction';

export default ({ agendajs }: { agendajs: Agenda }): void => {
  agendajs.define(
    'createWeatherPrediction',
    { priority: 'high', concurrency: 10 },
    weatherPredictionJobHandler
  );
  (async function () {
    await agendajs.start();
    await agendajs.every('2 minutes', 'createWeatherPrediction');
  })();
};
