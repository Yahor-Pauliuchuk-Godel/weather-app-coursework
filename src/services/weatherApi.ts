import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

//const API_KEY = "ntQzeVnrFFnABVwgUkjVFkOREHwnxtA0";
const API_KEY = "Nzr9hJNvkxhtcjfYjmkl82PZnpOmnIC9";

export interface Region {
  ID: string;
  EnglishName: string
}

export interface Country {
  ID: string;
  EnglishName: string,
}

export interface AdminArea {
  ID: string;
  EnglishName: string;
  CountryID: string;
}

export interface City {
  Key: string;
  EnglishName: string
}

export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({ 
    baseUrl: "http://dataservice.accuweather.com/",
    prepareHeaders: (headers) => {
      headers.set("Accept", "application/json");
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getRegions: builder.query<Region[], void>({
      query: () => ({
        url: `locations/v1/regions`,
        params: { apikey: API_KEY },
      }),
    }),
    getCountries: builder.query<Country[], string>({
      query: (regionCode) => ({
        url: `locations/v1/countries/${regionCode}`,
        params: { apikey: API_KEY },
      }),
    }),
    getAdminAreas: builder.query<AdminArea[], string>({
      query: (regionCode) => ({
        url: `locations/v1/adminareas/${regionCode}`,
        params: { apikey: API_KEY },
      }),
    }),
    getCityByName: builder.query({
      query: (cityName) => ({
        url: `locations/v1/cities/search?q=${cityName}`,
        params: { apikey: API_KEY }
      })
    }),
    getCityByCountryCodeAndAdminCode: builder.query<City[], { countryCode: string, adminCode: string, cityName: string }>({
      query: ({ countryCode, adminCode, cityName }) => ({
        url: `locations/v1/cities/${countryCode}/${adminCode}/search`,
        params: { 
          apikey: API_KEY,
          q: cityName
        },
      }),
    }),
    getCurrentConditionsByLocation: builder.query({
      query: (locationId) => ({
        url: `currentconditions/v1/${locationId}`,
        params: {
          apikey: API_KEY,
          details: true,
        },
      }),
    }),
    getHourlyForecastsByLocation: builder.query({
      query: (locationId) => ({
        url: `forecasts/v1/hourly/12hour/${locationId}`,
        params: {
          apikey: API_KEY,
          details: true,
        },
      }),
    }),
    getDailyForecastsByLocation: builder.query({
      query: (locationId) => ({
        url: `forecasts/v1/daily/10day/${locationId}`,
        params: {
          apikey: API_KEY,
          details: true,
        },
      }),
    }),
  }),
});

export const {
  useGetRegionsQuery,
  useGetCountriesQuery,
  useGetAdminAreasQuery,
  useGetCityByNameQuery,
  useGetCityByCountryCodeAndAdminCodeQuery,
  useLazyGetCityByCountryCodeAndAdminCodeQuery,
  useGetCurrentConditionsByLocationQuery,
  useGetHourlyForecastsByLocationQuery,
  useGetDailyForecastsByLocationQuery
} = weatherApi;