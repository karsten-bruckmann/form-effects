import { createReducer, on } from '@ngrx/store';
import { Cities } from './cities.model';
import { loadCitiesFailed, loadCitiesSuccess } from './cities.actions';

export const citiesReducer = createReducer<Cities>(
    {},
    on(loadCitiesSuccess, (state, action) => ({
        ...state,
        [action.zipCode]: action.cities,
    })),
    on(loadCitiesFailed, (state, action) => ({
        ...state,
        [action.zipCode]: [],
    }))
);
