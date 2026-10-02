---
name: review-loop
description: Use when the developer asks to run the review loop on an existing pull request, or to fix what the automated reviewer (jam-review) found. Read its review of the head commit, fix the findings that are real, push, and repeat until the review is clean or three rounds have passed. Never merge.
---

# Review loop

Work an open pull request through its automated review: read the review of the head commit, fix what is real, push, and read the next review. Stop when the review is clean, when a round does not improve it, or after three rounds.

Asking for the loop authorizes fix commits and ordinary pushes to that pull request's branch. It does not authorize merging, force-pushing, rewriting history, opening other pull requests, or posting comments or reactions on the developer's behalf.

## Before starting

1. Read applicable agent instructions (`AGENTS.md`, `CLAUDE.md`, or equivalent). Confirm the pull request is open, its branch is the one checked out, and the checkout has no unrelated uncommitted work. If the branch belongs to another task or checkout, stop and say so.
2. Note the head commit: `gh pr view <number> --json headRefOid,headRefName,url`.

## Read the review of the head commit

The reviewer posts one review per commit. Its body ends with a marker:

```
<!-- jam-review {"v":2,"commit":"<full sha>","verdict":"clean","findings":0,"confidence":4} -->
```

`verdict` is `clean` or `findings`; `confidence` is 0 to 5, how safe the change is to merge.

1. List the reviews (`gh api repos/<owner>/<name>/pulls/<number>/reviews`) and take the one whose marker's `commit` equals the head commit. A review of an older commit says nothing about the current one.
2. If there is none, request one. When the `jam-review` command exists on this machine, run `jam-review review <number> --repo <owner>/<name> --post` and wait for it; it takes a few minutes. Otherwise the reviewer runs on its own after a push: check once a minute, for at most ten minutes.
3. If the command fails, or no review appears, stop and report the reviewer's own message and fix (signed out, usage limit, GitHub token, no network). A missing review is never a clean review, and a reviewer failure is never retried in a loop.
4. Read the findings: the review's inline comments (`gh api repos/<owner>/<name>/pulls/<number>/reviews/<review id>/comments`), any finding written out in the review body as outside the changed lines, and the reasons in the score table.

## Decide

- **Done:** `verdict` is `clean` and `confidence` is 4 or 5. Report and stop.
- **Work to do:** the review has findings, or `confidence` is 3 or below. With findings, the work is the findings. Without findings, the work is the specific gap the score reasons name, such as a changed path with no test; attempt that once.

## One round

1. Check each finding against the code before changing anything. Follow the trigger it describes; write a failing test when that is the quickest proof. The reviewer can be wrong.
2. For a real finding, make the smallest fix that fits the existing architecture, with a regression test when practical. For a finding that is wrong, or whose trigger would not happen in real use, change nothing and write down why.
3. If no finding is real, do not push anything. Stop and report the disagreements; the developer dismisses them on GitHub, which teaches the reviewer.
4. Apply `/code-structure` and `/validate-change` to the fixes. Do not push a round that fails its checks.
5. Commit with a message that names what was fixed, then push to the pull request's branch. A push is one round.
6. Read the review of the new head commit, as above.

## When to stop

- After three rounds, whatever the result.
- Earlier, when a round did not improve the review: a finding that was fixed comes back, the number of findings did not go down, or `confidence` did not go up.
- When only findings judged wrong remain.

## Report

For each round give the commit, the verdict and confidence of its review, what was fixed and what was declined, with the reason. End with the current state of the pull request: clean, or what is still open and why the loop stopped. Say which checks were run. Never merge, and do not describe a stopped loop as a clean review.
