import { useSelector, useDispatch } from "react-redux";
import { resetCity, resetCityData, resetExceptRegion, selectCountryName, selectRegionName, selectCityName } from "../state/searchCitySlice";
import { useNavigate } from 'react-router-dom';

const Breadcrumb = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const regionName = useSelector(selectRegionName);
  const countryName = useSelector(selectCountryName);
  const cityName = useSelector(selectCityName);

  const handleWorldClick = () => {
    dispatch(resetCityData());
    navigate("/world");
  };

  const handleRegionClick = () => {
    dispatch(resetExceptRegion());
    navigate(`/region/${regionName}`);
  };

  const handleCountryClick = () => {
    dispatch(resetCity());
    navigate(`/country/${countryName}`);
  };

  return (
    <ul className="breadcrumb mt-2">
      <li onClick={handleWorldClick}
        className="breadcrumb-item text-primary text-decoration-underline"
        role="button"
      >
        World
      </li>
      {regionName && <li onClick={handleRegionClick}
        className="breadcrumb-item text-primary text-decoration-underline"
        role="button"
      >
        {regionName}
      </li>}
      {countryName && <li onClick={handleCountryClick}
        className="breadcrumb-item text-primary text-decoration-underline"
        role="button"
      >
        {countryName}
      </li>}
      {cityName && <li className="breadcrumb-item active" aria-current="page">{cityName}</li>}
    </ul>
  );
};

export default Breadcrumb;