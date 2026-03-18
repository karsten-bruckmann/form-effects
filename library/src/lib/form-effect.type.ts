import { Observable } from 'rxjs';

import { Form } from './form.interface';

export type FormEffect<T extends Form> = (
  formGroup: T
) => Observable<void>;
