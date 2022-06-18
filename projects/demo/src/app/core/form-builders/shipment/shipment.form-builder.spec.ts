import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
    potentiallyStableFormTestHelper,
    potentiallyStableFormTestHelperAsync,
} from '@kbru/form-effects';
import { EffectsModule } from '@ngrx/effects';
import { Store, StoreModule } from '@ngrx/store';
import { first } from 'rxjs/operators';
import { AppModule } from '../../../app.module';
import { citiesMock } from '../../api-clients/cities.response';
import {
    userLoggedIn,
    userLoggedOut,
} from '../../state/user-data/user-data.actions';
import { ShipmentFormBuilder } from './shipment.form-builder';

describe('ShipmentFormBuilder', () => {
    let httpTestingController: HttpTestingController;
    let store$: Store;
    let formBuilder: ShipmentFormBuilder;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                StoreModule.forRoot({}),
                EffectsModule.forRoot([]),
                AppModule,
                HttpClientTestingModule,
            ],
        });

        httpTestingController = TestBed.inject(HttpTestingController);
        store$ = TestBed.inject(Store);
        formBuilder = TestBed.inject(ShipmentFormBuilder);
    });

    it('shows the address group on logout', done => {
        // You can either use `potentiallyStableFormTestHelper` which returns an
        // `Observable` or (see other tests) `potentiallyStableFormTestHelperAsync`
        // which returns a `Promise`
        potentiallyStableFormTestHelper(formBuilder.build(), {
            // `setupTest`-callback is the place to setup the form for the
            // test. Here you assign values, set your application state, etc.
            setupTest: () => {
                store$.dispatch(userLoggedOut());
            },
            // The helper will emit the form, when value and status of the form didn't
            // change for `maxEffectsDuration` (in milliseconds). Given an effect, that only
            // runs after a while, you'll need to increase this value. But keep in mind, that
            // this will affect the time, the test will take to be executed (the helper will
            // always have to wait at least this time to know, the value/status didn't change).
            // Also have your test framework's timeouts in mind! In most cases, the best will
            // be to keep this at default (1) and make sure everything that makes the effects
            // asynchronous is properly mocked (like HTTP requests).
            maxEffectsDuration: 1,
        })
            .pipe(first())
            .subscribe(form => {
                // The form will be emitted as soon as the form is "stable". That means,
                // the form value and status didn't change any more..
                expect(form.get('address')?.prop('visible')).toEqual(true);
                done();
            });
    });

    it('hides the address group on login (b)', async () => {
        const form = await potentiallyStableFormTestHelperAsync(
            formBuilder.build(),
            {
                setupTest: () => {
                    store$.dispatch(
                        userLoggedIn({
                            userData: {
                                fullName: 'Max Mustermann',
                                zipCode: '12345',
                                city: 'Some Street',
                                street: 'Abcdef',
                            },
                        })
                    );
                },
            }
        );

        expect(form.get('address')?.prop('visible')).toEqual(false);
    });

    it('loads available cities from the api', async () => {
        const form = await potentiallyStableFormTestHelperAsync(
            formBuilder.build(),
            {
                setupTest: form => {
                    form.get('address.zipCode')?.setValue('12435');
                    httpTestingController
                        .expectOne('https://api.zippopotam.us/de/12435')
                        .flush(citiesMock('12435', ['Berlin', 'Foo']));
                    expect(form.get('address.city')?.prop('options')).toEqual([
                        'Berlin',
                        'Foo',
                    ]);
                },
            }
        );
        expect(form.get('address.city')?.prop('options')).toEqual([
            'Berlin',
            'Foo',
        ]);
        httpTestingController.verify();
    });

    it('disables cities/street when no cities are available', async () => {
        const form = await potentiallyStableFormTestHelperAsync(
            formBuilder.build(),
            {
                setupTest: form => {
                    form.get('address.zipCode')?.setValue('12435');
                    httpTestingController
                        .expectOne('https://api.zippopotam.us/de/12435')
                        .flush(citiesMock('12435', []));
                },
            }
        );
        expect(form.get('address.city')?.enabled).toEqual(false);
        expect(form.get('address.street')?.enabled).toEqual(false);
        httpTestingController.verify();
    });

    it('enables cities/street when cities are available', async () => {
        const form = await potentiallyStableFormTestHelperAsync(
            formBuilder.build(),
            {
                setupTest: form => {
                    form.get('address.zipCode')?.setValue('12435');
                    httpTestingController
                        .expectOne('https://api.zippopotam.us/de/12435')
                        .flush(
                            citiesMock('12435', ['B', 'E', 'R', 'L', 'I', 'N'])
                        );
                },
            }
        );
        expect(form.get('address.city')?.enabled).toEqual(true);
        expect(form.get('address.street')?.enabled).toEqual(true);
        httpTestingController.verify();
    });
});
