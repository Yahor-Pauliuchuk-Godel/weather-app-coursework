import { Link, useNavigate } from "react-router-dom";
import { useGetCountriesQuery, Country } from "../services/weatherApi";
import { useDispatch, useSelector } from "react-redux";
import { setCountryCode, setCountryName, selectRegionCode } from "../state/searchCitySlice";

export default function Region() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const regionCode = useSelector(selectRegionCode);

  const { data, error, isLoading } = useGetCountriesQuery(regionCode);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading countries.</p>;

  function handleCountryClick(country: Country) {
    dispatch(setCountryCode(country.ID));
    dispatch(setCountryName(country.EnglishName));
    navigate(`/country/${country.EnglishName}`);
  }

  return (
    <div className="mt-4">
      <ul className="list-group">
        {data?.map((country: Country) => (
          <li key={country.ID} className="list-group-item text-center">
            <button
              className="btn btn-link text-decoration-none"
              onClick={() => handleCountryClick(country)}
            >
              {country.EnglishName}
            </button>
          </li>
        ))}
      </ul>

      <div className="text-center mt-3">
        <Link to="/world" className="btn btn-secondary">Back to World</Link>
      </div>
    </div>
  );
}