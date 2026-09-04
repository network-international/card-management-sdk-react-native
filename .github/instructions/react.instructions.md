---
description: "Use when creating or editing React Native TypeScript components, hooks, and related UI logic. Prefer maintainable patterns for readability, reusability, and testability."
name: "React Native TypeScript Best Practices"
applyTo:
  - "src/**/*.ts"
  - "src/**/*.tsx"
  - "example/src/**/*.ts"
  - "example/src/**/*.tsx"
---
# React Native TypeScript Best Practices

Treat these as best-effort preferences, not strict blockers.

Do not apply these preferences to generated files or lib output folders.

- Prefer functional components with clearly typed props.
- Keep component files render-focused: move non-UI logic to hooks or utilities when the render path becomes hard to scan.
- Prefer explicit and narrow prop types: avoid overly broad any/unknown unless guarded and intentional.
- Keep hooks predictable: one responsibility per hook, clear input/output shape, and stable naming.
- Keep useEffect side effects explicit and dependency-complete; avoid effect logic that mixes unrelated concerns.
- Separate server/stateful orchestration from presentational components when practical.
- Define clear state management boundaries: local UI state in component/hook, shared domain state in dedicated state modules.
- Organize files by feature cohesion: colocate feature-specific code, extract shared code only after real reuse.
- Favor small reusable utilities for transformations instead of embedding complex logic in components/hooks.
- Follow existing project conventions first when they differ from generic guidance.
