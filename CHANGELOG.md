# 18.1.0 (2025-03-18)

### Changed

- Remove `@angular/forms` peer dependency. The library now uses its own `Form` interface that is compatible with Angular's `FormGroup` via structural typing.
- Relax RxJS peer dependency from `~7.8.0` to `^7.0.0`.

### Added

- Export `Form` interface for type-safe usage with form-like objects from any source.

# 18.0.0 (2024-09-05)

### Changed

- Increase peer dependency versions:
  - `@angular/forms`: `^18.2.0`,
  - `rxjs`: `~7.8.0`
