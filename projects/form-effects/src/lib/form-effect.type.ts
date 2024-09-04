import { Observable } from 'rxjs';
import { UntypedFormGroup } from '@angular/forms';

export type FormEffect<T extends UntypedFormGroup> = (
    formGroup: T
) => Observable<void>;
