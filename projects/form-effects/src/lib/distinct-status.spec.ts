import { distinctStatus } from './distinct-status';
import { FormControl } from '@angular/forms';
import { cold } from 'jasmine-marbles';
import { timer } from 'rxjs';
import { map } from 'rxjs/operators';

describe('distinctStatus', () => {
  xit('emits the initial valid status', () => {
    expect(distinctStatus(new FormControl('foo'))).toBeObservable(
      cold('v', {
        v: 'VALID',
      })
    );
  });

  xit('emits the initial invalid status', () => {
    expect(
      distinctStatus(
        new FormControl('foo', {
          validators: [
            () => ({
              error: true,
            }),
          ],
        })
      )
    ).toBeObservable(
      cold('i', {
        i: 'INVALID',
      })
    );
  });

  xit('emits the initial pending status', () => {
    expect(
      distinctStatus(
        new FormControl('foo', {
          asyncValidators: [
            async () =>
              timer(1).pipe(
                map(() => ({
                  error: true,
                }))
              ),
          ],
        })
      )
    ).toBeObservable(
      cold('p', {
        p: 'PENDING',
      })
    );
  });

  xit('emits status changes', () => {
    // @TODO
  });
});
