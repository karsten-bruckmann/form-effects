import { createFeatureSelector } from '@ngrx/store';
import { UserData } from './user-data.model';

export const userDataSelector = createFeatureSelector<UserData>('user-data');
