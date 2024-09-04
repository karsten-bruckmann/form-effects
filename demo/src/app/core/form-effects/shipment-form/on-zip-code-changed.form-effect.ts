import { FormEffect } from '@kbru/form-effects';
import {
  Observable,
  of,
  distinctUntilChanged,
  map,
  startWith,
  switchMap,
} from 'rxjs';
import {
  CitiesLoading,
  CitiesNotLoaded,
  CITIES_LOADING,
  CITIES_NOT_LOADED,
} from '../../state/cities/cities.model';
import { ShipmentFormGroup } from '../../form-builders/shipment/shipment.form-builder';

export const onZipCodeChangedFormEffect =
  (
    selectCities: (
      zipCode: string
    ) => Observable<string[] | CitiesLoading | CitiesNotLoaded>,
    loadCities: (zipCode: string) => void
  ): FormEffect<ShipmentFormGroup> =>
  (formGroup) => {
    const addressGroup = formGroup.controls.address;
    const zipControl = formGroup.controls.address.controls.zipCode;
    const cityControl = formGroup.controls.address.controls.city;
    const streetControl = formGroup.controls.address.controls.street;
    return zipControl.valueChanges.pipe(
      startWith(zipControl.value),
      distinctUntilChanged(),
      switchMap((zipCode) =>
        (!zipCode || zipCode.length !== 5
          ? of(<string[]>[])
          : selectCities(zipCode)
        ).pipe(
          map((cities) => {
            if (CITIES_LOADING === cities) {
              return;
            }
            if (CITIES_NOT_LOADED === cities) {
              cityControl.disable();
              cityControl.options = [];
              streetControl.disable();
              loadCities(zipCode ?? '');
              return;
            }
            cityControl.visible = true;
            cityControl.options = cities;
            if (cities.length === 0) {
              cityControl.setValue('');
              cityControl.disable();
              streetControl.disable();
              return;
            }
            if (cities.length === 1) {
              cityControl.setValue(cities[0]);
              cityControl.visible = false;
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
