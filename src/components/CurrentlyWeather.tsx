import { useGetCurrentConditionsByLocationQuery } from '../services/weatherApi';
import Weather from './Weather';

interface CurrentWeatherProps {
  locationId: string | undefined
}

export default function CurrentWeather({ locationId }: CurrentWeatherProps) {
  const { data: weatherData, error: weatherError, isLoading: weatherLoading } = useGetCurrentConditionsByLocationQuery(locationId, { skip: !locationId });

  if (weatherLoading) return <p>Loading...</p>;
  if (weatherError) return <p>Error loading weather data.</p>;
  if (!weatherData) return <p>Weather data not found.</p>;

  return (
    <Weather weatherData={weatherData[0]} />
  )
}