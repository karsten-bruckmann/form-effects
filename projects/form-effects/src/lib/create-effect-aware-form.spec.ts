import { FormGroup } from '@angular/forms';
import { cold } from 'jest-marbles';
import { NEVER } from 'rxjs';
import { first } from 'rxjs/operators';
import { createEffectAwareForm } from './create-effect-aware-form';

describe('createEffectAwareForm', () => {
    it('merges all effects', () => {
        const effects = [cold('---|', {}), cold('---|', {})];
        const form$ = createEffectAwareForm(
            new FormGroup({}),
            effects.map(effect => () => effect)
        );
        form$.subscribe();
        effects.forEach(effect => expect(effect).toHaveSubscriptions('^--!'));
    });

    it("emits the form even though effects don't emit", async () => {
        const form = await createEffectAwareForm(new FormGroup({}), [
            () => NEVER,
        ])
            .pipe(first())
            .toPromise();
        expect(form).toBeTruthy();
    });
});
