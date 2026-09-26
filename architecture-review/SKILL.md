---
name: architecture-review
description: Use for architecture-level review of substantial features or refactors when module boundaries, contracts, state ownership, persistence, concurrency, security, or failure handling materially affect the design. Skip routine local changes and do not impose a preferred architecture.
---

# Architecture review

Evaluate whether a substantial change fits the project's existing architecture and risk profile. This is not a mandatory gate for ordinary work and not a license to redesign unrelated code. `/code-structure` separately handles local maintainability.

## Establish context

Read applicable agent instructions (`AGENTS.md`, `CLAUDE.md`, or equivalent), acceptance criteria, relevant architecture documentation, the proposed or actual diff, surrounding modules and callers, tests, configuration, and existing patterns. Identify the current architecture before judging the change.

## Review proportionately

Examine only concerns affected by the change:

- module boundaries, dependency direction, coupling, and reuse of existing abstractions;
- ownership and lifecycle of state, persistence, caches, and external resources;
- API/event/schema contracts, compatibility, and migration boundaries;
- concurrency, ordering, retries, idempotency, transactions, and race assumptions;
- error classification, recovery, partial failure, and observability;
- authentication, authorization, sensitive data, and other trust boundaries;
- operational and performance characteristics that influence the design.

Trace concrete flows. Distinguish existing debt from problems introduced or exposed by the change. Prefer the smallest design adjustment that satisfies requirements and project conventions. Do not prescribe a service layer, new framework, or theoretical ideal without a demonstrated need.

## Report or refine

Lead with actionable findings ordered by impact, each with evidence, trigger, consequence, and focused direction. Then note sound decisions, unresolved questions, and validation implications. If reviewing before implementation, produce a concise recommended shape and explicit tradeoffs. If no architecture-level change is needed, say so and avoid manufacturing work.

Review-only requests do not authorize edits. When implementation is already authorized, make only in-scope design corrections and route changed code through `/code-structure` and `/validate-change`.
