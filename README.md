# dni-js
Compute and validate a Spanish DNI/NIE numbers as described [here](http://www.interior.gob.es/web/servicios-al-ciudadano/dni/calculo-del-digito-de-control-del-nif-nie).

[![Build Status](https://travis-ci.org/albertfdp/dni-js.svg?branch=master)](https://travis-ci.org/albertfdp/dni-js)
[![npm version](https://badge.fury.io/js/dni-js.svg)](https://badge.fury.io/js/dni-js)

## Install

```
$ npm install dni-js
```

## Usage

Validation is based on this [document](http://www.interior.gob.es/web/servicios-al-ciudadano/dni/calculo-del-digito-de-control-del-nif-nie).

```js
const dni = require('dni-js');

dni.isValid('12345678-Z'); // => true
```

### API

#### `.dni (number|string)`

Returns a DNI number with the control digit appended in the format `12345678-Z`. If the input is invalid,
returns `null`.

#### `.nie (number|string)`

Returns a NIE number with the control digit appended in the format `X1234567-L`. If the input is invalid,
returns `null`.

#### `.getControlDigit (number|string)`

Returns the control digit for the input.

#### `.getLetter (number|string)`

Alias for `getControlDigit`.

#### `.isValid (string)`

Returns `true` or `false` by validating the input.

## License

MIT