import { FormEffect } from '@kbru/form-effects';
import { Observable, of } from 'rxjs';
import {
    distinctUntilChanged,
    map,
    startWith,
    switchMap,
} from 'rxjs/operators';
import {
    CitiesLoading,
    CitiesNotLoaded,
    CITIES_LOADING,
    CITIES_NOT_LOADED,
} from '../../../state/cities/cities.model';
import { FormGroup } from '../../../types/form-group.type';

export const onZipCodeChangedFormEffect =
    (
        selectCities: (
            zipCode: string
        ) => Observable<string[] | CitiesLoading | CitiesNotLoaded>,
        loadCities: (zipCode: string) => void
    ): FormEffect<FormGroup> =>
    formGroup => {
        const addressGroup = formGroup.get('address');
        if (!addressGroup) {
            throw new Error('address not in form');
        }
        const zipControl = formGroup.get('address.zipCode');
        if (!zipControl) {
            throw new Error('zipCode not in form');
        }
        const cityControl = formGroup.get('address.city');
        if (!cityControl) {
            throw new Error('city not in form');
        }
        const streetControl = formGroup.get('address.street');
        if (!streetControl) {
            throw new Error('street not in form');
        }
        return zipControl.valueChanges.pipe(
            startWith(zipControl.value),
            distinctUntilChanged(),
            switchMap(zipCode =>
                (!zipCode || zipCode.length !== 5
                    ? of(<string[]>[])
                    : selectCities(zipCode)
                ).pipe(
                    map(cities => {
                        if (CITIES_LOADING === cities) {
                            return;
                        }
                        if (CITIES_NOT_LOADED === cities) {
                            cityControl.disable();
                            cityControl.setProp('options', []);
                            streetControl.disable();
                            loadCities(zipCode);
                            return;
                        }
                        cityControl.setProp('visible', true);
                        cityControl.setProp('options', cities);
                        if (cities.length === 0) {
                            cityControl.setValue('');
                            cityControl.disable();
                            streetControl.disable();
                            return;
                        }
                        if (cities.length === 1) {
                            cityControl.setValue(cities[0]);
                            cityControl.setProp('visible', false);
                        }
                        if (!addressGroup.enabled) {
                            return;
                        }
                        cityControl.enable();
                        streetControl.enable();
                    })
                )
            )
        );
    };
