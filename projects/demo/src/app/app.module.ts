import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ShipmentComponent } from './presentation/shipment/shipment.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ShipmentDataModule } from './core/state/shipment-data/shipment-data.module';
import { CitiesModule } from './core/state/cities/cities.module';
import { UserDataModule } from './core/state/user-data/user-data.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [AppComponent, ShipmentComponent],
    imports: [
        StoreModule.forRoot({}),
        EffectsModule.forRoot(),
        StoreDevtoolsModule.instrument({ maxAge: 50 }),
        HttpClientModule,
        BrowserModule,
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            {
                path: '',
                component: ShipmentComponent,
            },
        ]),
        ShipmentDataModule,
        UserDataModule,
        CitiesModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
