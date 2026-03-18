import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { firstValueFrom, Observable } from 'rxjs';
import {
  ShipmentFormBuilder,
  ShipmentFormGroup,
} from '../../core/form-builders/shipment/shipment.form-builder';
import { CitiesModule } from '../../core/state/cities/cities.module';
import { shipmentDataChangedAction } from '../../core/state/shipment-data/shipment-data.actions';
import { ShipmentData } from '../../core/state/shipment-data/shipment-data.model';
import { ShipmentDataModule } from '../../core/state/shipment-data/shipment-data.module';
import {
  userLoggedIn,
  userLoggedOut,
} from '../../core/state/user-data/user-data.actions';
import { UserData } from '../../core/state/user-data/user-data.model';
import { UserDataModule } from '../../core/state/user-data/user-data.module';
import { userDataSelector } from '../../core/state/user-data/user-data.selectors';

@Component({
  selector: 'demo-shipment',
  templateUrl: './shipment.component.html',
  styleUrls: ['./shipment.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ShipmentDataModule,
    UserDataModule,
    CitiesModule,
  ],
})
export class ShipmentComponent {
  public form$: Observable<ShipmentFormGroup>;

  public user$: Observable<UserData>;

  private readonly store$ = inject(Store);
  private readonly formBuilder = inject(ShipmentFormBuilder);

  constructor() {
    this.form$ = this.formBuilder.build();
    this.user$ = this.store$.select(userDataSelector);
  }

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
    const form: ShipmentFormGroup = await firstValueFrom(this.form$);
    const userData = await firstValueFrom(this.user$);
    const data: ShipmentData = {
      address: {
        fullName:
          userData?.fullName ??
          form.controls.address.controls.fullName.value ??
          '',
        zipCode:
          userData?.zipCode ??
          form.controls.address.controls.zipCode.value ??
          '',
        city: userData?.city ?? form.controls.address.controls.city.value ?? '',
        street:
          userData?.street ?? form.controls.address.controls.street.value ?? '',
      },
      method: form.controls.method.value === 'Express' ? 'Express' : 'Standard',
    };
    this.store$.dispatch(shipmentDataChangedAction({ data }));
  }
}
