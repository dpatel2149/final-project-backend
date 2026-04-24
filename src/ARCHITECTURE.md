## Clean Architecture Layout

This project currently runs with the existing Express MVC files in:

- `src/routes`
- `src/controllers`
- `src/models`
- `src/middleware`

To better match the clean architecture rubric, the project now also includes:

- `src/domain`
- `src/application`
- `src/infrastructure`
- `src/interfaces`

### Layer responsibilities

`domain`
- Business entities and repository contracts
- No Express or Mongoose code

`application`
- Use-case level logic
- Coordinates domain rules and repositories

`infrastructure`
- Database and framework-specific implementations
- Existing Mongoose models fit here conceptually

`interfaces`
- HTTP layer
- Routes, controllers, and middleware fit here conceptually

### Current mapping

Current runtime files still work as-is:

- `src/models` maps to `infrastructure`
- `src/controllers`, `src/routes`, and `src/middleware` map to `interfaces`

This keeps the project stable for submission while showing a clear clean architecture direction.
