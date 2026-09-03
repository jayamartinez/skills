---
name: code-structure
description: Use after implementation or meaningful code fixes, before validation or PR preparation, and when asked to clean up changed code. Improve maintainability within the existing project architecture without unrelated refactoring, mechanical DRY, or imposing a new architecture.
---

# Code structure

Ask whether the implementation is clean and understandable. `/validate-change` separately checks whether it appears to work. Apply this pass to the task's changed code and directly affected boundaries.

## Establish context

Read applicable `AGENTS.md`, the task diff, nearby implementation, established architecture and naming conventions, existing helpers/utilities/components/services, and formatter/linter configuration. Preserve other tasks' work and the current task branch. Do not change structure based on a preferred framework or layer model.

## Review the changed code

- Check formatting, style consistency, unclear names, unused imports, dead code, commented experiments, and unnecessary wrappers.
- Look for duplicated business logic, loops, transformations, parsing, validation, filtering/mapping, error handling, and constants. Name magic values when the name explains domain meaning or prevents inconsistency.
- Examine giant functions, React components, and modules for mixed responsibilities; deep nesting; avoidable coupling; unclear state/data flow; misplaced architectural responsibilities; and inconsistent local patterns.
- Consider both missing useful abstractions and unnecessary ones. Prefer focused functions/components/modules, explicit behavior, clear names, existing project patterns, and early returns when they improve readability.

## Make proportionate improvements

Extract genuinely repeated behavior only when it improves readability, consistency, maintainability, testability, correctness, or the cost of future changes. Two tiny similar snippets do not automatically justify a helper. Do not abstract solely to reduce line count, split everything because it is long, or build elaborate generic frameworks.

Keep cleanup connected to the requested change and preserve intended behavior. Do not refactor unrelated code, impose a service layer, rewrite a working architecture without a concrete reason, or add dependencies without justification. If a structural improvement would substantially expand scope, describe it as a follow-up instead of implementing it.

Run the repository's formatter and linter where appropriate, scoped to avoid unrelated churn. Inspect their resulting diff and preserve pre-existing edits. If the repository contains only instructions or documentation, review organization, duplication, terminology, and links rather than inventing application code checks.

## Handoff

Report meaningful structural changes and why they help, any deferred follow-ups, and formatter/linter results. If no structural changes are needed, say so. Use `/validate-change` for relevant behavioral checks after cleanup. This skill does not authorize commits, pushes, PR creation, or merging.
