import { configureStore } from "@reduxjs/toolkit";
import { weatherApi } from "../services/weatherApi";
import intervalsReducer from "./intervalsSlice";
import searchCityReducer from "./searchCitySlice";

export const store = configureStore({
  reducer: {
    [weatherApi.reducerPath]: weatherApi.reducer,
    intervals: intervalsReducer,
    searchCity: searchCityReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(weatherApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;