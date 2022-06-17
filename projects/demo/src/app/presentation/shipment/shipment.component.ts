import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { first } from 'rxjs/operators';
import { ShipmentFormBuilder } from '../../core/form-builders/shipment/shipment.form-builder';
import { shipmentDataChangedAction } from '../../core/state/shipment-data/shipment-data.actions';
import { ShipmentData } from '../../core/state/shipment-data/shipment-data.model';
import {
    userLoggedIn,
    userLoggedOut,
} from '../../core/state/user-data/user-data.actions';
import { userDataSelector } from '../../core/state/user-data/user-data.selectors';

@Component({
    selector: 'demo-shipment',
    templateUrl: './shipment.component.html',
    styleUrls: ['./shipment.component.scss'],
})
export class ShipmentComponent {
    constructor(
        private store$: Store,
        private formBuilder: ShipmentFormBuilder
    ) {}

    public form$ = this.formBuilder.build();

    public user$ = this.store$.select(userDataSelector);

    public login(): void {
        this.store$.dispatch(
            userLoggedIn({
                userData: {
                    fullName: 'Max Mustermann',
                    zipCode: '12435',
                    city: 'Berlin',
                    street: 'An der Spree 64',
                },
            })
        );
    }

    public logout(): void {
        this.store$.dispatch(userLoggedOut());
    }

    public async submit(): Promise<void> {
        const form = await this.form$.pipe(first()).toPromise();
        const userData = await this.user$.pipe(first()).toPromise();
        const data: ShipmentData = {
            ...form.value,
            address: {
                ...form.value.address,
                ...(userData ?? {}),
            },
        };
        this.store$.dispatch(shipmentDataChangedAction({ data }));
    }
}
