# dni-js

Compute and validate a Spanish DNI/NIE numbers as described [here](http://www.interior.gob.es/web/servicios-al-ciudadano/dni/calculo-del-digito-de-control-del-nif-nie).

[![CI](https://github.com/albertfdp/dni-js/actions/workflows/node.js.yml/badge.svg)](https://github.com/albertfdp/dni-js/actions/workflows/node.js.yml)
[![npm version](https://badge.fury.io/js/dni-js.svg)](https://badge.fury.io/js/dni-js)

## Install

```
$ npm install dni-js
```

## Usage

Validation is based on this [document](http://www.interior.gob.es/web/servicios-al-ciudadano/dni/calculo-del-digito-de-control-del-nif-nie).

```js
const dni = require("dni-js");

dni.isValid("12345678Z"); // => true
```

TypeScript declarations ship with the package, so there is no `@types` package to install.

### API

#### `.dni (number|string)`

Returns a DNI number with the control digit appended in the official format `12345678Z`. If the input is
invalid, returns `null`.

#### `.nie (number|string)`

Returns a NIE number with the control digit appended in the official format `X1234567L`. If the input is
invalid, returns `null`.

#### `.getControlDigit (number|string)`

Returns the control digit for the input.

#### `.getLetter (number|string)`

Alias for `getControlDigit`.

#### `.isValid (string)`

Returns `true` or `false` by validating the input. The separator is optional, so `12345678Z`, `12345678-Z`
and `12345678 Z` all validate.

#### `.normalize (string)`

Given a string input, it returns the canonical form of a valid DNI. When input is either not a string, or invalid, it returns null. Whitespace and the separator are removed, so every spelling of the same number produces an identical string that can be used as a storage or dedup key. Leading zeros stripped by spreadsheets and other software that reads the DNI as a number are restored. For example:

```js
dni.normalize("   12 34 56 7 8-z"); // 12345678Z
dni.normalize("12345678-Z"); // 12345678Z
dni.normalize("5821400P"); // 05821400P
```

## Development

This repository uses [pnpm](https://pnpm.io). The version is pinned in the
`packageManager` field, so [Corepack](https://nodejs.org/api/corepack.html)
will pick it up automatically. Node 20.19 or newer is required.

```
$ pnpm install
$ pnpm test          # run the test suite
$ pnpm run lint      # eslint
$ pnpm run format    # prettier --write
```

## License

MIT
