import { AbstractControl } from '@angular/forms';
import { merge, of } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

/**
 * Returns an Observable of the value of control starting with the current
 * value. It will only emit when the values in the form were really changed,
 * preventing emits, when the form.setValue was called without actuelly
 * changing the value
 */
export const distinctValue = (control: AbstractControl) =>
  merge(of(control.value), control.valueChanges).pipe(
    distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
  );
