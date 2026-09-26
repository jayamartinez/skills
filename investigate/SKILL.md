---
name: investigate
description: Use for read-only research into a subsystem, architecture question, or implementation approach before deciding what to change. Trace evidence and produce a concise plan; use debug instead for reproducing and finding the root cause of an active failure.
---

# Investigate

Answer the question without editing application files or changing external state. Read-only commands, tests that do not mutate meaningful state, and temporary analysis outside the repository are allowed. A reported bug may be scoped here when the request is to understand the surrounding subsystem or plan an approach; use `/debug` when the goal is reproduction and root cause. If implementation is requested later, hand the findings to `/start-task`.

## Establish the question

State the question, requested depth, and relevant constraints. Read applicable agent instructions (`AGENTS.md`, `CLAUDE.md`, or equivalent). Do not create a task branch solely for research unless repository policy requires one.

## Trace the system

- Find relevant entry points, callers, data/control flow, state ownership, configuration, and external boundaries.
- Read nearby tests, fixtures, types/contracts, existing abstractions, utilities, and error handling.
- Use Git history only when it can answer a concrete question such as why an invariant exists or when behavior changed; do not browse history ceremonially.
- Identify invariants, likely affected boundaries, and what must remain compatible.
- Prefer direct evidence from code, tests, configuration, logs, or reproducible observations. Label deductions as hypotheses and record material unknowns.

Stay proportional. Stop tracing when additional files no longer change the answer or plan.

## Report

Return:

- the concise answer or current model of the system;
- evidence with useful file/line references;
- facts, hypotheses, and unknowns kept distinct;
- relevant invariants, existing utilities, and affected boundaries;
- a short implementation or debugging plan when requested;
- risks or decisions that genuinely require developer input.

Do not modify code, create commits, push, open a PR, or turn a research request into implementation.
