# Personal agentic development workflow

This repository is the source of truth for a small, composable agentic-development workflow that works with any coding agent that reads Markdown instructions, including Claude Code and Codex. It combines safe task setup, focused investigation and debugging, architecture-aware implementation, evidence-driven validation, hands-on testing, and explicit human control over shipping and merge.

## Skills

| Skill | Use it when | Result |
| --- | --- | --- |
| [`start-task`](start-task/SKILL.md) | Beginning or resuming meaningful implementation | Safe branch/worktree, acceptance criteria, and optional task state |
| [`investigate`](investigate/SKILL.md) | Researching behavior or an approach without editing | Facts, hypotheses, unknowns, affected boundaries, and a concise plan |
| [`debug`](debug/SKILL.md) | Diagnosing an unknown failure and, when authorized, fixing it | Evidence-backed root cause, smallest appropriate fix, and regression proof |
| [`architecture-review`](architecture-review/SKILL.md) | A substantial feature/refactor warrants boundary-level review | Proportionate architecture findings tied to project patterns |
| [`code-structure`](code-structure/SKILL.md) | Cleaning up changed code after implementation or fixes | Focused local maintainability improvements |
| [`validate-change`](validate-change/SKILL.md) | Verifying current behavior and readiness for human testing | Diff-sensitive checks, runtime evidence, limits, and manual test steps |
| [`before-and-after`](before-and-after/SKILL.md) | A GitHub PR needs existing visual evidence attached | Idempotent before/after or preview block in the PR description |
| [`prepare-pr`](prepare-pr/SKILL.md) | The user explicitly requests PR preparation or shipping | Final validation, commits, push, and a useful PR |
| [`review-pr`](review-pr/SKILL.md) | Reviewing a PR or proposed branch diff | Independent, evidence-based review before fixes or merge |
| [`review-loop`](review-loop/SKILL.md) | Asked to work a PR through its automated review | Real findings fixed and pushed, for at most three rounds, until the review is clean |

Security and performance are conditional passes inside validation and review, not standalone skills. Concurrency belongs in task setup. Acceptance criteria belong in task setup. This keeps routing clear and avoids checklist skills that would activate on unrelated changes.

## Lifecycle

```text
/start-task ── optional /investigate
     ↓
implement ── /debug for unknown failures
     ↓
conditional /architecture-review
     ↓
/code-structure
     ↓
/validate-change ── optional visual capture and /before-and-after
     ↓
manual testing ← fixes stay on the same branch; refresh invalidated evidence
     ↓ explicit PR authorization
/prepare-pr → PR + CI → /review-pr, or /review-loop on request
     ↓ explicit merge authorization
merge
```

Implementation normally stops at **Ready for manual testing**, before commit, push, or PR. Passing automated checks does not mean a person tested the change. PR creation does not authorize merge.

## Branches, worktrees, and concurrent work

Use one branch per logical task across prompts and sessions. A clean single-task checkout uses a normal task branch. Worktrees are the isolation mechanism when another agent/task owns the checkout, unrelated dirty work cannot coexist safely, independent tasks must progress simultaneously, or a review must not disturb active implementation.

Before creating a worktree, inspect existing worktrees and branches, refresh the base when appropriate, and check likely overlapping PRs/tasks. Never reuse another task's branch or alter its worktree. Remember that ports, databases, caches, and credentials may still be shared. After merge or closure, confirm the worktree contains no unique work before removing it, then prune the task branch and local task state when appropriate.

## Resuming work

Substantial tasks may keep a local note at `<git-common-dir>/agent-tasks/<branch>.md`, with `/` in the branch name replaced by `--` so that different agents resolve the same file. Notes from earlier versions may still live under `codex-tasks/`; the next resume moves them. It records the goal, acceptance criteria, decisions, touched areas, current state, validation/manual status, limitations, and next step. The note lives inside Git metadata, so it is neither tracked nor copied into application repositories. Git and current files always outrank the note. Update it only at meaningful transitions and delete it after merge/closure or explicit abandonment.

When asked to continue yesterday's task, identify the current or requested branch, inspect the repository and matching note, reconcile stale details, then continue the same logical task rather than opening a new branch.

## Evidence-driven validation

`validate-change` discovers the stack and selects checks from the actual diff. Passing lint, types, tests, or a build is useful but not always sufficient. Where practical, it also gathers proportional behavioral evidence: a bug reproduction that succeeds after the fix, a representative API exchange, CLI input/output, browser interaction, screenshot, state transition, log/event, or before/after measurement.

Deeper security, performance, migration, contract, concurrency, dependency, and infrastructure checks run only when the change exposes those risks. Later edits invalidate affected evidence and require rerunning it. Trivial changes should not produce elaborate evidence bundles.

## PR size

`AGENTS.md` sets a default budget of about 1,000 reviewed lines per PR, with 2,500 as the point where splitting is expected. Lockfiles, generated output, snapshots, and vendored files do not count. `start-task` plans slices when a task will clearly exceed the budget, `validate-change` reports the current size, `prepare-pr` proposes a split before shipping an oversized PR, and `review-pr` flags unexplained ones. Repository bootstraps, mechanical renames or codemods, generated code, dependency upgrades, and tightly coupled changes are legitimate exceptions. They proceed as one PR with a short **Size** note that gives the reason and a reading order. The budget is guidance, not a gate, and the developer can always choose one PR.

## Visual before/after evidence

