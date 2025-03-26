import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCityData, selectCityName } from "../state/searchCitySlice";
import { useGetCityByNameQuery } from "../services/weatherApi";

type SearchCity = {
  Key: string,
  EnglishName: string,
  Region: {
    ID: string,
    EnglishName: string
  }
  Country: {
    ID: string
    EnglishName: string
  }
}

const SearchList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cityName = useSelector(selectCityName);

  const { data, error, isLoading } = useGetCityByNameQuery(cityName, { skip: !cityName });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading weather data.</p>;

  const handleCityClick = (city: SearchCity) => {
    const searchCity = {
      cityName: city.EnglishName,
      cityKey: city.Key,
      countryCode: city.Country.ID,
      countryName: city.Country.EnglishName,
      regionCode: city.Region.ID,
      regionName: city.Region.EnglishName
    }

    dispatch(setCityData(searchCity));
    navigate(`/forecast`);
  };

  return (
    <div className="mt-4">
      <ul className="list-group">
        {data?.map((city: SearchCity) => (
          <li key={city.Key} className="list-group-item text-center">
            <button
              className="btn btn-link text-decoration-none"
              onClick={() => handleCityClick(city)}
            >
              {city.EnglishName} - {city.Country.EnglishName}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchList;