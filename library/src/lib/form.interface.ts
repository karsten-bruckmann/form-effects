import { Observable } from 'rxjs';

/**
 * Minimal interface compatible with Angular's FormGroup.
 * Allows the library to work without @angular/forms dependency.
 */
export interface Form {
  value: unknown;
  status: string;
  valueChanges: Observable<unknown>;
  statusChanges: Observable<string>;
}
