---
name: prepare-pr
description: Use only when the user explicitly requests PR preparation or shipping. Perform final cleanup and current-code validation, create sensible commits, push the task branch, and open or update its PR with concise evidence and verification. Never merge.
---

# Prepare PR

Prepare a logical change for human review. Explicit PR/shipping authorization permits sensible commits, push, and PR creation; it does not permit merge. A bare “looks good” or successful checks alone is insufficient.

Record only manual testing the developer actually reported. If shipping was explicitly requested before testing, proceed and mark manual verification pending. If shipping has not been authorized, do useful read-only preparation at most and return to the manual-testing checkpoint.

## Final preparation

1. Read applicable `AGENTS.md`, acceptance criteria, and task state. Confirm repository, remote, owned task branch, target, and any existing PR. Do not operate in another task's checkout or commit implementation on `main`.
2. Inspect status, complete target diff, branch commits, and relevant untracked files. Include only intended work; exclude unrelated, local, generated, debug, or secret-bearing files.
3. Fetch the remote and assess target/head changes, concurrent work, and overlap. Synchronize safely using project conventions; do not rewrite shared history. Resolve conflicts by understanding both sides, or request a genuine product/ownership decision.
4. Use `/code-structure` when appropriate, then `/validate-change`. Rerun affected checks and evidence after synchronization, conflicts, or later edits. Do not ship known task regressions. Identify manual behavior invalidated by code changes.
5. For meaningful visual changes, reuse validated media and apply `/before-and-after` after the PR exists. Do not block backend or trivial/invisible changes for lack of screenshots, and never publish sensitive captures.

## Commit, push, and open

- Stage only reviewed task files or hunks and inspect the staged diff. Preserve unrelated staged work; isolate if it cannot be separated safely.
- Create one or a few logical commits with concise messages. Honor hooks and do not bypass required gates.
- Push the owned task branch to the verified remote. If the remote changed, inspect before retrying; never overwrite another agent's commits.
- Open or update the task PR against `main` or the designated target. Verify its URL, head, and base. If access fails, report precisely which stage succeeded.

## PR description

Lead with the problem and resulting behavior. Include only sections that carry useful information:

- **Summary / Changes** for the final behavior and approach;
- **Verification** for actual lint, types, tests, build, runtime smoke, and developer-reported manual checks;
- **Evidence** for representative behavioral proof or a before/after block;
- **Not verified** for meaningful gaps;
- **Risks / limitations** for concrete concerns such as schema/data migration, security boundaries, concurrency, public contracts, destructive behavior, major dependencies, or infrastructure.

Do not dump empty template sections, local paths, secrets, raw task notes, invented testing, or subjective risk scores. Keep automated and manual results distinct. Use the vendored visual skill's marker block without rewriting unrelated PR prose.

Return the PR URL, branch, commits, push status, validation/evidence and manual-testing status, available CI state, and remaining limitations. Clean up task state or worktrees only after merge/closure under the documented safety checks. Never merge or enable auto-merge without explicit authorization.
