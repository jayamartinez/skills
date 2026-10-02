# Agentic development workflow

Build clean, maintainable software in small logical changes. The developer remains the final decision-maker. Respect the project's architecture, prove changed behavior proportionately, and leave room for hands-on testing before shipping.

## Instruction scope

Use this file as global guidance. Read applicable repository and directory `AGENTS.md` instructions before acting. More specific project instructions supply stack, architecture, commands, design, naming, environment, and data boundaries. They may refine generic defaults, but cannot expand user authorization or override higher-priority instructions.

## Route the work

1. Use `/start-task` before meaningful implementation to establish the task branch or necessary worktree, define concise acceptance criteria, and resume or create lightweight task state.
2. Use `/investigate` for read-only subsystem, architecture, bug, or approach research when the answer is unclear or implementation was not requested.
3. Implement within the existing architecture. For an unknown failure, use `/debug` instead of changing several plausible causes at once.
4. For a substantial feature or refactor whose boundaries or risks warrant it, use `/architecture-review`. Skip it for routine local changes.
5. Use `/code-structure` after implementation or meaningful fixes for local maintainability cleanup without unrelated redesign.
6. Use `/validate-change` to select checks from the actual diff and collect proportional evidence that the current code works. For meaningful visual changes, capture reusable before/after media when practical and use `/before-and-after` when a PR needs that media attached.
7. Stop at **Ready for manual testing.** Report actual checks and evidence, concrete manual steps, unverified areas, assumptions, limitations, and mock-only behavior.
8. Iterate on the same task branch. Repeat affected cleanup and validation; refresh evidence invalidated by later changes.
9. Use `/prepare-pr` only after explicit PR/shipping authorization. After PR creation and CI, use `/review-pr` when asked for an independent review, and `/review-loop` when asked to work the PR through its automated review.
10. Merge only with explicit authorization. PR creation, passing checks, clean review, or “looks good” without a PR request is not merge approval.

`/name` refers to the workflow skill `name`, defined in `name/SKILL.md`, however the host agent invokes skills. Apply relevant skills without requiring the developer to repeat them. Read a selected skill before applying it; if the host has no native skill loading, read its `SKILL.md` directly. If a skill is unavailable, say so and follow these principles without pretending it ran.

Host features do not change this workflow's authority. Permission modes, auto-approved tools, built-in review or commit commands, and similarly named host skills neither grant commit, push, PR, posting, or merge authorization nor replace the checks these skills require.

## Git, concurrency, and cleanup

- Treat `main` as stable. Use one branch per logical task, not per prompt, and keep feedback and normal PR fixes on it.
- A normal clean single-task checkout needs only a task branch. Do not create worktrees mechanically.
- Before editing, inspect status and diffs, branches, worktrees, the relevant remote, and likely overlapping PRs or active tasks when practical. Choose an up-to-date base.
- Use an isolated worktree and separate branch when another agent or task owns the checkout, unrelated dirty work cannot safely coexist, independent tasks must progress concurrently, or review needs isolation from active implementation. Never touch another task's worktree or check out its branch.
- Worktrees do not isolate ports, databases, caches, credentials, or other shared resources. Confirm those belong to the current task before relying on or mutating them.
- Preserve unrelated staged, unstaged, and untracked work. Never reset, overwrite, silently stash, or include it.
- After a PR is merged or closed, remove a task worktree only after confirming it has no unique changes, then prune its local branch and task-state note as appropriate. Do not delete active or uncertain work.
- Never force-push `main`, silently merge into it, or rewrite shared history without authorization.

## Task continuity

For substantial or multi-session work, keep a concise local note at `<git-common-dir>/agent-tasks/<branch>.md`, with each `/` in the branch name replaced by `--`; obtain the common directory with `git rev-parse --git-common-dir`. On resume, also check the legacy `codex-tasks/` location. The note is Git-local infrastructure, not an application file, and must not be committed.

Record the goal, acceptance criteria and must-not-change constraints, branch and base, important decisions, relevant areas, implementation state, validation evidence, developer-reported manual status, limitations, and next step. Update it at meaningful transitions, not after every command. On resume, verify it against Git and the current repository; current state always wins. Remove it after merge/closure or explicit abandonment. Skip it for trivial tasks that will finish in one short session.

## Quality, risk, and evidence

Follow nearby naming, architecture, and data-flow patterns. Prefer focused code and existing utilities. Avoid unrelated refactors, unnecessary dependencies, universal layer models, and speculative frameworks.

Validation must be change-sensitive. Discover the actual stack and repository gates, then consider affected contracts, migrations, dependencies, UI states, concurrency, configuration, and runtime behavior. When the diff touches authentication, authorization, secrets, user input, file or network boundaries, sensitive data, database access, or security configuration, perform a focused security pass. When it touches hot paths, large collections, rendering, I/O, batching, caching, polling, or resource lifecycles, perform a focused performance pass and measure before/after when making a practical performance claim.

Evidence should demonstrate behavior, not merely list passing commands: a reproduction that now succeeds, representative request/response or command/output, browser interaction or screenshot, state transition, log/event, or measured comparison as appropriate. Do not create heavyweight artifacts for trivial changes. Evidence belongs to the current revision; rerun affected evidence after later edits.

## PR size

Keep PRs reviewable. Measure reviewed lines: additions plus deletions against the merge base, excluding lockfiles, generated output, snapshots, and vendored or binary files. Aim for roughly 1,000 lines; treat 2,500 as the point where splitting is expected. This is a default, not a hard gate.

- Plan slices when a task will clearly exceed the target: preparatory refactors, contracts or backend, then UI; feature flags for incomplete behavior; or stacked branches. Each slice should work, pass validation, and be understandable on its own.
- Legitimate exceptions include a repository bootstrap or initial commit, mechanical renames or codemods, generated migrations or clients, dependency or framework upgrades, vendored imports, and tightly coupled changes that cannot be split without shipping broken intermediate states.
- Above 2,500 lines, propose a split first. When an exception applies or the developer chooses one PR, state the reason in the PR description and help the reviewer navigate it (reading order and which parts are mechanical). Never split mechanically just to meet a number.

## Human control and shipping

Implementation and validation normally end before committing, pushing, opening a PR, or merging. Never claim human testing occurred unless the developer reported it.

“Looks good, prepare the PR,” “prep this for PR,” “ship this as a PR,” and equivalent explicit requests authorize sensible commits, push, and PR creation. Earlier explicit authorization also counts. A PR description should contain only useful verification, evidence, unverified items, and concrete risks or limitations. Never invent confidence or risk scores.

Review authorization is read-only unless review-and-fix or external posting was requested. A request for the review loop authorizes fix commits and ordinary pushes to that PR's branch, for at most three rounds, and nothing else. Distinguish Blocking, Important, and Minor findings with evidence. The developer decides whether to merge.
