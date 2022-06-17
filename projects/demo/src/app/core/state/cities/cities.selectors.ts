import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Cities, CITIES_NOT_LOADED } from './cities.model';

const feature = createFeatureSelector<Cities>('cities');

export const citiesSelector = (zipCode: string) =>
    createSelector(feature, cities => cities[zipCode] ?? CITIES_NOT_LOADED);
