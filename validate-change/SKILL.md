---
name: validate-change
description: Use after implementation, cleanup, or fixes to verify current behavior with diff-sensitive checks and proportional runtime evidence, and during authorized PR preparation. Includes conditional security and performance review. Does not authorize shipping or merge.
---

# Validate change

Answer “Does the current change actually appear to work?” Passing commands are evidence, not the whole answer. `/code-structure` separately assesses local maintainability.

## Read the diff and choose checks

Read applicable agent instructions (`AGENTS.md`, `CLAUDE.md`, or equivalent), acceptance criteria, task state, the complete diff and untracked task files, surrounding behavior, repository scripts, CI, and stack conventions. Use documented tools and package managers; do not assume JavaScript or invent missing commands.

Choose checks proportional to behavior and risk. Include normal gates such as format, lint, static types, targeted tests, build, startup, and smoke testing when applicable, then add diff-triggered checks:

- dependencies/manifests/lockfiles: consistency, install/build impact, provenance, and unexpected additions;
- database/schema/migrations: forward behavior, compatibility or rollback where supported, and data safety;
- UI: targeted interaction plus relevant loading, empty, error, responsive, and accessibility states;
- APIs/schemas/events: representative exchanges, validation, compatibility, and consumers;
- concurrency/state: ordering, retries, races, idempotency, transactions, and observable transitions;
- infrastructure/config: syntax, environment assumptions, secret handling, and deploy sanity where practical;
- security-sensitive boundaries: attacker-controlled input, authentication versus authorization, injection, SSRF, traversal, secret/log exposure, unsafe defaults, replay, races, privilege escalation, and data leakage as relevant;
- performance-sensitive paths: representative scale, request/query counts, batching, rendering, payloads, allocations, blocking work, resource lifecycle, caching and invalidation. Measure before/after when making a practical performance claim.

Apply only relevant bullets. Do not run a generic security or performance audit on unrelated prose or CSS.

## Collect behavioral evidence

Select the lightest evidence that demonstrates the changed behavior:

- bug fix: reproduce before when practical, then show the same case succeeds and add regression coverage when valuable;
- UI: targeted browser interaction, screenshot/recording, or Playwright result;
- API: representative request/response and contract behavior;
- CLI/backend: representative command/output or input/output pair;
- distributed/stateful flow: relevant logs, events, records, or state transitions;
- performance claim: comparable before/after measurement.

For meaningful visible changes, preserve useful before and after media for `/before-and-after` during PR preparation. Use after-only evidence for net-new UI. Do not upload or publish sensitive/private media during validation.

Evidence must correspond to the current code and environment. Rerun affected evidence after later edits, synchronization, conflict resolution, or meaningful configuration changes. Skip heavyweight artifacts when they add little review value.

## Execute and investigate

1. Run selected checks and record their command/scope and exact status: **passed**, **failed**, **blocked**, **not run**, or **not applicable**. Missing tooling or environment is not a pass.
2. Investigate failures enough to distinguish task regressions, pre-existing failures, and environment problems. Label uncertainty. Fix in-scope regressions and rerun affected checks; never weaken checks to obtain a pass.
3. Start and exercise the application when runtime behavior matters and the environment supports it. State mock/live-data and environment limits. Automated browser evidence does not equal human testing.
4. Inspect the complete target diff and working state for unrelated changes, debug instrumentation, credentials, generated/local files, stale mocks, accidental dependencies, and incomplete behavior. Preserve unrelated work rather than deleting it.

## Report and stop

Report changed behavior, checks with exact outcomes, runtime evidence, failed or blocked items, unverified areas, assumptions, limitations, and concrete manual steps with expected results and important edge cases. Distinguish automated evidence from developer-reported manual testing.

When relevant checks and evidence pass, end with **Ready for manual testing.** Otherwise end with **Not ready: validation failed or is incomplete** and identify the blocker. Update substantial task state with current validation and next step.

Do not commit, push, create a PR, publish evidence, or merge. If called by `/prepare-pr` under explicit shipping authorization, return results to that caller.
