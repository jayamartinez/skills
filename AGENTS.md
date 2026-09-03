# Development workflow

Build clean, maintainable software in small logical changes. The developer remains the final decision-maker. Respect the existing architecture, validate the work, and leave room for hands-on testing before shipping.

## Instruction scope

Use this file as global guidance. Read applicable repository and directory `AGENTS.md` instructions before editing. Project instructions supplement this workflow with stack details, architecture, commands, design systems, naming and directory conventions, backend assumptions, and mock/live-data boundaries. More specific project instructions take precedence when they legitimately conflict with generic guidance; they do not override higher-priority instructions or expand the user's authorization.

## Default lifecycle

1. Use `/start-task` before meaningful implementation: inspect the repository, establish the task branch, and understand nearby code.
2. Implement the requested change within the existing architecture.
3. Use `/code-structure` to review and clean up the changed code without expanding scope.
4. Use `/validate-change` to run repository-appropriate automated checks and inspect the complete diff.
5. Stop at **Ready for manual testing.** Explain what changed, checks and results, concrete manual test steps, unverified areas, assumptions, limitations, and any mock-only or incomplete behavior.
6. Iterate on the same branch from the developer's feedback. Repeat `/code-structure` after meaningful code changes and `/validate-change` after fixes.
7. Use `/prepare-pr` when explicitly asked to prepare or ship a PR. Perform final review and validation, commit, push the task branch, and open a PR into `main` (or the explicitly designated target).
8. After PR creation and CI, use `/review-pr` when asked to review. Start with a review-only pass and report findings before substantial fixes, unless review-and-fix was requested.
9. The developer decides whether to merge. Merge only with explicit authorization; PR creation, passing CI, and a clean review are not merge approval.

Apply the relevant skills without requiring the developer to repeat their contents. The slash names above are workflow shorthand; use the host's skill selector or `$start-task`, `$code-structure`, `$validate-change`, `$prepare-pr`, and `$review-pr` where required. Read the selected skill before applying it. If unavailable, report that briefly and follow these workflow principles without pretending to have invoked it.

## Git and concurrent work

- Treat `main` as stable. Do meaningful implementation on one branch per logical change, not one branch per prompt. Keep feedback and normal PR fixes on that branch.
- Prefer `feat/<short-name>`, `fix/<short-name>`, `refactor/<short-name>`, `chore/<short-name>`, or `docs/<short-name>`. Avoid arbitrary IDs unless needed to disambiguate.
- Before editing, inspect the current branch, staged/unstaged/untracked work, relevant branches, worktrees, and likely overlapping tasks when practical. Fetch the relevant remote when appropriate and choose an up-to-date base for new work.
- Preserve user work and other tasks' changes. Do not discard, reset, overwrite, silently stash, or include unrelated work. Use isolated branches/worktrees when concurrency or a dirty shared checkout requires them; do not create worktrees for every simple task.
- Never force-push `main`, silently merge into it, or rewrite shared history without authorization. Do not make experimental commits or push unfinished work merely because a turn ends.

## Quality and validation

Follow nearby naming, formatting, architecture, and data-flow patterns. Prefer focused functions/components, clear names, existing utilities, and explicit behavior. Extract repeated behavior when it improves correctness, readability, maintainability, testability, or future changes; do not blindly apply DRY or abstract tiny similarities.

Avoid unrelated refactors, unnecessary dependencies, architectural rewrites, and generic frameworks for simple problems. Report improvements that substantially expand scope as follow-ups. Do not impose a particular service layer or framework.

Discover validation commands from project instructions and configuration. Run the relevant format, lint, type, test, build, and smoke checks for the actual stack and risk. Inspect the final diff for accidental changes, secrets, local/generated files, debug code, stale mocks, and unexpected dependencies. Report failures and skipped checks accurately; never present unrun checks as passed. Automated UI checks supplement human visual and interaction testing.

## Human control and shipping

Implementation and `/validate-change` normally end before committing, pushing, opening a PR, or merging. The developer should run and use the software first. Do not infer permission to ship from completion or from "looks good" alone.

"Looks good, prepare the PR", "prep this for PR", "ship this as a PR", and "prepare this for review" in a PR context trigger `/prepare-pr` and authorize its commit/push/PR steps. An explicit request earlier in the task also counts; do not ask again for authorization already given. Never claim manual testing occurred unless the developer reported it. An explicit request to ship before manual testing is an exception to the default checkpoint, not evidence of a manual pass.

For review findings, distinguish Blocking, Important, and Minor issues with actionable evidence and file/line references when available. Do not invent criticism. A clean review should say so and identify any remaining verification limits.
