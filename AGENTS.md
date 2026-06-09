# Core-Web Extension Development Guide

## Objective

Build production-ready Core-Web extensions that integrate cleanly with the existing plugin architecture.

Extensions must follow existing framework patterns and avoid modifications to the kernel whenever possible.

---

## Development Workflow

When given an extension task:

1. Read `AGENTS.md`
2. Read `ROADMAP.md`
3. Review similar existing plugins in `lib/plugins/`
4. Create a TODO list
5. Implement the smallest working version
6. Run tests
7. Fix issues
8. Commit and push
9. Continue until the requested functionality is complete

Never stop after generating scaffolding.

A working extension is preferred over a partially completed implementation.

---

## Core Principle

Always extend.

Avoid modifying the kernel unless:

- a framework bug exists,
- an extension point is missing,
- or the user explicitly requests a kernel change.

When a kernel change is required:

1. Implement the extension feature.
2. Add the minimal kernel change required.
3. Document why the kernel change was necessary.

---

## Extension Structure

Every plugin should follow the standard structure:

```text
lib/plugins/<plugin>/
├── bootstrap.php
├── routes.cfg
├── info.cfg
├── docs/
├── Endpoint.php
├── Controller.php
├── Repository.php
├── Model.php
├── Widget.php
├── View/
├── assets/
├── Definition/
└── migrations/
```

Only create files that are actually required.

Do not generate empty files.

---

## Before Writing Code

Review:

- Similar plugins
- Existing repositories
- Existing widgets
- Existing endpoints
- Existing admin pages

Reuse existing patterns whenever possible.

Never invent a new pattern if one already exists in another plugin.

---

## Routing

Routes must be registered through:

```php
routes.cfg
```

Do not hardcode routes.

Do not register routes directly in the kernel.

---

## Menus

Use existing menu locations:

```text
sidebar-main
sidebar-admin
topbar
topnav
developer
```

Do not create new menu systems.

Use Builder menu integration.

---

## Permissions

Always use existing Auth role mechanisms.

Do not create custom authorization systems.

If a new permission is required:

- create a role,
- document it,
- register it properly.

---

## Database

Database schema must be defined through:

```text
Definition/
```

Use:

```php
Schema::compare()
Schema::update()
```

Do not execute raw CREATE TABLE statements during runtime.

---

## Repositories

Database access belongs in repositories.

Avoid database logic inside:

- Controllers
- Endpoints
- Widgets
- Views

Repositories should encapsulate all data operations.

---

## Controllers

Controllers coordinate actions.

Controllers should:

- validate input,
- call repositories/services,
- prepare responses.

Controllers should not contain business logic.

---

## Views

Views are presentation only.

Avoid:

- SQL
- Business logic
- Permission logic

Keep views focused on rendering.

---

## Widgets

Widgets should be reusable.

Before creating a widget:

1. Search for an existing widget.
2. Extend it if appropriate.
3. Create a new widget only when necessary.

---

## Documentation

Every extension must include documentation.

Minimum:

```text
docs/index.md
```

Document:

- Purpose
- Routes
- Permissions
- Configuration
- Usage

---

## Testing

Before committing:

Run:

```bash
php -l <modified files>
vendor/bin/phpunit
git diff --check
```

Fix all failures.

Do not commit broken code.

---

## Git Workflow

After successful implementation:

```bash
git status
git add .
git commit -m "<clear description>"
git push
```

Every completed task must be committed and pushed.

---

## CI Failures

When given CI logs:

Treat:

```text
/home/runner/work/core/core
```

as the current repository.

Find:

1. First meaningful failure
2. Root cause
3. Smallest correct fix

Then:

- test
- commit
- push

---

## Extension Quality Checklist

Before considering a task complete:

- Routes registered
- Permissions implemented
- Repository created
- Views working
- Documentation written
- Tests passing
- Lint passing
- CI-compatible
- Commit pushed

Only then is the extension complete.

---

## Preferred Approach

When unsure:

1. Search existing plugins.
2. Follow the existing pattern.
3. Keep the implementation simple.
4. Avoid kernel modifications.
5. Produce working code before optimization.

Consistency with the rest of Core-Web is more important than introducing a new design.
