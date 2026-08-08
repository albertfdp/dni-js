declare namespace dniJs {
  /** A DNI/NIE body without its control letter, e.g. `"12345678"`, `12345678` or `"X1234567"`. */
  type Input = string | number;

  /**
   * Returns the DNI body with its control letter appended, in the official format
   * `12345678Z` (no separator).
   * Returns `null` for anything that is not eight digits, NIE bodies included.
   */
  function dni(number: Input): string | null;

  /**
   * Returns the NIE body with its control letter appended, in the official format
   * `X1234567L` (no separator).
   * Returns `null` for anything that is not `X`, `Y` or `Z` followed by seven digits,
   * DNI bodies included. Takes no `number`, unlike {@link dni}: the prefix means a
   * NIE body can never be one.
   */
  function nie(body: string): string | null;

  /** Returns the control letter for the given DNI/NIE body. */
  function getControlDigit(input: Input): string;

  /** Alias for {@link getControlDigit}. */
  const getLetter: typeof getControlDigit;

  /**
   * Validates a full DNI/NIE, control letter included. Permissive about the
   * separator: `12345678Z`, `12345678-Z` and `12345678 Z` all validate.
   */
  function isValid(dni: string): boolean;

  /** Validates a full DNI (`12345678Z`), control letter included. NIEs return `false`. */
  function isDNI(value: string): boolean;

  /** Validates a full NIE (`X1234567L`), control letter included. DNIs return `false`. */
  function isNIE(value: string): boolean;

  /**
   * Returns the canonical DNI/NIE for the input: whitespace and separator
   * removed, upper-cased, leading zeros restored — so every spelling of the
   * same identity maps to the identical string, safe to use as a storage or
   * dedup key. Returns `null` if the result is not valid.
   */
  function normalize(input: string): string | null;
}

export = dniJs;
