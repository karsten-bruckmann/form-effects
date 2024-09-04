import { Component } from '@angular/core';
import { ShipmentComponent } from './presentation/shipment/shipment.component';
import { CitiesModule } from './core/state/cities/cities.module';
import { ShipmentDataModule } from './core/state/shipment-data/shipment-data.module';
import { UserDataModule } from './core/state/user-data/user-data.module';

@Component({
    selector: 'demo-root',
    template: '<demo-shipment></demo-shipment>',
    standalone: true,
    imports: [
        ShipmentComponent,
        CitiesModule,
        ShipmentDataModule,
        UserDataModule,
    ],
})
export class AppComponent {}
