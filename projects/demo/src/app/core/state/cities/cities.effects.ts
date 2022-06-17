import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import {
    loadCitiesFailed,
    loadCitiesRequested,
    loadCitiesSuccess,
} from './cities.actions';
import { catchError, filter, map, of, switchMap } from 'rxjs';
import { CitiesApiClient } from '../../api-clients/cities.api-client';
import { Store } from '@ngrx/store';
import { citiesSelector } from './cities.selectors';
import { citiesNotLoaded } from './cities.model';

@Injectable()
export class CitiesEffects {
    constructor(
        private actions$: Actions,
        private store$: Store,
        private apiClient: CitiesApiClient
    ) {}

    public loadCities = createEffect(() =>
        this.actions$.pipe(
            ofType(loadCitiesRequested),
            concatLatestFrom((action) =>
                this.store$.select(citiesSelector(action.zipCode))
            ),
            filter(([, cities]) => citiesNotLoaded(cities)),
            switchMap(([action]) =>
                this.apiClient.fetch(action.zipCode).pipe(
                    map((result) =>
                        loadCitiesSuccess({
                            zipCode: action.zipCode,
                            cities: result,
                        })
                    ),
                    catchError(() =>
                        of(loadCitiesFailed({ zipCode: action.zipCode }))
                    )
                )
            )
        )
    );
}
