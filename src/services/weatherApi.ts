import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_KEY = "VNvQJcZd2BIzAyMwFBDqvGgg6rVLth1h";
//const API_KEY = "Nzr9hJNvkxhtcjfYjmkl82PZnpOmnIC9";

export type Region = {
  ID: string;
  EnglishName: string
}

export type Country = {
  ID: string;
  EnglishName: string,
}

export type AdminArea = {
  ID: string;
  EnglishName: string;
  CountryID: string;
}

export type City = {
  Key: string;
  EnglishName: string
}

export type SearchCityResponse = {
  Key: string,
  EnglishName: string,
  Region: {
    ID: string,
    EnglishName: string
  },
  Country: {
    ID: string,
    EnglishName: string
  }
}

export type WeatherCondition = {
  LocalObservationDateTime: string;
  EpochTime: number;
  WeatherText: string;
  WeatherIcon: number;
  HasPrecipitation: boolean;
  PrecipitationType: string | null;
  IsDayTime: boolean;
  Temperature: {
    Metric: { Value: number; Unit: string; UnitType: number };
    Imperial: { Value: number; Unit: string; UnitType: number };
  };
  Wind: {
    Speed: {
      Metric: { Value: number; Unit: string; UnitType: number };
      Imperial: { Value: number; Unit: string; UnitType: number };
    }
  };
  Pressure: {
    Metric: { Value: number; Unit: string; UnitType: number };
    Imperial: { Value: number; Unit: string; UnitType: number };
  };
}

export type HourlyForecast = {
  DateTime: string;
  EpochDateTime: number;
  WeatherIcon: number;
  IconPhrase: string;
  Temperature: {
    Value: number;
    Unit: string;
    UnitType: number;
  };
  Wind: {
    Speed: {
      Value: number;
      Unit: string;
      UnitType: number;
    };
  };
}

export type DailyForecast = {
  Date: string;
  EpochDate: number;
  Temperature: {
    Minimum: { Value: number; Unit: string; UnitType: number };
    Maximum: { Value: number; Unit: string; UnitType: number };
  };
  Day: { Icon: number; IconPhrase: string; HasPrecipitation: boolean };
  Night: { Icon: number; IconPhrase: string; HasPrecipitation: boolean };
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
    getCityByName: builder.query<SearchCityResponse[], string>({
      query: (cityName) => ({
        url: `locations/v1/cities/search`,
        params: { 
          apikey: API_KEY,
          q: cityName 
        }
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
    getCurrentConditionsByLocation: builder.query<WeatherCondition[], string>({
      query: (locationId) => ({
        url: `currentconditions/v1/${locationId}`,
        params: {
          apikey: API_KEY,
          details: true,
        },
      }),
    }),
    getHourlyForecastsByLocation: builder.query<HourlyForecast[], string>({
      query: (locationId) => ({
        url: `forecasts/v1/hourly/12hour/${locationId}`,
        params: {
          apikey: API_KEY,
          details: true,
        },
      }),
    }),
    getDailyForecastsByLocation: builder.query<DailyForecast[], string>({
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