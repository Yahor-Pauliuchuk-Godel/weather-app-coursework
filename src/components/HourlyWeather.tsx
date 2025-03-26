import { useGetHourlyForecastsByLocationQuery, HourlyForecast } from '../services/weatherApi';

type HourlyWeatherProps = {
  locationId: string
}

const HourlyWeather = ({ locationId }: HourlyWeatherProps) => {
  const { data: weatherData, error: weatherError, isLoading: weatherLoading } = useGetHourlyForecastsByLocationQuery(locationId, { skip: !locationId });

  if (weatherLoading) return <p>Loading...</p>;
  if (weatherError) return <p>Error loading weather data.</p>;
  if (!weatherData) return <p>Weather data not found.</p>;

  return (
    <>
      {weatherData.map((hourlyWeather: HourlyForecast) =>
        <div key={hourlyWeather.EpochDateTime} className="weather-info mt-4">
          <p className="text-muted">
            {new Date(hourlyWeather.DateTime).toLocaleString()}
          </p>

          <div className="weather-detail">
            <span className="label">Temperature: </span>
            <span className="value">{hourlyWeather.Temperature.Value}{hourlyWeather.Temperature.Unit}</span>
          </div>
          <div className="weather-detail">
            <span className="label">Wind Speed: </span>
            <span className="value">{hourlyWeather.Wind.Speed.Value}{hourlyWeather.Wind.Speed.Unit}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default HourlyWeather;