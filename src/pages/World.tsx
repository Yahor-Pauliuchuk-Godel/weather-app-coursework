import { useNavigate } from "react-router-dom";
import { useGetRegionsQuery, Region } from "../services/weatherApi";
import { useDispatch } from "react-redux";
import { setRegionCode, setRegionName } from "../state/searchCitySlice";
import LocationList from "../components/LocationList";

const World = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetRegionsQuery();

  const handleRegionClick = (region: Region) => {
    dispatch(setRegionCode(region.ID));
    dispatch(setRegionName(region.EnglishName));
    navigate(`/region/${region.EnglishName}`);
  };

  return (
    <LocationList
      locations={data}
      onItemClick={handleRegionClick}
      isLoading={isLoading}
      error={error}
    />
  );
};

export default World;