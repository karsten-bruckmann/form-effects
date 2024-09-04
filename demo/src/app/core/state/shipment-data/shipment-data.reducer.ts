import { createReducer, on } from '@ngrx/store';
import { ShipmentData } from './shipment-data.model';
import { shipmentDataChangedAction } from './shipment-data.actions';

export const shipmentDataReducer = createReducer<ShipmentData>(
    {
        address: {
            fullName: '',
            zipCode: '',
            street: '',
            city: '',
        },
        method: 'Standard',
    },
    on(shipmentDataChangedAction, (state, action) => ({
        ...state,
        ...action.data,
    }))
);
