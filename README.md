# Personal Codex workflow

This repository is the source of truth for how I work with Codex across software projects. It holds reusable workflow skills and global instructions: small branches, maintainable code, automated validation, hands-on testing, and human review before merge.

## Workflow

```text
/start-task
      ↓
implement
      ↓
/code-structure
      ↓
/validate-change
      ↓
manual testing ← fixes on the same branch; repeat cleanup and validation
      ↓
/prepare-pr
      ↓
PR + CI
      ↓
/review-pr
      ↓
human authorizes merge
```

Implementation normally stops at **Ready for manual testing**, before any commit, push, or PR. Codex reports what changed, automated results, what to try manually, and what remains unverified or mock-only. I test the software and give feedback on the same branch. An explicit request to commit, push, or open a PR can authorize those actions earlier; it does not authorize merging or establish that manual testing passed.

| Skill | When to use it | Result |
| --- | --- | --- |
| [/start-task](start-task/SKILL.md) | Begin a feature, fix, refactor, or meaningful maintenance task | Safe task branch and understood scope |
| [/code-structure](code-structure/SKILL.md) | Review changed code after implementation or meaningful fixes | Focused cleanup following project patterns |
| [/validate-change](validate-change/SKILL.md) | Check behavior and prepare for hands-on testing | Evidence, limitations, and manual test steps |
| [/prepare-pr](prepare-pr/SKILL.md) | Explicitly request PR preparation or shipping | Final checks, commits, push, and PR |
| [/review-pr](review-pr/SKILL.md) | Request review of a PR or branch diff | Review-only findings before substantial fixes |

Use one branch per logical task, even across many prompts. Prefer readable names such as `feat/device-sync` or `fix/transcript-export`. Keep `main` stable and ship through PRs. Isolate conflicting concurrent tasks with worktrees when useful; do not require a worktree for simple single-task work.

## Use across projects

[AGENTS.md](AGENTS.md) is the maintained global workflow. Project-specific `AGENTS.md` files supply the stack, architecture, commands, design system, naming, directory conventions, backend assumptions, and mock/live-data boundaries. More specific project guidance wins legitimate conflicts with generic defaults, within higher-priority instructions and user authorization.

To activate the workflow after reviewing it:

1. Copy or link this repository's `AGENTS.md` to `~/.codex/AGENTS.md` (or your custom `CODEX_HOME`). Preserve and reconcile existing instructions first; an `AGENTS.override.md` there takes precedence. See [Codex instruction discovery](https://learn.chatgpt.com/docs/agent-configuration/agents-md).
2. Copy or link the five skill folders into your user skill directory. Current documentation lists `~/.agents/skills`; use `.agents/skills` inside a project for project-only scope. Avoid duplicate installations with the same names. See [Codex skill discovery](https://learn.chatgpt.com/docs/build-skills).
3. Start a new Codex session and ask it to list its active instructions and available workflow skills. Update this repository first and refresh copies after reviewed changes; links follow the checkout, so keep a linked checkout on reviewed work.

The `/start-task`-style names in this repository are workflow shorthand, not registered custom slash commands. In Codex CLI/IDE, use `/skills` or mention `$start-task` (and likewise for the other names). Matching requests can also select skills automatically through their descriptions. Selection alone never grants shipping permission. See [skill invocation](https://learn.chatgpt.com/docs/build-skills).

Cloning this repository alone does not install the skills globally. The repository deliberately contains only the global instructions, this README, and five `SKILL.md` files; it needs no runtime, external review service, or prescribed application architecture.

## Practical example

```text
User: "Implement device synchronization."
Codex:
- uses /start-task and creates feat/device-sync
- implements within the project's architecture
- runs /code-structure and /validate-change
- stops for manual testing with results and concrete test steps

User: "The offline retry fails."
Codex:
- fixes the issue on feat/device-sync
- repeats relevant cleanup and validation
- returns to manual testing

User: "Looks good, prepare the PR."
Codex:
- uses /prepare-pr and performs final validation
- commits, pushes, and opens a PR into main

User: "Review the PR."
Codex:
- uses /review-pr and reports findings without substantial edits

User: "Merge it."
Codex:
- checks the current PR and required checks
- merges only after this explicit authorization
```

For changes to this instruction repository, validate metadata, Markdown, links, workflow consistency, and the Git diff. Manual testing means reading the instructions and trying representative requests in a disposable project; there is no application build to invent.
