# dni-js

Compute and validate a Spanish DNI/NIE numbers as described [here](http://www.interior.gob.es/web/servicios-al-ciudadano/dni/calculo-del-digito-de-control-del-nif-nie).

[![CI](https://github.com/albertfdp/dni-js/actions/workflows/node.js.yml/badge.svg)](https://github.com/albertfdp/dni-js/actions/workflows/node.js.yml)
[![npm version](https://badge.fury.io/js/dni-js.svg)](https://badge.fury.io/js/dni-js)

## Install

```
$ npm install dni-js
```

## Usage

```js
const dni = require("dni-js");

dni.isValid("12345678Z"); // => true
dni.normalize("  12 34 56 7 8-z"); // => "12345678Z"
dni.dni("12345678"); // => "12345678Z" — appends the control letter
```

## API

Two input shapes show up throughout:

- **body** — the number without its control letter: `"12345678"` (DNI) or `"X1234567"` (NIE)
- **full number** — a body plus its control letter: `"12345678Z"`, `"X1234567L"`

| Function                                                       | Takes              | Returns                           |
| -------------------------------------------------------------- | ------------------ | --------------------------------- |
| [`dni(body)`](#dnibody)                                        | DNI body           | full DNI, or `null` if malformed  |
| [`nie(body)`](#niebody)                                        | NIE body           | full NIE, or `null` if malformed  |
| [`getControlDigit(body)`](#getcontroldigitbody--getletterbody) | either body        | the control letter                |
| [`getLetter(body)`](#getcontroldigitbody--getletterbody)       | either body        | alias of `getControlDigit`        |
| [`isValid(full)`](#isvalidfull)                                | full number string | `true` for a valid DNI **or** NIE |
| [`isDNI(full)`](#isdnifull--isniefull)                         | full number string | `true` only for a valid DNI       |
| [`isNIE(full)`](#isdnifull--isniefull)                         | full number string | `true` only for a valid NIE       |
| [`normalize(full)`](#normalizefull)                            | full number string | canonical full number, or `null`  |

Builders (`dni`, `nie`) take a body and hand back a complete number. Checkers (`isValid`, `isDNI`, `isNIE`,
`normalize`) take a complete number and inspect it.

One more export is not listed above: `dniOrNie`, a compatibility shim for callers upgrading from 0.2.x. See
[Migrating from 0.2.x](#migrating-from-02x).

### `dni(body)`

Appends the control letter to a DNI body, in the official format (no separator).

```js
dni.dni("12345678"); // => "12345678Z"
dni.dni(12345678); // => "12345678Z" — a number works too

dni.dni("1234567"); // => null — must be exactly eight digits
dni.dni("X1234567"); // => null — NIE bodies go to nie()
```

### `nie(body)`

The NIE counterpart: `X`, `Y` or `Z` followed by seven digits.

```js
dni.nie("X1234567"); // => "X1234567L"

dni.nie("x1234567"); // => null — the prefix must be uppercase
dni.nie("12345678"); // => null — DNI bodies go to dni()
```

Unlike `dni`, it takes no number — the prefix means a NIE body can never be one.

### `getControlDigit(body)` / `getLetter(body)`

Returns just the control letter, for either kind of body. `getLetter` is an alias.

```js
dni.getControlDigit("12345678"); // => "Z"
dni.getControlDigit("X1234567"); // => "L"
```

This one does **not** validate — it computes a letter from whatever it is given (`getControlDigit(2)` returns
`"W"`, `getControlDigit("abc")` returns `undefined`). Reach for `dni()` or `nie()` when the input might be
malformed.

### `isValid(full)`

Checks a full number of either kind, control letter included. The separator is optional.

```js
dni.isValid("12345678Z"); // => true
dni.isValid("12345678-Z"); // => true
dni.isValid("12345678 Z"); // => true
dni.isValid("x1234567l"); // => true — case-insensitive

dni.isValid("12345678L"); // => false — wrong control letter
dni.isValid(12345678); // => false — takes a string, not a number
dni.isValid("5821400P"); // => false — leading zero missing
```

### `isDNI(full)` / `isNIE(full)`

Like `isValid`, but each answers for one kind of document only, so callers can tell a national apart from a
foreign resident without writing their own regex. Both are equally permissive about the separator.

```js
dni.isDNI("12345678Z"); // => true
dni.isNIE("12345678Z"); // => false

dni.isNIE("X1234567L"); // => true
dni.isDNI("X1234567L"); // => false
```

### `normalize(full)`

Returns the canonical form of a full number: whitespace and the separator removed, upper-cased, and leading
zeros restored when software that read the DNI as a number stripped them. Every spelling of the same number
produces an identical string, so the result is safe to use as a storage or dedup key.

```js
dni.normalize("   12 34 56 7 8-z"); // => "12345678Z"
dni.normalize("12345678-Z"); // => "12345678Z"
dni.normalize("x1234567l"); // => "X1234567L"
dni.normalize("5821400P"); // => "05821400P" — leading zero restored
dni.normalize("24r"); // => "00000024R"

dni.normalize("12345678--Z"); // => null
```

Returns `null` when the input is not a string or does not normalize to a valid number. It is idempotent, so
re-running it over already-normalized values is a no-op.

### `isValid` or `normalize`?

- `isValid` answers "is this string exactly a valid DNI/NIE?" — use it for strict checks.
- `normalize` answers "what is the canonical form of this?" — it also restores leading zeros, so use it for
  form input, CSV imports and anything else typed by a human.

The gap is easy to hit: `isValid("5821400P")` is `false`, while `normalize("5821400P")` is `"05821400P"`.
Normalize first, then store or compare.

### TypeScript

Declarations ship with the package, so there is no `@types` package to install.

```ts
import dni = require("dni-js");

const normalized: string | null = dni.normalize("12345678-Z");
```

## Migrating from 0.2.x

### Builders are strict, and emit the official format

`nie` used to be a literal alias of `dni`, so either function accepted either body, and both emitted a
hyphen. Each now takes only its own shape, and the separator is gone:

```js
dni.dni("12345678"); // 0.2.x => "12345678-Z",  now => "12345678Z"
dni.nie("12345678"); // 0.2.x => "12345678-Z",  now => null
dni.dni("X1234567"); // 0.2.x => "X1234567-L",  now => null
```

Call the builder matching the document. When the two are mixed in one field, branch on the new `isDNI` /
`isNIE` predicates, which is also how you find out which one you are holding.

If you only need the number and not its kind, `dniOrNie` is a shim that restores the old lenient behaviour:

```js
dni.dniOrNie("12345678"); // => "12345678Z"
dni.dniOrNie("X1234567"); // => "X1234567L"
dni.dniOrNie("A5881850"); // => null — legal-entity NIFs are not supported
```

It exists for this upgrade. Prefer `dni` or `nie` when the document is known.

### Everything that changed

| 0.2.x                                          | 1.0.0                          | What to do                                                       |
| ---------------------------------------------- | ------------------------------ | ---------------------------------------------------------------- |
| `dni("12345678")` → `"12345678-Z"`             | `"12345678Z"`                  | official format — add the hyphen yourself if you display it      |
| `nie` aliased `dni`; either took either body   | each rejects the other's shape | call the matching builder, or `dniOrNie` if the shape is unknown |
| `isValid("x1234567l")` → `false`               | `true`                         | lowercase NIEs now validate, matching lowercase DNIs             |
| `isValid(123456789)` threw a `TypeError`       | `false`                        | drop the surrounding `try`/`catch`                               |
| `normalize("5821400P")` → `null`               | `"05821400P"`                  | stripped leading zeros are restored                              |
| `normalize("12 34 56 7 8-z")` → `"12345678-Z"` | `"12345678Z"`                  | re-normalize stored values — see below                           |

New in 1.0.0: `isDNI` and `isNIE`, so telling a national apart from a foreign resident no longer needs your
own regex, and bundled TypeScript declarations — 0.2.x shipped none, so `dni-js` was untyped. The new
declarations reject a few calls the runtime still tolerates, `nie(12345678)` among them: a NIE body always
carries an `X`/`Y`/`Z` prefix, so it can never be a number.

### Re-normalize anything you stored

This is the only change that can quietly corrupt data rather than break a call site. `normalize` is
documented above as safe to use as a storage or dedup key, and its 0.2.x output carried a hyphen. Keys
written by 0.2.x therefore never match keys written by 1.0.0, and lookups miss silently.

`normalize` accepts the hyphenated form and is idempotent, so running stored values back through it once is
the whole fix:

```js
dni.normalize("12345678-Z"); // => "12345678Z"
```

## Contributing

See [CONTRIBUTING.md](https://github.com/albertfdp/dni-js/blob/master/CONTRIBUTING.md)
for local setup, pull request conventions and the release process.

## License

MIT
