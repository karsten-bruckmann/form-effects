import { FormEffect } from '@kbru/form-effects';
import { Observable, map } from 'rxjs';
import { UserData } from '../../state/user-data/user-data.model';
import { ShipmentFormGroup } from '../../form-builders/shipment/shipment.form-builder';

export const onUserDataChangedFormEffect =
  (userData$: Observable<UserData>): FormEffect<ShipmentFormGroup> =>
  (formGroup) => {
    const addressGroup = formGroup.controls.address;
    const methodGroup = formGroup.controls.method;
    return userData$.pipe(
      map((userData) => {
        if (null === userData) {
          addressGroup.visible = true;
          methodGroup.options = ['Standard'];
          methodGroup.setValue('Standard');
        } else {
          addressGroup.visible = false;
          addressGroup.setValue(userData);
          methodGroup.options = ['Standard', 'Express'];
        }
      })
    );
  };
