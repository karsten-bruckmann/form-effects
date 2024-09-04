import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { UserData } from './user-data.model';
import { userDataReducer } from './user-data.reducer';

@NgModule({
    imports: [StoreModule.forFeature<UserData>('user-data', userDataReducer)],
})
export class UserDataModule {}
