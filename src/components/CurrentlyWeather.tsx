import { useGetCurrentConditionsByLocationQuery } from '../services/weatherApi';
import Weather from './Weather';
import { BaseWeatherData } from './Weather';

type CurrentWeatherProps = {
  locationId: string
}

const CurrentWeather = ({ locationId }: CurrentWeatherProps) => {
  const { data: weatherData, error: weatherError, isLoading: weatherLoading } = useGetCurrentConditionsByLocationQuery(locationId, { skip: !locationId });

  if (weatherLoading) return <p>Loading...</p>;
  if (weatherError) return <p>Error loading weather data.</p>;
  if (!weatherData) return <p>Weather data not found.</p>;

  const adaptedWeatherData: BaseWeatherData = {
    LocalObservationDateTime: new Date(weatherData[0].LocalObservationDateTime),
    Temperature: weatherData[0].Temperature,
    Wind: weatherData[0].Wind,
    Pressure: weatherData[0].Pressure
  };

  return (
    <Weather weatherData={adaptedWeatherData} />
  );
};

export default CurrentWeather;