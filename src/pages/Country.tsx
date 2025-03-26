import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { setCityKey, setCityName, selectCountryCode, selectRegionName } from "../state/searchCitySlice";
import { useGetAdminAreasQuery, useLazyGetCityByCountryCodeAndAdminCodeQuery, AdminArea } from '../services/weatherApi';
import LocationList from "../components/LocationList";

const Country = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const countryCode = useSelector(selectCountryCode);
  const regionName = useSelector(selectRegionName);

  const { data, error, isLoading } = useGetAdminAreasQuery(countryCode?.toUpperCase() || '');
  const [triggerGetCity] = useLazyGetCityByCountryCodeAndAdminCodeQuery();

  const handleClick = async (city: AdminArea) => {
    const { data: cityData } = await triggerGetCity({
      countryCode: countryCode as string,
      adminCode: city.ID as string,
      cityName: city.EnglishName as string
    });

    if (!cityData || cityData.length === 0) {
      return;
    }

    dispatch(setCityKey(cityData[0].Key));
    dispatch(setCityName(cityData[0].EnglishName));

    navigate(`/forecast`);
  };

  return (
    <LocationList
      locations={data}
      onItemClick={handleClick}
      isLoading={isLoading}
      error={error}
      backLink={{
        to: `/region/${regionName}`,
        label: "Back to Region"
      }}
    />
  );
};

export default Country;
