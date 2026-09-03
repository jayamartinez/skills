---
name: review-pr
description: Use when asked to review a PR or proposed branch diff, including after PR creation and CI. Perform a review-only pass as an independent-minded reviewer, report evidenced findings, and wait before substantial fixes unless review-and-fix was explicitly requested. Do not merge.
---

# Review PR

Review as though you did not author the implementation. Treat the author's explanation and earlier successful checks as claims to verify against the actual code, task requirements, and current evidence.

## Read before judging or editing

1. Identify task intent, acceptance expectations, applicable `AGENTS.md`, and the PR's actual head and target branches. Read developer-reported manual verification and any known limitations.
2. Review the complete diff against the target, not just the latest commit. Inspect relevant surrounding code, callers, tests, configuration, and dependencies to understand behavior. Note the reviewed head revision and current CI results; stale results do not validate later changes.
3. Perform a review-only pass first. Do not modify the implementation, autoformat files, or change dependencies during this pass. Run focused non-mutating checks when useful and safe. If checkout would disturb other work, use an isolated review workspace or inspect the diff without switching.

## Evaluate the change

Look for:

- Incorrect behavior, regressions, missing edge cases, unmet task requirements, scope creep, and accidental unrelated changes.
- Type-safety errors, unclear or incorrect state management, races/concurrency issues, and incomplete error handling.
- Security/privacy problems, meaningful performance regressions, and accessibility regressions.
- Duplicated logic, unnecessary abstractions, missing useful abstractions, architecture inconsistencies, and avoidable coupling relative to the project's patterns.
- Stale mocks, debug code, suspicious dependencies, comments/docs that disagree with behavior, and tests that miss important behavior or merely repeat the implementation.

Trace a plausible trigger and impact for each finding. Distinguish confirmed defects from questions requiring more evidence. Do not invent criticism, enforce personal style over project conventions, or suggest broad redesigns unrelated to the task. Passing CI is evidence, not proof that every behavior is correct.

## Present the review

Order findings by severity:

- **Blocking:** unsafe or incorrect core behavior, serious regressions, data/security risks, or failure to meet an essential requirement; resolve before merge.
- **Important:** material edge-case, reliability, maintainability, accessibility, or test gaps worth addressing before merge.
- **Minor:** localized improvements with limited impact; label optional suggestions clearly.

For each finding, include a useful title, file/line reference when practical, the triggering condition, why it matters, and a focused direction for a fix. Keep evidence and inference distinct. Report checks performed, CI state, unverified areas, and review limitations. If there are no actionable findings, say so plainly without implying untested behavior is proven correct.

Present findings before substantial fixes. Unless review-and-fix was explicitly requested, wait for the developer's direction. Review-only authorization does not include posting comments or submitting an approval on GitHub; return findings in the conversation unless external posting was requested.

## Follow-up fixes

When fixes are requested, keep them on the same PR branch, preserve unrelated work, rerun `/code-structure` if meaningful code changes and `/validate-change` for affected behavior, and describe any manual retesting needed. Use `/prepare-pr` to update the existing PR when committing/pushing the fixes is authorized; do not open a second PR for normal review fixes. If only local fixes were requested, stop at the normal manual-testing checkpoint.

Do not merge, enable auto-merge, or treat an AI review as the developer's approval. Merging requires explicit user authorization.
