import { createAction, props } from '@ngrx/store';
import { UserData } from './user-data.model';

export const userLoggedIn = createAction(
    'userLoggedIn',
    props<{ userData: UserData }>()
);

export const userLoggedOut = createAction('userLoggedOut');
