# @kbru/form-effects

This library resulted from the wish to get the logic of complex Angular Reactive Forms out of the components. The goal is to have a Reactive Form, that can be tested without any components involved.

A standard reactive `FormGroup` can be converted into an Observable, that (if subscribed to) will trigger all side effects that were provided when creating the form.

# Installation

```bash
npm install @kbru/form-effects
```

# Usage

## Create Form Effects

A `FormEffect` is just a function getting the `FormGroup` and returning an `Observable<void>`. The Effect can then interact with the form (or other data sources).

**Example**

```typescript
let state$ = new BehaviourSubject<any>(null);

// An effect that runs only once
const setInitialValueEffect: FormEffect<FormGroup> = (form) => {
    form.setValue(state$.value);
    return EMPTY;
};

// An effect that interacts with "external" data
const saveOnChangeEffectA: FormEffect<FormGroup> = (form) =>
    form.valueChanges.pipe(
        map((value) => {
            state.next(value);
        })
    );

// Alternative for the above effect. Here, the external data source can
// be mocked for testing.
const saveOnChangeEffectB =
    (state$: BehaviourSubject<any>): FormEffect<FormGroup> =>
    (form) =>
        form.valueChanges.pipe(
            map((value) => {
                state.next(value);
            })
        );
```

**Attention: Be sure not to create infinite Loops** with your Effects ;) If you create an effect based on the valueChanges of a form and set the values inside the effect, this is happens easily!

## Attach Effects to the `FormGroup`

For the effects to run they need to be attached to the `FormGroup`. Use `createEffectAwareForm` (which will return an `Observable<FormGroup>`).

**Example**

```typescript
const form = new FormGroup({
    foo: new FormControl(null),
    // ...
});
const form$ = createEffectAwareForm(form, [effects]);
```

## Subscribing to the form

For the effects to be run, the form returned by `createEffectAwareForm` needs to be subscribed. This can easily be done using the `async`-Pipe inside the Template:

**Example**

```html
<form *ngIf="form$ | async as form" [formGroup]="form">
    <input formControlName="foo" />
</form>
```

## Integration Tests for a form

__TBD__
