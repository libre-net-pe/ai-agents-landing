# .githooks

Hooks that run for everyone working in this repo.

| Hook | What it does |
|------|--------------|
| `pre-commit` | Refuses a staged file over **5,000 tokens** (`bytes / 4`, so 20,000 bytes). Staged files only. Lockfiles, vendored dependencies, build output, codegen, minified bundles, source maps, snapshots, binaries, media and data dumps are skipped. A file already over budget at `HEAD` may shrink but not grow. |

Enable them once per clone:

```bash
git config core.hooksPath .githooks
```

`git worktree` checkouts share that config, so they are covered too. The factory
installer (`sami-cmd: scripts/install-git-hooks.sh`) sets this for its clones.

## When the guard blocks a commit

Split the file; do not shrink it. Types out first, then by responsibility (one
module per reason to change), one module per case for long match/route tables,
tests move next to their unit, long inline fixtures become files. Re-stage the
split files and commit again.

Do not delete tests, strip comments, join lines or reach for
`git commit --no-verify` to get past it.

## Exempting a generated path

Add a gitignore-style glob to `.file-size-ignore` at the repo root, one pattern
per line (`#` comments, `dir/` means `dir/*`), and commit it with the change.

## This file is a copy

`pre-commit` is a verbatim copy of the canonical hook in the factory repo
(`sami-cmd: scripts/hooks/pre-commit`), which `scripts/install-git-hooks.sh`
there verifies byte-for-byte. Change the canonical source and land the update
here by PR rather than editing this copy.
