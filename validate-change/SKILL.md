---
name: validate-change
description: Use after implementation, cleanup, or fixes to verify changed behavior and readiness for human testing, and for final validation during authorized PR preparation. Discover checks from the actual repository. Do not commit, push, open a PR, or merge as part of this skill.
---

# Validate change

Answer: "Does the change actually appear to work?" Clean structure is assessed by `/code-structure`; automated success does not replace hands-on testing.

## Discover the checks

Read applicable `AGENTS.md`, the changed files and surrounding behavior, package scripts, build system, test configuration, language/framework, and relevant CI configuration. Use the repository's documented tools, package manager, and existing commands. Do not assume every project is JavaScript or invent scripts that do not exist.

Choose checks proportionate to affected behavior and risk. When applicable, include format checking, lint, static types, targeted unit/integration/backend tests, compilation or production build, application startup, and smoke tests. JS/TS projects commonly need lint, typecheck, tests, and a production build, but inspect the project first. Use focused regression tests for meaningful behavior or concrete risks; do not add tests that merely mirror trivial edits.

## Execute and investigate

1. Run relevant existing checks. Record the commands, scope, and exact results. Distinguish **passed**, **failed**, **blocked**, **not run**, and **not applicable**. A missing command or unavailable environment is not a pass.
2. Investigate failures enough to distinguish task regressions from existing failures or environment problems; label uncertain causes as uncertain. Fix in-scope regressions and rerun affected checks. Do not disable tests or weaken checks to obtain a pass.
3. For UI/interactive changes, start the application and run targeted browser/Playwright and smoke checks when practical and supported. Exercise changed interactions and relevant loading, empty, error, and accessibility behavior. State environment and mock/live-data limits. Never claim automated browser tests replace human visual or interaction testing.
4. After fixes or structural changes, rerun checks whose evidence was invalidated. Broaden testing only for a remaining risk or required project gate.

For instruction/documentation-only repositories, check frontmatter where present, Markdown structure, links, naming/reference consistency, and the intended workflow. Do not invent build commands or add a test framework just for prose.

## Inspect the complete change

Review the branch diff against its target and current staged/unstaged changes, plus untracked files relevant to the task. Look for unrelated or accidental changes, debug logs, commented experiments, generated artifacts, credentials/secrets, local files, dead code, stale mocks, and suspicious dependency/lockfile changes. Do not expose secret values in reports. Preserve unrelated work rather than deleting it to make status clean.

## Report and stop

Report:

- Changed behavior and areas.
- Checks run, exact pass/fail or other status, failures and likely causes.
- Anything not tested, known limitations, assumptions, and incomplete or mock-only behavior.
- Concrete manual steps: how to start/access the feature, what action to try, expected results, and important edge cases. For documentation, identify decisions and example requests to review.

When relevant automated checks pass, end with **Ready for manual testing.** If validation is blocked or failing, say **Not ready: validation failed or is incomplete**, identify the unresolved issue, and explain any limited testing that is still possible. Never obscure a failure behind a readiness claim.

Do not commit, push, create a PR, or merge. Return results to `/prepare-pr` if it called this skill under existing explicit shipping authorization; that caller handles authorized shipping. Otherwise wait for the developer's testing feedback and continue fixes on the same branch.
