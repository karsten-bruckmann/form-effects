import { Observable } from "rxjs";
import { FormGroup } from "@angular/forms";

export type FormEffect<T extends FormGroup> = (
  formGroup: T
) => Observable<void>;
