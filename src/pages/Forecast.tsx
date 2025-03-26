import { useSelector, useDispatch } from "react-redux";
import { selectIntervalsType, changeInterval } from "../state/intervalsSlice";
import { selectCityKey, selectCityName } from "../state/searchCitySlice";
import { useGetDailyForecastsByLocationQuery } from "../services/weatherApi";
import CurrentlyWeather from "../components/CurrentlyWeather";
import HourlyWeather from "../components/HourlyWeather";

const Forecast = () => {
  const locationId = useSelector(selectCityKey);
  const intervalType = useSelector(selectIntervalsType);
  const cityName = useSelector(selectCityName);
  const dispatch = useDispatch();

  let weatherIntervalComponent;

  if (intervalType === "today") {
    weatherIntervalComponent = <CurrentlyWeather locationId={locationId} />
  } else if (intervalType === "hourly") {
    weatherIntervalComponent = <HourlyWeather locationId={locationId} />
  } else {
    weatherIntervalComponent = useGetDailyForecastsByLocationQuery(locationId, { skip: !locationId });
  }

  return (
    <>
      <div className="d-flex justify-content-center gap-1 mt-4">
        <button onClick={() => dispatch(changeInterval('today'))}
          className={`btn ${intervalType === 'today' ? 'btn-primary' : 'btn-outline-primary'}`}>
            Today
        </button>
        <button onClick={() => dispatch(changeInterval('hourly'))}
          className={`btn ${intervalType === 'hourly' ? 'btn-primary' : 'btn-outline-primary'}`}>
            Hourly
        </button>
        <button onClick={() => dispatch(changeInterval('daily'))}
          className={`btn ${intervalType === 'daily' ? 'btn-primary' : 'btn-outline-primary'}`}>
            Daily
        </button>
      </div>

      <h2>{cityName} Weather Forecast</h2>

      {weatherIntervalComponent}
    </>
  );
};

export default Forecast;
