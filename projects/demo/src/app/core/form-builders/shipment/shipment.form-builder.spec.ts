import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { potentiallyStableFormTestHelper } from '@kbru/form-effects';
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
    let httpTestingControler: HttpTestingController;
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

        httpTestingControler = TestBed.inject(HttpTestingController);
        store$ = TestBed.inject(Store);
        formBuilder = TestBed.inject(ShipmentFormBuilder);
    });

    it('shows the address group on logout', done => {
        potentiallyStableFormTestHelper(formBuilder.build(), {
            setupTest: () => {
                store$.dispatch(userLoggedOut());
            },
        })
            .pipe(first())
            .subscribe(form => {
                expect(form.get('address')?.prop('visible')).toEqual(true);
                done();
            });
    });

    it('hides the address group on login', done => {
        potentiallyStableFormTestHelper(formBuilder.build(), {
            setupTest: () => {
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
            },
        })
            .pipe(first())
            .subscribe(form => {
                expect(form.get('address')?.prop('visible')).toEqual(false);
                done();
            });
    });

    it('loads available cities from the api', done => {
        potentiallyStableFormTestHelper(formBuilder.build(), {
            setupTest: form => {
                form.get('address.zipCode')?.setValue('12435');
                httpTestingControler
                    .expectOne('https://api.zippopotam.us/de/12435')
                    .flush(citiesMock('12435', ['Berlin', 'Foo']));
                expect(form.get('address.city')?.prop('options')).toEqual([
                    'Berlin',
                    'Foo',
                ]);
            },
        })
            .pipe(first())
            .subscribe(form => {
                expect(form.get('address.city')?.prop('options')).toEqual([
                    'Berlin',
                    'Foo',
                ]);
                httpTestingControler.verify();
                done();
            });
    });

    it('disables cities/street when no cities are available', done => {
        potentiallyStableFormTestHelper(formBuilder.build(), {
            setupTest: form => {
                form.get('address.zipCode')?.setValue('12435');
                httpTestingControler
                    .expectOne('https://api.zippopotam.us/de/12435')
                    .flush(citiesMock('12435', []));
            },
        })
            .pipe(first())
            .subscribe(form => {
                expect(form.get('address.city')?.enabled).toEqual(false);
                expect(form.get('address.street')?.enabled).toEqual(false);
                httpTestingControler.verify();
                done();
            });
    });

    it('enables cities/street when cities are available', done => {
        potentiallyStableFormTestHelper(formBuilder.build(), {
            setupTest: form => {
                form.get('address.zipCode')?.setValue('12435');
                httpTestingControler
                    .expectOne('https://api.zippopotam.us/de/12435')
                    .flush(citiesMock('12435', ['B', 'E', 'R', 'L', 'I', 'N']));
            },
        })
            .pipe(first())
            .subscribe(form => {
                expect(form.get('address.city')?.enabled).toEqual(true);
                expect(form.get('address.street')?.enabled).toEqual(true);
                httpTestingControler.verify();
                done();
            });
    });
});
