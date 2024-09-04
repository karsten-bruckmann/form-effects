import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ShipmentData } from './shipment-data.model';

const shipmentDataSelector =
    createFeatureSelector<ShipmentData>('delivery-data');

export const shipmentAddressSelector = createSelector(
    shipmentDataSelector,
    deliveryData => deliveryData.address
);

export const shipmentAddressZipCodeSelector = createSelector(
    shipmentAddressSelector,
    deliveryAddress => deliveryAddress.zipCode
);

export const shipmentAddressCityCodeSelector = createSelector(
    shipmentAddressSelector,
    deliveryAddress => deliveryAddress.city
);

export const shipmentAddressStreetCodeSelector = createSelector(
    shipmentAddressSelector,
    deliveryAddress => deliveryAddress.street
);
