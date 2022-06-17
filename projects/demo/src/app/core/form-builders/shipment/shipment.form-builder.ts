import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup } from '../../types/form-group.type';
import { createEffectAwareForm } from '@kbru/form-effects';
import { FormControlWithProps, FormGroupWithProps } from '@kbru/control-props';
import { Store } from '@ngrx/store';
import { citiesSelector } from '../../state/cities/cities.selectors';
import { loadCitiesRequested } from '../../state/cities/cities.actions';
import { onZipCodeChangedFormEffect } from './effects/on-zip-code-changed.form-effect';
import { onUserDataChangedFormEffect } from './effects/on-user-data-changed.form-effect';
import { userDataSelector } from '../../state/user-data/user-data.selectors';
import { ControlProps } from '../../types/control-props.type';

@Injectable({ providedIn: 'root' })
export class ShipmentFormBuilder {
    constructor(private store$: Store) {}

    public get form(): Observable<FormGroup> {
        const form = new FormGroupWithProps<ControlProps>(
            { visible: true },
            {
                address: new FormGroupWithProps(
                    { visible: true },
                    {
                        fullName: new FormControlWithProps(
                            { visible: true },
                            ''
                        ),
                        zipCode: new FormControlWithProps(
                            { visible: true },
                            ''
                        ),
                        city: new FormControlWithProps({ visible: true }, ''),
                        street: new FormControlWithProps({ visible: true }, ''),
                    }
                ),
                method: new FormControlWithProps(
                    { visible: true, options: ['Standard'] },
                    'Standard'
                ),
            }
        );

        return createEffectAwareForm(form, [
            onUserDataChangedFormEffect(this.store$.select(userDataSelector)),
            onZipCodeChangedFormEffect(
                (zipCode) => this.store$.select(citiesSelector(zipCode)),
                (zipCode) =>
                    this.store$.dispatch(loadCitiesRequested({ zipCode }))
            ),
        ]);
    }
}
