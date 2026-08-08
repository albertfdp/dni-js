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

Returns a DNI number with the control digit appended in the official format `12345678Z`. Only
eight-digit inputs are accepted; anything else, NIE numbers included, returns `null`.

#### `.nie (string)`

Returns a NIE number with the control digit appended in the official format `X1234567L`. Only `X`,
`Y` or `Z` followed by seven digits is accepted; anything else, DNI numbers included, returns `null`.
Unlike `dni`, it takes no number — the prefix means a NIE body can never be one.

#### `.getControlDigit (number|string)`

Returns the control digit for the input.

#### `.getLetter (number|string)`

Alias for `getControlDigit`.

#### `.isValid (string)`

Returns `true` or `false` by validating the input, which may be either kind of document. The
separator is optional, so `12345678Z`, `12345678-Z` and `12345678 Z` all validate.

#### `.isDNI (string)`

#### `.isNIE (string)`

Like `isValid`, but each answers for one kind of document only, so callers can tell a national
apart from a foreign resident without writing their own regex. Both are equally permissive about
the separator:

```js
dni.isNIE("X1234567L"); // => true
dni.isDNI("X1234567L"); // => false
```

#### `.normalize (string)`

Given a string input, it returns the canonical form of a valid DNI. When input is either not a string, or invalid, it returns null. Whitespace and the separator are removed, so every spelling of the same number produces an identical string that can be used as a storage or dedup key. Leading zeros stripped by spreadsheets and other software that reads the DNI as a number are restored. For example:

```js
dni.normalize("   12 34 56 7 8-z"); // 12345678Z
dni.normalize("12345678-Z"); // 12345678Z
dni.normalize("5821400P"); // 05821400P
```

## Contributing

See [CONTRIBUTING.md](https://github.com/albertfdp/dni-js/blob/master/CONTRIBUTING.md)
for local setup, pull request conventions and the release process.

## License

MIT
