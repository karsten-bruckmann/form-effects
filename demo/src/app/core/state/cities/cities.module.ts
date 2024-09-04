import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { Cities } from './cities.model';
import { citiesReducer } from './cities.reducer';
import { EffectsModule } from '@ngrx/effects';
import { loadCitiesEffect } from './cities.effects';

@NgModule({
  imports: [
    StoreModule.forFeature<Cities>('cities', citiesReducer),
    EffectsModule.forFeature([{ loadCitiesEffect }]),
  ],
})
export class CitiesModule {}
