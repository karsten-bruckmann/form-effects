import { merge, Observable } from 'rxjs';
import { FormEffect } from './form-effect.type';
import { FormGroup } from '@angular/forms';
import { map, share, startWith } from 'rxjs/operators';

export const createEffectAwareForm = <T extends FormGroup>(
  control: T,
  effects: FormEffect<T>[]
): Observable<T> => {
  return merge(...effects.map((effect) => effect(control))).pipe(
    share(),
    map(() => control),
    startWith(control)
  );
};
