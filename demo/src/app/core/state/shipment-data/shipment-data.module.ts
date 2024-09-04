import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { ShipmentData } from './shipment-data.model';
import { shipmentDataReducer } from './shipment-data.reducer';

@NgModule({
  imports: [
    StoreModule.forFeature<ShipmentData>('delivery-data', shipmentDataReducer),
  ],
})
export class ShipmentDataModule {}
