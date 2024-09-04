import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { shipmentDataReducer } from './shipment-data.reducer';

@NgModule({
    imports: [StoreModule.forFeature('delivery-data', shipmentDataReducer)],
})
export class ShipmentDataModule {}
