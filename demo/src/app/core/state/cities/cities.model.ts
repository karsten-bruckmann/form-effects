export type CitiesLoading = 'loading';
export const CITIES_LOADING: CitiesLoading = 'loading';

export type CitiesNotLoaded = 'not-loaded';
export const CITIES_NOT_LOADED: CitiesNotLoaded = 'not-loaded';

export const citiesLoaded = (
  data: string[] | CitiesLoading | CitiesNotLoaded
): data is string[] => {
  return data !== CITIES_LOADING && data !== CITIES_NOT_LOADED;
};
export const citiesLoading = (
  data: string[] | CitiesLoading | CitiesNotLoaded
): data is CitiesLoading => {
  return data === CITIES_LOADING;
};
export const citiesNotLoaded = (
  data: string[] | CitiesLoading | CitiesNotLoaded
): data is CitiesNotLoaded => {
  return data === CITIES_NOT_LOADED;
};

export type Cities = Record<string, undefined | string[] | CitiesLoading>;
