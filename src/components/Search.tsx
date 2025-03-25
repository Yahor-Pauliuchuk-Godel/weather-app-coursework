import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCityName, selectCityName } from "../state/searchCitySlice";

export default function Search() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cityName = useSelector(selectCityName);
  const [inputValue, setInputValue] = useState(cityName);

  function handleSearch() {
    dispatch(setCityName(inputValue));
    navigate(`/locations`);
  }

  return (
    <div className="d-flex mt-4">
      <input
        type="text"
        className="form-control me-2"
        placeholder="Enter city name..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button className="btn btn-primary" onClick={handleSearch}>Search</button>
    </div>
  )
}