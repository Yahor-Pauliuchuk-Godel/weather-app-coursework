import { useNavigate } from "react-router-dom";
import { useGetCountriesQuery, Country } from "../services/weatherApi";
import { useDispatch, useSelector } from "react-redux";
import { setCountryCode, setCountryName, selectRegionCode } from "../state/searchCitySlice";
import LocationList from "../components/LocationList";

const Region = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const regionCode = useSelector(selectRegionCode);

  const { data, error, isLoading } = useGetCountriesQuery(regionCode);

  const handleCountryClick = (country: Country) => {
    dispatch(setCountryCode(country.ID));
    dispatch(setCountryName(country.EnglishName));
    navigate(`/country/${country.EnglishName}`);
  };

  return (
    <LocationList
      locations={data}
      onItemClick={handleCountryClick}
      isLoading={isLoading}
      error={error}
      backLink={{
        to: "/world",
        label: "Back to World"
      }}
    />
  );
};

export default Region;