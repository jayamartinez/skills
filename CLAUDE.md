@AGENTS.md

# Claude Code adapter

`AGENTS.md` (imported above) is the shared, agent-neutral workflow and remains authoritative. This file only explains how Claude Code discovers and applies the workflow skills. Claude Code skips `AGENTS.md` whenever a `CLAUDE.md` exists, so keep the import line above.

## Discovering skills

Each workflow skill is a folder containing `SKILL.md` with `name` and `description` frontmatter: `start-task`, `investigate`, `debug`, `architecture-review`, `code-structure`, `validate-change`, `before-and-after`, `prepare-pr`, and `review-pr`.

- When the skills are installed (see the README), they appear as Claude Code skills. `/name` invokes one directly, and Claude may select one from its description.
- When they are not installed (for example, while working in this repository), read `<skill>/SKILL.md` from this repository directly. Do not treat a skill as applied without reading it.
- Resolve paths inside a skill relative to that skill's folder. For the vendored `before-and-after` skill, `skill/scripts/format.mjs` means `before-and-after/scripts/format.mjs` in this repository or `${CLAUDE_SKILL_DIR}/scripts/format.mjs` when installed. Write temporary files to the session scratch directory instead of assuming `/tmp` exists.

## Applying the workflow in Claude Code

- Route work through the `AGENTS.md` lifecycle. Invoke the matching workflow skill yourself when a request fits it; the developer should not need to name it.
- Personal workflow skills take precedence over same-named bundled skills, so `/debug` runs this workflow's `debug` skill. Built-in commands such as `/code-review`, `/security-review`, or `/simplify` may add evidence inside a workflow step. They never replace `validate-change` or `review-pr`, and they never authorize shipping or posting.
- Permission modes (including auto-accept and bypass), allowlists, and hooks control what the harness permits, not what the developer authorized. The commit, push, PR, external-posting, and merge rules in `AGENTS.md` still apply.
- Plan mode fits `/investigate` and pre-implementation `/architecture-review`. It does not replace them.
- A fresh subagent can give `/review-pr` or `/investigate` an independent read without disturbing the working context. Verify its conclusions before reporting them, and never let it edit, commit, or post beyond the authorization of the task it serves.
- Follow Claude Code's commit and PR attribution conventions when `/prepare-pr` creates commits or a PR.

## Maintaining this repository

This section applies only when the working repository is this skills repository.

- Keep skills agent-neutral: describe the process, not a specific vendor's tools. Put host-specific guidance here, in the README, or in another host's adapter file.
- Keep frontmatter to the portable `name` and `description` fields. Claude-only fields such as `disable-model-invocation` would stop Claude from applying skills when natural-language requests ask for them.
- Do not add local workflow rules to the vendored `before-and-after` files; see the README's update procedure.
- Validate changes the way the README describes: frontmatter, Markdown, links, cross-skill references, routing overlap, vendored attribution, and the complete diff.
