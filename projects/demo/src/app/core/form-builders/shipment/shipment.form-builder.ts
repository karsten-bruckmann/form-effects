import { Injectable } from '@angular/core';
import { createEffectAwareForm } from '@kbru/form-effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { onUserDataChangedFormEffect } from '../../form-effects/shipment-form/on-user-data-changed.form-effect';
import { onZipCodeChangedFormEffect } from '../../form-effects/shipment-form/on-zip-code-changed.form-effect';
import { loadCitiesRequested } from '../../state/cities/cities.actions';
import { citiesSelector } from '../../state/cities/cities.selectors';
import { userDataSelector } from '../../state/user-data/user-data.selectors';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';

class VisibilityAwareFormGroup<
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    T extends { [K in keyof T]: AbstractControl<any, any> },
> extends FormGroup<T> {
    public visible = true;
}

class VisibilityAwareFormControl<T> extends FormControl<T | null> {
    public visible = true;
}

class OptionsAwareFormControl<T> extends VisibilityAwareFormControl<T> {
    public options: T[] = [];
}

export class ShipmentFormGroup extends VisibilityAwareFormGroup<{
    address: VisibilityAwareFormGroup<{
        fullName: VisibilityAwareFormControl<string>;
        zipCode: VisibilityAwareFormControl<string>;
        city: OptionsAwareFormControl<string>;
        street: VisibilityAwareFormControl<string>;
    }>;
    method: OptionsAwareFormControl<string>;
}> {}

@Injectable({ providedIn: 'root' })
export class ShipmentFormBuilder {
    constructor(private store$: Store) {}

    public build(): Observable<ShipmentFormGroup> {
        const form = new ShipmentFormGroup({
            address: new VisibilityAwareFormGroup({
                fullName: new VisibilityAwareFormControl(''),
                zipCode: new VisibilityAwareFormControl(''),
                city: new OptionsAwareFormControl(''),
                street: new VisibilityAwareFormControl(''),
            }),
            method: new OptionsAwareFormControl<string>('Standard'),
        });

        return createEffectAwareForm(form, [
            onUserDataChangedFormEffect(this.store$.select(userDataSelector)),
            onZipCodeChangedFormEffect(
                zipCode => this.store$.select(citiesSelector(zipCode)),
                zipCode =>
                    this.store$.dispatch(loadCitiesRequested({ zipCode }))
            ),
        ]);
    }
}