[`before-and-after`](before-and-after/SKILL.md) is vendored from [vercel-labs/before-and-after](https://github.com/vercel-labs/before-and-after) at commit `8306d34f459b6704e08e6adb5829fcddb0dc3557` under the included [PolyForm Shield 1.0.0 license](before-and-after/LICENSE). It formats and attaches existing screenshots or recordings; capture remains the responsibility of the available browser tooling.

Capture a meaningful before state when practical, then the corresponding after state from the validated code. Reuse validation media rather than recapturing it. Use after-only previews for net-new UI. Visual proof is useful for meaningful visible changes, not backend-only work or every tiny CSS edit. Failure to capture a trivial UI comparison is not automatically blocking. Never publish media containing private data, tokens, authenticated URLs, secrets, or sensitive browser state.

The skill requires Node.js for its formatter and GitHub CLI 2.99+ for `gh --attach`; capture additionally requires compatible browser tooling such as `agent-browser`. Its vendored script does not host media publicly—it attaches media through GitHub. The upstream instructions refer to the formatter as `skill/scripts/format.mjs`; resolve that path relative to the installed skill folder (`${CLAUDE_SKILL_DIR}/scripts/format.mjs` in Claude Code).

### Updating the vendored skill

1. Review upstream changes and its current license at the pinned repository.
2. Replace only `before-and-after/SKILL.md` and `before-and-after/scripts/format.mjs` with the upstream `skill/` payload; refresh `before-and-after/LICENSE` and the pinned commit above.
3. Do not add local workflow rules inside the vendored files. Integration belongs in `AGENTS.md`, host adapters such as `CLAUDE.md`, `validate-change`, `prepare-pr`, and this README.
4. Run upstream formatter tests when available, this repository's skill/frontmatter and link checks, and a sample format/marker-replacement smoke test.
5. Review the diff for upstream scope or dependency changes before accepting the update.

The vendored files are intentionally kept close to upstream so updates remain mechanical and licensing notices remain intact.

**Local patch:** `scripts/format.mjs` carries a small Windows fix from [vercel-labs/before-and-after#14](https://github.com/vercel-labs/before-and-after/pull/14). Without it, the formatter exits silently on Windows and emits backslash media paths. When updating, keep the patch until that PR merges, then take upstream unchanged.

## Installation

[`AGENTS.md`](AGENTS.md) holds the shared workflow and each skill folder holds a portable `SKILL.md` with only `name` and `description` frontmatter. Host-specific guidance lives in an adapter file such as [`CLAUDE.md`](CLAUDE.md). After reviewing this repository, install it for each agent you use. Reconcile existing global instructions first. More specific project instructions can add project details.

### Install or refresh with the script

From this checkout, run:

```bash
node scripts/install.mjs
```

It links every skill folder into `~/.claude/skills/` (Claude Code) and `~/.agents/skills/` (Codex), links this checkout to `~/.claude/agent-workflow`, adds `@~/.claude/agent-workflow/CLAUDE.md` to `~/.claude/CLAUDE.md`, and links `~/.codex/AGENTS.md` to [`AGENTS.md`](AGENTS.md). On Windows, folders use junctions, which need no elevated rights. The `AGENTS.md` file link needs Developer Mode; without it, the script copies the file and you rerun it after `AGENTS.md` changes.

Because these are links, edits to existing skills and `AGENTS.md` reach both agents immediately. Rerun the script after adding, renaming, or removing a skill. It also removes links to deleted skills. Existing non-link copies, including older Codex copies in `~/.codex/skills/`, move to `~/.agent-workflow-backups/<timestamp>/` rather than being deleted. Other skills and your existing `~/.claude/CLAUDE.md` content are left alone. `node scripts/install.mjs --check` reports drift without changing anything and exits nonzero when something needs attention.

Links follow whichever branch this checkout has checked out, so both agents see an unmerged task branch while it is checked out. Keep this checkout on `main` between tasks.

### Claude Code notes

Claude Code reads `AGENTS.md` natively only when no `CLAUDE.md` is present, so the global file imports the adapter, which imports `AGENTS.md`. Personal skills take precedence over same-named bundled skills, so this workflow's `debug` replaces Claude Code's bundled `/debug` session-troubleshooting skill. Rename the folder and its `name` if you need both.

### Other agents

Link or copy [`AGENTS.md`](AGENTS.md) to the agent's global instructions location and the skill folders into its user skill directory, avoiding duplicate skill names. An agent without native skills can still follow the workflow by reading `<skill>/SKILL.md` directly, as `AGENTS.md` instructs.

### All agents

- Install optional dependencies only when needed. `before-and-after` needs Node.js, compatible capture tooling such as `agent-browser` (`npm install -g agent-browser`), and GitHub CLI 2.99+ for publication (`gh --version`; older versions lack `--attach`). The other workflow skills are instruction-only.
- Start a new session and confirm the global instructions and skill descriptions are discoverable. Update this source repository first and review the change; linked installations pick it up automatically.

The `/skill-name` notation is workflow shorthand for the skill of that name. Claude Code invokes it as `/skill-name`, Codex uses its skill selector or `$skill-name`, and matching requests may select a skill automatically from its frontmatter description. Skill selection, permission modes, and host review commands never grant shipping or merge permission.

For changes to this repository, validate frontmatter, Markdown, links, cross-skill references, routing overlap, vendored attribution, and the complete diff. Manual testing means reviewing the instructions and exercising representative requests in a disposable repository; do not invent an application build.
