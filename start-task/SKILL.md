---
name: start-task
description: Use before beginning or resuming meaningful implementation in a Git repository. Establish a safe task branch or necessary worktree, preserve existing work, define concise acceptance criteria, and maintain lightweight local task state. Do not use for read-only research.
---

# Start task

Establish a safe working environment and shared definition of success. Do not commit or push merely because a task started.

## Inspect before changing anything

1. Read applicable global, repository, and directory `AGENTS.md` instructions. Identify the requested outcome and what is outside scope.
2. Confirm the repository root and relevant remote. Inspect `git status --short --branch`, the current branch, staged and unstaged diffs, and untracked files. Do not print secret contents while inspecting local files.
3. Inspect relevant local/remote branches and `git worktree list`. When practical, check open PRs and known active tasks for overlapping files or branch ownership. Do not assume a dirty file or checkout belongs to this task.
4. Fetch the relevant remote when appropriate, without merging or rewriting the checkout. If fetch is unavailable, disclose that the base could not be refreshed; use a known local base only when sensible and report its freshness limitation.

## Choose the branch and workspace

- Continue the existing task branch for feedback, iterations, and normal PR fixes. One branch represents one logical change, not one prompt.
- For new work, choose an appropriate up-to-date base: normally the fetched `origin/main`, or the project's designated target. Inspect divergence before changing an existing branch; do not automatically rebase someone else's work.
- Never begin meaningful implementation on `main`. Use `feat/<short-name>`, `fix/<short-name>`, `refactor/<short-name>`, `chore/<short-name>`, or `docs/<short-name>` as appropriate. Honor a user-specified name. Inspect a name collision before reusing a branch; do not assume it is yours.
- In a clean single-task checkout, create or switch to the task branch normally. Avoid unnecessary worktrees.
- Use a separate worktree and branch when another agent/task owns the checkout, unrelated dirty work cannot safely coexist, independent tasks must progress concurrently, or isolation is needed for review. Before creating one, inspect existing worktrees and branches, likely overlapping PRs/tasks, and base freshness. Avoid name and branch collisions. Never alter another task's worktree.
- Worktrees do not isolate shared ports, databases, caches, credentials, or services. Identify task-owned resources before mutating them.
- Preserve staged, unstaged, and untracked work. Do not reset, overwrite, delete, silently stash, or sweep unrelated changes into the task. If needed work cannot be separated safely, explain the specific overlap and ask only for the missing decision.
- If the repository has no commits, identify that explicitly. Create the task branch before writing files; establish any necessary empty PR base transparently as part of an authorized bootstrap, without putting implementation on `main`.

After a PR is merged or closed, remove a task worktree only after confirming it has no unique changes, then prune the local branch and task-state note when appropriate. Never clean up uncertain or active work.

## Define success and understand the implementation

Read the relevant entry points, nearby code and tests, existing helpers/components/services, architecture, naming, dependency choices, and validation configuration. Trace enough of the behavior to understand where the change belongs. Reuse established patterns and keep the scope narrow; report unrelated problems separately.

For meaningful work, derive a short set of observable acceptance criteria, what must not change, and important assumptions. Do not impose a planning ceremony on an obvious one-line edit. If ambiguity would materially change product behavior, ask for the missing decision; otherwise make and state a reasonable assumption.

If the approach or current behavior remains unclear, use `/investigate` before editing. For an unknown failure, use `/debug`.

## Preserve task continuity

For substantial or multi-session work, create or resume `<git-common-dir>/codex-tasks/<branch>.md`, where the common directory comes from `git rev-parse --git-common-dir`. Use a filesystem-safe representation of a branch containing `/` (for example, matching subdirectories or replacing `/` with `--`) consistently.

Keep only goal, acceptance criteria and must-not-change constraints, branch/base, important decisions, relevant areas, implementation state, validation and developer-reported manual status, limitations, and next step. Verify the note against Git and current files on every resume; it is a hint, never authority. Update it at meaningful transitions, not after every command. It must remain untracked and should be removed after merge/closure or explicit abandonment. Skip it for trivial single-session work.

Before editing, briefly state the selected branch/worktree, acceptance criteria, and existing-work or base-freshness constraints. Then proceed. After implementation use `/code-structure` and `/validate-change`; the default handoff is manual testing, not shipping.
