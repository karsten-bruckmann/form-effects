export interface CitiesResponse {
  'post code': string;
  country: 'Germany';
  'country abbreviation': 'DE';
  places: [
    {
      'place name': string;
      longitude: string;
      state: string;
      'state abbreviation': string;
      latitude: string;
    }
  ];
}

export const citiesMock = (zipCode: string, cities: string[]) => ({
  'post code': zipCode,
  country: 'Germany',
  'country abbreviation': 'DE',
  places: cities.map((city) => ({
    'place name': city,
    longitude: '',
    state: '',
    'state abbreviation': '',
    latitude: '',
  })),
});
