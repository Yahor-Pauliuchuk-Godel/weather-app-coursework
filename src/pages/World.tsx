import { useNavigate } from "react-router-dom";
import { useGetRegionsQuery, Region } from "../services/weatherApi";
import { useDispatch } from "react-redux";
import { setRegionCode, setRegionName } from "../state/searchCitySlice";

export default function World() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetRegionsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading weather data.</p>;

  function handleRegionClick(region: Region) {
    dispatch(setRegionCode(region.ID));
    dispatch(setRegionName(region.EnglishName));
    navigate(`/region/${region.EnglishName}`);
  }

  return (
    <div className="mt-4">
      <ul className="list-group">
        {data?.map((region: Region) => (
          <li key={region.ID} className="list-group-item text-center">
            <button
              className="btn btn-link text-decoration-none"
              onClick={() => handleRegionClick(region)}
            >
              {region.EnglishName}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}