import { ShipmentFormBuilder } from './shipment.form-builder';
import { TestBed } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import { Store, StoreModule } from '@ngrx/store';
import {
    userLoggedIn,
    userLoggedOut,
} from '../../state/user-data/user-data.actions';
import { EffectsModule } from '@ngrx/effects';
import { citiesMock } from '../../api-clients/cities.response';
import { firstValueFrom } from 'rxjs';
import { AppModule } from '../../../app.module';

describe('MyFormBuilder', () => {
    let httpTestingControler: HttpTestingController;
    let store$: Store;

    let form$: ShipmentFormBuilder['form'];

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({}),
                EffectsModule.forRoot([]),
                AppModule,
                HttpClientTestingModule,
            ],
        });

        httpTestingControler = TestBed.inject(HttpTestingController);
        store$ = TestBed.inject(Store);
        const builder = TestBed.inject(ShipmentFormBuilder);
        form$ = builder.form;
    });

    it('shows the address group on logout', async () => {
        const form = await firstValueFrom(form$);
        form$.subscribe();
        store$.dispatch(userLoggedOut());
        expect(form.get('address')?.prop('visible')).toEqual(true);
    });

    it('hides the address group on login', async () => {
        const form = await firstValueFrom(form$);
        form$.subscribe();
        store$.dispatch(
            userLoggedIn({
                userData: {
                    fullName: 'Max Mustermann',
                    zipCode: '12345',
                    city: 'sewfefwef',
                    street: 'Abcdef',
                },
            })
        );
        expect(form.get('address')?.prop('visible')).toEqual(false);
    });

    it('loads available cities from the api', async () => {
        const form = await firstValueFrom(form$);
        form$.subscribe();
        form.get('address.zipCode')?.setValue('12435');
        httpTestingControler
            .expectOne('https://api.zippopotam.us/de/12435')
            .flush(citiesMock('12435', ['Berlin', 'Foo']));
        expect(form.get('address.city')?.prop('options')).toEqual([
            'Berlin',
            'Foo',
        ]);
        httpTestingControler.verify();
    });

    it('disables cities/street when no cities are available', async () => {
        const form = await firstValueFrom(form$);
        form$.subscribe();
        form.get('address.zipCode')?.setValue('12435');
        httpTestingControler
            .expectOne('https://api.zippopotam.us/de/12435')
            .flush(citiesMock('12435', []));
        expect(form.get('address.city')?.enabled).toEqual(false);
        expect(form.get('address.street')?.enabled).toEqual(false);
        httpTestingControler.verify();
    });

    it('enables cities/street when cities are available', async () => {
        const form = await firstValueFrom(form$);
        form$.subscribe();
        form.get('address.zipCode')?.setValue('12435');
        httpTestingControler
            .expectOne('https://api.zippopotam.us/de/12435')
            .flush(citiesMock('12435', ['B', 'E', 'R', 'L', 'I', 'N']));
        expect(form.get('address.city')?.enabled).toEqual(true);
        expect(form.get('address.street')?.enabled).toEqual(true);
        httpTestingControler.verify();
    });
});
