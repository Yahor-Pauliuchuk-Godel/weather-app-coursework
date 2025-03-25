import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface SearchCity {
  cityKey: string,
  cityName: string,
  countryCode: string,
  countryName: string,
  regionCode: string,
  regionName: string
}

const initialState: SearchCity = {
  cityKey: "",
  cityName: "",
  countryCode: "",
  countryName: "",
  regionCode: "",
  regionName: ""
}

const searchCitySlice = createSlice({
  name: "searchCity",
  initialState,
  reducers: {
    setCityKey: (state, action: PayloadAction<string>) => {
      state.cityKey = action.payload;
    },
    setCityName: (state, action: PayloadAction<string>) => {
      state.cityName = action.payload;
    },
    setCountryCode: (state, action: PayloadAction<string>) => {
      state.countryCode = action.payload;
    },
    setCountryName: (state, action: PayloadAction<string>) => {
      state.countryName = action.payload;
    },
    setRegionCode: (state, action: PayloadAction<string>) => {
      state.regionCode = action.payload;
    },
    setRegionName: (state, action: PayloadAction<string>) => {
      state.regionName = action.payload;
    },
    setCityData: (state, action: PayloadAction<SearchCity>) => {
      return { ...state, ...action.payload };
    },
    resetCityData: () => initialState,
    resetExceptRegion: (state) => {
      return {
        ...initialState,
        regionCode: state.regionCode,
        regionName: state.regionName,
      };
    },
    resetCity: (state) => {
      state.cityKey = "";
      state.cityName = "";
    }
  }
});

export const {
  setCityKey,
  setCityName,
  setCountryCode,
  setCountryName,
  setRegionCode,
  setRegionName,
  setCityData,
  resetCityData,
  resetExceptRegion,
  resetCity
} = searchCitySlice.actions;
export const selectCityKey = (state: RootState) => state.searchCity.cityKey;
export const selectCityName = (state: RootState) => state.searchCity.cityName;
export const selectCountryCode = (state: RootState) => state.searchCity.countryCode;
export const selectCountryName = (state: RootState) => state.searchCity.countryName;
export const selectRegionCode = (state: RootState) => state.searchCity.regionCode;
export const selectRegionName = (state: RootState) => state.searchCity.regionName;
export default searchCitySlice.reducer;