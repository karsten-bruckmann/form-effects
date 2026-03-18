import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CitiesResponse } from './cities.response';

@Injectable({ providedIn: 'root' })
export class CitiesApiClient {
  private readonly http = inject(HttpClient);

  private baseUrl = 'https://api.zippopotam.us/de/';

  public fetch(zipCode: string): Observable<string[]> {
    return this.http
      .get<CitiesResponse>(`${this.baseUrl}${zipCode}`)
      .pipe(
        map((response) => response.places.map((place) => place['place name']))
      );
  }
}
