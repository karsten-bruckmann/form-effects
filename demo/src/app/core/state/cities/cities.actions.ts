import { createAction, props } from '@ngrx/store';

export const loadCitiesRequested = createAction(
    'loadCitiesRequested',
    props<{ zipCode: string }>()
);

export const loadCitiesSuccess = createAction(
    'loadCitiesSuccess',
    props<{ zipCode: string; cities: string[] }>()
);

export const loadCitiesFailed = createAction(
    'loadCitiesFailed',
    props<{ zipCode: string }>()
);
