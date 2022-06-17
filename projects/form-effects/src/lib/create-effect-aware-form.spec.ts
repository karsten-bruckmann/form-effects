import { FormGroup } from '@angular/forms';
import { cold } from 'jasmine-marbles';
import { NEVER, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { createEffectAwareForm } from './create-effect-aware-form';

function firstValueFrom<T>(obs$: Observable<T>): Promise<T> {
    return obs$.pipe(first()).toPromise();
}

xdescribe('createEffectAwareForm', () => {
    it('merges all effects', () => {
        const effects = [cold('---|', {}), cold('---|', {})];
        const form$ = createEffectAwareForm(
            new FormGroup({}),
            effects.map((effect) => () => effect)
        );
        form$.subscribe();
        effects.forEach((effect) => expect(effect).toHaveSubscriptions('^--!'));
    });

    it('emits the form even though effects don\'t emit', async () => {
        const form = await firstValueFrom(
            createEffectAwareForm(new FormGroup({}), [() => NEVER])
        );
        expect(form).toBeTruthy();
    });
});

