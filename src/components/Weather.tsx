export interface BaseWeatherData {
  LocalObservationDateTime: Date;
  Temperature: {
    Imperial: {
      Value: number;
    };
  };
  Wind: {
    Speed: {
      Imperial: {
        Value: number;
      };
    };
  };
  Pressure: {
    Imperial: {
      Value: number;
    };
  };
}

interface WeatherProps {
  weatherData: BaseWeatherData
}

export default function Weather({ weatherData }: WeatherProps ) {
  return (
    <>
      <div className="weather-info mt-4">
        <p className="text-muted">
          {new Date(weatherData.LocalObservationDateTime).toLocaleString()}
        </p>

        <div className="weather-detail">
          <span className="label">Temperature:</span>
          <span className="value"> {weatherData.Temperature.Imperial.Value}°F</span>
        </div>
        <div className="weather-detail">
          <span className="label">Wind Speed:</span>
          <span className="value"> {weatherData.Wind.Speed.Imperial.Value}mph</span>
        </div>
        <div className="weather-detail">
          <span className="label">Pressure:</span>
          <span className="value"> {weatherData.Pressure.Imperial.Value}mb</span>
        </div>
      </div>
    </>
  )
}