import { combineLatest, Observable } from 'rxjs';
import { debounceTime, mapTo, startWith, switchMap, tap } from 'rxjs/operators';

export const potentiallyStableFormTestHelper = <
    T extends {
        valueChanges: Observable<any>;
        statusChanges: Observable<any>;
        value: any;
        status: any;
    }
>(
    form$: Observable<T>,
    options: {
        setupTest?: (form: T) => void;
        maxEffectsDuration?: number;
    } = {}
): Observable<T> => {
    const setupTest = options.setupTest || (() => {});
    const maxEffectsDuration = options.maxEffectsDuration || 1;
    let initialized = false;
    return form$.pipe(
        tap(form => {
            if (initialized) {
                return;
            }
            initialized = true;
            setTimeout(() => {
                setupTest(form);
            });
        }),
        switchMap(form =>
            combineLatest([
                form.valueChanges.pipe(startWith(form.value)),
                form.statusChanges.pipe(startWith(form.status)),
            ]).pipe(debounceTime(maxEffectsDuration), mapTo(form))
        )
    );
};
