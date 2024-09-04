export interface AddressData {
  fullName: string;
  zipCode: string;
  city: string;
  street: string;
}

export interface ShipmentData {
  address: AddressData;
  method: 'Standard' | 'Express';
}
