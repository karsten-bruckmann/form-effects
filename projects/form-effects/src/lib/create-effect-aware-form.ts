import { merge, Observable } from 'rxjs';
import {
    distinctUntilChanged,
    shareReplay
} from 'rxjs/operators';

import { FormGroup } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { FormEffect } from './form-effect.type';

export const createEffectAwareForm = <T extends FormGroup>(
    control: T,
    effects: FormEffect<T>[]
): Observable<T> => {
    return merge(...effects.map(effect => effect(control))).pipe(
        map(() => control),
        startWith(control),
        distinctUntilChanged(() => true),
        shareReplay({ bufferSize: 1, refCount: true })
    );
};
