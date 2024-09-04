import { FormGroup } from '@angular/forms';
import { combineLatest, firstValueFrom, Observable } from 'rxjs';
import {
  debounceTime,
  first,
  mapTo,
  startWith,
  switchMap,
  tap,
} from 'rxjs/operators';

interface Options<T> {
  /** Callback that will be used to setup the form. Assign values here, update your state, etc. */
  setupTest?: (form: T) => void;
  /** Time (milliseconds) until the form is considered stable, when no more changes occurred. Defaults to 1 */
  maxEffectsDuration?: number;
}

/**
 * Returns an Observable that emits the form when it is "potentially stable". That means,
 * the value and the status didn't change any more.
 *
 * @param form$ The form you want to test
 * @param options
 */
export const potentiallyStableFormTestHelper = <T extends FormGroup>(
  form$: Observable<T>,
  options: Options<T> = {}
): Observable<T> => {
  const setupTest = options.setupTest || (() => {});
  const maxEffectsDuration = options.maxEffectsDuration || 1;
  let initialized = false;
  return form$.pipe(
    tap((form) => {
      if (initialized) {
        return;
      }
      initialized = true;
      setTimeout(() => {
        setupTest(form);
      });
    }),
    switchMap((form) =>
      combineLatest([
        form.valueChanges.pipe(startWith(form.value)),
        form.statusChanges.pipe(startWith(form.status)),
      ]).pipe(debounceTime(maxEffectsDuration), mapTo(form))
    )
  );
};

/**
 * Returns a Promise of the form that resolves when it is "potentially stable". That means,
 * the value and the status didn't change any more.
 *
 * @param form$ The form you want to test
 * @param options
 */
export const potentiallyStableFormTestHelperAsync = <T extends FormGroup>(
  form$: Observable<T>,
  options: Options<T> = {}
): Promise<T> =>
  firstValueFrom(potentiallyStableFormTestHelper(form$, options).pipe(first()));
