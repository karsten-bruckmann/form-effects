import { createReducer, on } from '@ngrx/store';
import { UserData } from './user-data.model';
import { userLoggedIn, userLoggedOut } from './user-data.actions';

export const userDataReducer = createReducer<UserData>(
    null,
    on(userLoggedIn, (state, action) => action.userData),
    on(userLoggedOut, () => null)
);
