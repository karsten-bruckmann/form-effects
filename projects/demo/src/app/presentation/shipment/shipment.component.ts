import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
    ShipmentFormBuilder,
    ShipmentFormGroup,
} from '../../core/form-builders/shipment/shipment.form-builder';
import { shipmentDataChangedAction } from '../../core/state/shipment-data/shipment-data.actions';
import { ShipmentData } from '../../core/state/shipment-data/shipment-data.model';
import {
    userLoggedIn,
    userLoggedOut,
} from '../../core/state/user-data/user-data.actions';
import { userDataSelector } from '../../core/state/user-data/user-data.selectors';
import { firstValueFrom, Observable } from 'rxjs';
import { UserData } from '../../core/state/user-data/user-data.model';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CitiesModule } from '../../core/state/cities/cities.module';
import { ShipmentDataModule } from '../../core/state/shipment-data/shipment-data.module';
import { UserDataModule } from '../../core/state/user-data/user-data.module';

@Component({
    selector: 'demo-shipment',
    templateUrl: './shipment.component.html',
    styleUrls: ['./shipment.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        CitiesModule,
        ShipmentDataModule,
        UserDataModule,
    ],
})
export class ShipmentComponent {
    constructor(
        private store$: Store,
        formBuilder: ShipmentFormBuilder
    ) {
        this.form$ = formBuilder.build();
        this.user$ = this.store$.select(userDataSelector);
    }

    public form$: Observable<ShipmentFormGroup>;
    public user$: Observable<UserData>;

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
        const form = await firstValueFrom(this.form$);
        const userData = await firstValueFrom(this.user$);
        const data: ShipmentData = {
            address: {
                city: userData?.city ?? form.value.address?.city ?? '',
                zipCode: userData?.zipCode ?? form.value.address?.zipCode ?? '',
                street: userData?.street ?? form.value.address?.street ?? '',
                fullName:
                    userData?.fullName ?? form.value.address?.fullName ?? '',
            },
            method: form.value.method === 'Express' ? 'Express' : 'Standard',
        };
        this.store$.dispatch(shipmentDataChangedAction({ data }));
    }
}
