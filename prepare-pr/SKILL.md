---
name: prepare-pr
description: Use when the user explicitly requests PR preparation or shipping, such as "looks good, prepare the PR", "prep this for PR", "push this and open a PR", "ship this as a PR", or "prepare this for review" in a PR context. This is the commit/push/PR boundary after normal human testing, not an automatic consequence of implementation or validation finishing.
---

# Prepare PR

Prepare a logical change for human review. An explicit PR-preparation request authorizes sensible commits, pushing the task branch, and opening its PR; it does not authorize merging. Honor earlier explicit authorization without asking again. A bare "looks good" or successful automated checks alone does not authorize shipping.

The normal entry follows human testing. Record what the developer actually verified. If they explicitly requested shipping before testing, proceed within that authorization and label manual verification as pending/not reported. Never invent a manual pass. If shipping has not been requested, complete any useful read-only preparation and return to the manual-testing checkpoint.

## Final preparation

1. Read applicable `AGENTS.md` and task intent. Confirm the repository, remote, current task branch, and target (`main` unless designated otherwise). Do not commit implementation on `main` or operate in another task's checkout.
2. Inspect status, the complete branch diff against the target, staged/unstaged diffs, and relevant untracked files. Verify all intended behavior and exclude unrelated, accidental, local, generated, debug, or secret-bearing files. Inspect existing branch commits as well as uncommitted work so unrelated history does not enter the PR.
3. Fetch the relevant remote and assess target/head changes, concurrent work, and whether a PR already exists. Safely synchronize where appropriate using project conventions. Prefer merging a target update on a shared/published branch when history rewriting would disrupt others; rebase only when safe for an owned branch. Never force-push `main` or silently rewrite shared history.
4. Resolve straightforward conflicts by understanding both sides. Do not blindly choose ours/theirs. If resolution needs a product decision or overlaps another task's work, explain the conflict and obtain that decision. Avoid switching/rebasing through unrelated dirty work; isolate first.
5. Perform final `/code-structure` checks when appropriate, then `/validate-change` or equivalent final repository-aware validation. Rerun relevant checks after synchronization, conflict resolution, or any later edits. Do not ship known task regressions; report blocked gates and continue resolving them within scope. If a behavior change invalidates reported manual testing, identify what must be retested before normal shipping.

## Commit, push, and open

- Stage only reviewed task files or hunks; inspect the staged diff before committing. Preserve unrelated staged work without including or silently unstaging it. If it cannot be separated safely, use an isolated checkout or request the specific decision needed.
- Create one or a few sensible commits for the logical change with concise descriptive messages. Avoid experimentation checkpoints and empty commits; skip committing if the intended work is already committed. Honor repository hooks and do not bypass required validation.
- Push the task branch to the verified remote and set its upstream when needed. If the remote branch changed, inspect it before retrying; do not overwrite another agent's commits. A required published-history rewrite needs explicit authorization; use lease protection if authorized.
- Open a PR targeting `main` or the designated base, or update the existing PR for this task. Use an authenticated available GitHub interface and verify the resulting URL, head, and base. If access fails, preserve completed work, report precisely which stage succeeded, and request only the missing access; do not report a PR as created without confirmation.

## PR description and handoff

Lead with the concrete problem and resulting behavior. Keep the title and body about the final implementation. Use only useful sections from **Summary**, **Changes**, **Testing**, **Manual verification**, and **Known limitations / follow-ups**. Distinguish automated results from developer-reported testing and pending checks. Include screenshots for UI changes when they materially help review, without requiring them for every small visual edit.

With `gh`, pass multiline descriptions via a body file outside the tracked repository; with structured tools, pass the body directly. Do not include local paths, secrets, or temporary artifacts in the PR.

Return the PR URL, branch, commit(s), push status, validation and manual-testing status, and available CI status. Pending CI remains pending; do not equate PR creation with approval or passing checks. Never merge or enable auto-merge without explicit merge authorization.
