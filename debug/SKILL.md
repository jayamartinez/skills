---
name: debug
description: Use to diagnose an unknown bug, regression, flaky behavior, or operational failure through systematic reproduction and hypothesis testing, then implement the smallest appropriate fix when authorized. Do not use for a known mechanical change or read-only architecture research.
---

# Debug

Find and prove the root cause before broad repair. A request to “figure out why” is read-only unless it also asks to fix; preserve that boundary. Use `/start-task` before editing.

## Reproduce and narrow

1. Define the expected and observed behavior, environment, inputs, frequency, and impact. Reproduce the failure before editing when practical and safe; record the exact signal.
2. Reduce the failing path by tracing entry points, state transitions, callers, configuration, logs, tests, and recent relevant changes. Preserve useful diagnostics.
3. Form a small ranked set of falsifiable hypotheses. For each, state the observation that would support or reject it.
4. Gather the cheapest discriminating evidence first. Add narrowly scoped temporary instrumentation only when existing evidence is insufficient.

Do not change several plausible causes simultaneously. If reproduction is unsafe or unavailable, say what evidence substitutes for it and keep conclusions appropriately qualified.

## Prove and fix

Identify the root cause from evidence, including the mechanism connecting trigger to failure. When a fix is authorized, implement the smallest change that addresses that mechanism without hiding symptoms or weakening checks. Add regression coverage when it protects meaningful behavior.

Rerun the original reproduction and relevant surrounding checks. Remove temporary instrumentation before completion unless it has clear ongoing observability value; inspect the diff to confirm.

Use `/code-structure` after meaningful edits and `/validate-change` for current-code evidence and readiness. Report reproduction, narrowing evidence, rejected hypotheses when useful, root cause, fix, regression coverage, after-fix result, and remaining uncertainty.
