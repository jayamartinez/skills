---
name: start-task
description: Use before beginning meaningful implementation in a Git repository, including features, bug fixes, refactors, and maintenance tasks. Establish a safe task branch, preserve existing work, and inspect project conventions. Reuse the branch when continuing the same logical task; do not create branches for read-only questions.
---

# Start task

Establish a safe working environment before implementation. Do not commit or push just because a task has started.

## Inspect before changing anything

1. Read applicable global, repository, and directory `AGENTS.md` instructions. Identify the requested outcome and what is outside scope.
2. Confirm the repository root and relevant remote. Inspect `git status --short --branch`, the current branch, staged and unstaged diffs, and untracked files. Do not print secret contents while inspecting local files.
3. Inspect relevant local/remote branches and `git worktree list`. When practical, check open PRs and known active tasks for overlapping files or branch ownership. Do not assume a dirty file belongs to this task.
4. Fetch the relevant remote when appropriate, without merging or rewriting the checkout. If fetch is unavailable, disclose that the base could not be refreshed; use a known local base only when sensible and report its freshness limitation.

## Choose the branch and workspace

- Continue the existing task branch for feedback, iterations, and normal PR fixes. One branch represents one logical change, not one prompt.
- For new work, choose an appropriate up-to-date base: normally the fetched `origin/main`, or the project's designated target. Inspect divergence before changing an existing branch; do not automatically rebase someone else's work.
- Never begin meaningful implementation on `main`. Use `feat/<short-name>`, `fix/<short-name>`, `refactor/<short-name>`, `chore/<short-name>`, or `docs/<short-name>` as appropriate. Honor a user-specified name. Inspect a name collision before reusing a branch; do not assume it is yours.
- In a clean single-task checkout, create or switch to the task branch normally. Avoid unnecessary worktrees.
- If another active task owns the checkout, or unrelated changes would be mixed into the new task, prefer a separate worktree on a separate branch. Never check out a branch already in use elsewhere or alter another task's worktree.
- Preserve staged, unstaged, and untracked work. Do not reset, overwrite, delete, silently stash, or sweep unrelated changes into the task. If needed work cannot be separated safely, explain the specific overlap and ask only for the missing decision.
- If the repository has no commits, identify that explicitly. Create the task branch before writing files; establish any necessary empty PR base transparently as part of an authorized bootstrap, without putting implementation on `main`.

## Understand the implementation

Read the relevant entry points, nearby code and tests, existing helpers/components/services, architecture, naming, dependency choices, and validation configuration. Trace enough of the behavior to understand where the change belongs. Reuse established patterns and keep the scope narrow; report unrelated problems separately.

Before editing, briefly state the branch/worktree selected, scope, and any existing-work or base-freshness constraints. Then proceed with implementation. Afterward use `/code-structure` and `/validate-change`; the default handoff is manual testing, not shipping.
