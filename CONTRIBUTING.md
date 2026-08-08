# Contributing

## Getting set up

This repository uses [pnpm](https://pnpm.io). The version is pinned in the
`packageManager` field, so [Corepack](https://nodejs.org/api/corepack.html)
will pick it up automatically. Node 20.19 or newer is required.

```
$ pnpm install
$ pnpm test          # run the test suite
$ pnpm run lint      # eslint
$ pnpm run format    # prettier --write
```

CI runs `format:check`, `lint`, `types:check` and `test` on Node 20, 22 and 24.

## Pull request titles

**Pull request titles must follow [Conventional Commits](https://www.conventionalcommits.org).**
A CI check enforces this, and it is the one rule worth knowing before opening a
pull request.

Individual commit messages inside your branch are not checked, because pull
requests are squash-merged using the title as the commit subject — your commits
are discarded at merge time. The title is what lands on `master`, and it is what
determines the next release:

| Title                                           | Effect              |
| ----------------------------------------------- | ------------------- |
| `fix: ...`                                      | patch release       |
| `feat: ...`                                     | minor release       |
| `feat!: ...` / `fix!: ...`                      | major release       |
| `docs:`, `build:`                               | listed in changelog |
| `ci:`, `test:`, `chore:`, `refactor:`, `style:` | no release          |

For a breaking change, add a `BREAKING CHANGE:` footer to the **pull request
description** describing what callers must change. Squash-merging uses the
description as the commit body, so that is where the footer has to live to be
picked up — and it is copied verbatim into the changelog as the only migration
note users will see.

## Releasing

Releases are automated. Never run `npm version` or `npm publish` by hand.

1. [release-please](https://github.com/googleapis/release-please) watches
   `master` and keeps a `chore(master): release x.y.z` pull request up to date,
   containing the generated `CHANGELOG.md` entry and the version bump.
2. Merging that pull request tags the commit and creates the GitHub Release.
3. The `publish` job then pushes the package to npm using
   [trusted publishing](https://docs.npmjs.com/trusted-publishers), which
   attaches a provenance attestation. There is no npm token in this repository —
   authentication is short-lived OIDC tied to `.github/workflows/release.yml`.

Because npm's trusted publisher is pinned to that workflow's filename, renaming
`release.yml` breaks publishing until the setting is updated on npmjs.com.
