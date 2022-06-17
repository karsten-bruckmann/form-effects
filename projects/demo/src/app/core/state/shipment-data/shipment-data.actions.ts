import { createAction, props } from '@ngrx/store';
import { ShipmentData } from './shipment-data.model';

export const shipmentDataChangedAction = createAction(
    'deliveryDataChangedAction',
    props<{ data: Partial<ShipmentData> }>()
);
