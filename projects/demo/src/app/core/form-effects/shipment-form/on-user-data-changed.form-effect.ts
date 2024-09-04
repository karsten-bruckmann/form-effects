import { FormEffect } from '@kbru/form-effects';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserData } from '../../state/user-data/user-data.model';
import { ShipmentFormGroup } from '../../form-builders/shipment/shipment.form-builder';

export const onUserDataChangedFormEffect =
    (userData$: Observable<UserData>): FormEffect<ShipmentFormGroup> =>
    formGroup => {
        const addressGroup = formGroup.controls.address;
        const methodControl = formGroup.controls.method;
        return userData$.pipe(
            map(userData => {
                if (null === userData) {
                    addressGroup.visible = true;
                    methodControl.options = ['Standard'];
                    methodControl.setValue('Standard');
                } else {
                    addressGroup.visible = false;
                    addressGroup.setValue(userData);
                    methodControl.options = ['Standard', 'Express'];
                }
            })
        );
    };
