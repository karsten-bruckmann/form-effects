import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of, catchError, filter, map, switchMap } from 'rxjs';
import { CitiesApiClient } from '../../api-clients/cities.api-client';
import {
  loadCitiesFailed,
  loadCitiesRequested,
  loadCitiesSuccess,
} from './cities.actions';
import { citiesNotLoaded } from './cities.model';
import { citiesSelector } from './cities.selectors';
import { concatLatestFrom } from '@ngrx/operators';

export const loadCitiesEffect = createEffect(
  (
    actions$ = inject(Actions),
    store$ = inject(Store),
    apiClient = inject(CitiesApiClient)
  ) =>
    actions$.pipe(
      ofType(loadCitiesRequested),
      concatLatestFrom((action) =>
        store$.select(citiesSelector(action.zipCode))
      ),
      filter(([, cities]) => citiesNotLoaded(cities)),
      switchMap(([action]) =>
        apiClient.fetch(action.zipCode).pipe(
          map((result) =>
            loadCitiesSuccess({
              zipCode: action.zipCode,
              cities: result,
            })
          ),
          catchError(() => of(loadCitiesFailed({ zipCode: action.zipCode })))
        )
      )
    ),
  { functional: true }
);
