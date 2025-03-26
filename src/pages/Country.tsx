import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { setCityKey, setCityName, selectCountryCode, selectRegionName } from "../state/searchCitySlice";
import { useGetAdminAreasQuery, useLazyGetCityByCountryCodeAndAdminCodeQuery, AdminArea } from '../services/weatherApi';

const Country = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const countryCode = useSelector(selectCountryCode);
  const regionName = useSelector(selectRegionName);

  const { data, error, isLoading } = useGetAdminAreasQuery(countryCode?.toUpperCase() || '');
  const [triggerGetCity] = useLazyGetCityByCountryCodeAndAdminCodeQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading admin areas.</p>;

  const handleClick = async (city: AdminArea) => {
    try {
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
    } catch (error) {
      
    }
  };

  return (
    <div className="mt-4">
      <ul className="list-group">
        {data?.map((city: AdminArea) => (
          <li key={city.ID} className="list-group-item text-center">
            <button
              className="btn btn-link text-decoration-none"
              onClick={() => handleClick(city)}
            >
              {city.EnglishName}
            </button>
          </li>
        ))}
      </ul>

      <div className="text-center mt-3">
        <Link to={`/region/${regionName}`} className="btn btn-secondary">Back to Region</Link>
      </div>
    </div>
  );
};

export default Country;
