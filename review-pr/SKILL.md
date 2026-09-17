---
name: review-pr
description: Use when asked to review a PR or proposed branch diff. Perform an independent, review-only pass over behavior, evidence, architecture, and change-sensitive security/performance risks; report findings before substantial fixes unless review-and-fix was requested. Never merge.
---

# Review PR

Review as though you did not author the change. Treat the PR explanation, checks, evidence, and earlier review as claims to verify against the current head, task requirements, and code.

## Establish current context

1. Identify intent, acceptance criteria, applicable `AGENTS.md`, actual head/target, developer-reported manual verification, limitations, and risk triggers.
2. Review the complete target diff plus relevant callers, tests, configuration, contracts, dependencies, and surrounding architecture. Note the reviewed revision and current CI; stale evidence does not validate later commits.
3. Start review-only. Do not edit, autoformat, post external comments, or change dependencies. Run focused non-mutating checks when useful. Use an isolated review worktree when active implementation or another checkout would be disturbed.

## Evaluate what changed

Check behavior, edge cases, regressions, scope, error handling, accessibility, tests, stale mocks/debug code, dependencies, and accidental files. Apply deeper passes only when the diff warrants them:

- architecture: boundaries, dependency direction, state ownership, contracts, persistence, concurrency, failures, observability, and fit with existing patterns;
- security: trust boundaries, attacker-controlled input, authentication/authorization, injection, SSRF, traversal, secrets/logs, crypto, replay, races, privilege, and leakage;
- performance: query/request counts, repeated work, rendering, serialization, scale, batching, payloads, allocations, blocking, leaks, polling, and cache invalidation;
- migrations/contracts/infrastructure: compatibility, rollout/rollback assumptions, consumers, configuration, and destructive behavior.

Trace a plausible trigger and impact for every finding. Distinguish confirmed defects, evidence-backed risks, and open questions. Verify that reported evidence matches the reviewed revision and meaningfully exercises the claim. Do not impose personal architecture, invent criticism, or demand heavyweight proof for trivial changes.

## Present the review

Order actionable findings:

- **Blocking:** unsafe or incorrect core behavior, serious regression, data/security risk, or unmet essential requirement.
- **Important:** material reliability, edge-case, maintainability, accessibility, performance, or test/evidence gap worth resolving before merge.
- **Minor:** localized improvement with limited impact; clearly optional.

For each, give a concise title, file/line when practical, triggering condition, consequence, and focused fix direction. Then report checks, CI/evidence freshness, unverified areas, and review limits. If no actionable findings exist, say so without claiming untested behavior is proven.

Wait before substantial fixes unless review-and-fix was explicitly requested. Review authorization does not permit posting to GitHub. Requested fixes stay on the same PR branch and return through `/code-structure`, `/validate-change`, and authorized `/prepare-pr`. Never merge or treat AI review as developer approval.
